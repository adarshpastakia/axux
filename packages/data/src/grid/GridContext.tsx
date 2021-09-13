// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useIsRtl } from "@axux/core/dist/internals/useIsRtl";
import {
  createContext,
  PropsWithChildren,
  RefObject,
  useCallback,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { GridColumn, GridProps } from "./types";

/** @internal */
type SortType = { name: string; order: "asc" | "desc" };

/** @internal */
interface GridContextType {
  records: KeyValue[];
  columns: GridColumn[];

  sort: SortType;
  widths: KeyValue;
  filters: KeyValue;

  isSelectable: boolean;
  onRowSelect?: (record: KeyValue, index: number) => void;

  scrollTo: number;
  onScroll: (x: number) => void;

  onSort: (name: string) => void;
  onFilter: (name: string, filter: KeyValue) => void;
  onClearFilter: (name: string) => void;

  onResizeStart: (ref: RefObject<HTMLDivElement>) => void;
  onResize: (width: string) => void;
  onResizeEnd: (name: string, width: string) => void;
}

/** @internal */
const GridContext = createContext<GridContextType>({} as GridContextType);

/** @internal */
const getSorter = (type: string, name: string, order: string) => {
  const dn = order === "asc" ? -1 : 1;
  const up = order === "asc" ? 1 : -1;
  return (recA: KeyValue, recB: KeyValue) => {
    const a = recA[name];
    const b = recB[name];
    if (type === "string") {
      return a.toString().toLowerCase().localeCompare(b.toString().toLowerCase()) === -1 ? dn : up;
    }
    if (type === "number" || type === "boolean") {
      return a < b ? dn : up;
    }
    if (type === "date") {
      return new Date(a).getTime() < new Date(b).getTime() ? dn : up;
    }
    return 0;
  };
};

/**
 * Datagrid context
 * TODO: add filter functionality
 */
export const GridContextProvider = <T extends KeyValue>({
  children,
  columns,
  data,
  onRowSelect,
  isSelectable = false
}: PropsWithChildren<GridProps<T>>) => {
  const { isRtl } = useIsRtl();
  const [filters, setFilters] = useState<KeyValue>({});
  const [sort, setSort] = useState<SortType>({ name: "", order: "asc" });

  const ghostRef = useRef<HTMLDivElement>(null);

  const [widths, setWidths] = useState<KeyValue>({});
  const [scrollTo, onScroll] = useState(0);
  useLayoutEffect(() => {
    setWidths(columns.reduce((ret, col) => ({ ...ret, [col.name]: col.width ?? "20rem" }), {}));
  }, [columns]);

  const onSort = useCallback(
    (name: string) => {
      if (sort.name === name) {
        setSort({ name, order: sort.order === "asc" ? "desc" : "asc" });
      } else {
        setSort({ name, order: "asc" });
      }
    },
    [sort]
  );

  const onFilter = useCallback(
    (name: string, filter: KeyValue) => {
      setFilters({ ...filters, [name]: filter });
    },
    [filters]
  );

  const onClearFilter = useCallback(
    (name: string) => {
      setFilters({ ...filters, [name]: undefined });
    },
    [filters]
  );

  const onResizeStart = useCallback(
    (cellRef: RefObject<HTMLDivElement>) => {
      if (ghostRef.current && cellRef.current) {
        if (isRtl && cellRef.current.parentElement) {
          ghostRef.current.style.left = "unset";
          ghostRef.current.style.right = `${
            cellRef.current.parentElement.offsetWidth -
            (cellRef.current.offsetLeft + cellRef.current.offsetWidth - scrollTo)
          }px`;
        } else {
          ghostRef.current.style.right = "unset";
          ghostRef.current.style.left = `${cellRef.current.offsetLeft - scrollTo}px`;
        }
        ghostRef.current.style.width = `${cellRef.current.offsetWidth}px`;
        ghostRef.current.style.minWidth = cellRef.current.style.minWidth;
        ghostRef.current.style.maxWidth = cellRef.current.style.maxWidth;
        ghostRef.current.style.display = "block";
      }
    },
    [isRtl, scrollTo]
  );

  const onResize = useCallback((width: string) => {
    if (ghostRef.current) {
      ghostRef.current.style.width = width;
    }
  }, []);

  const onResizeEnd = useCallback(
    (name: string, width: string) => {
      if (ghostRef.current) {
        setWidths({ ...widths, [name]: width });
        ghostRef.current.style.display = "none";
      }
    },
    [widths]
  );

  const records = useMemo(() => {
    const dataList = [...data];
    const column = columns.find((col) => col.name === sort.name);
    if (sort.name && column) {
      return dataList.sort(getSorter(column.type ?? "string", sort.name, sort.order));
    }
    return dataList;
  }, [columns, data, sort]);

  return (
    <GridContext.Provider
      value={{
        records,
        columns,
        sort,
        widths,
        filters,
        scrollTo,
        onScroll,
        onSort,
        onFilter,
        onClearFilter,
        onRowSelect: onRowSelect as AnyObject,
        onResize,
        onResizeEnd,
        onResizeStart,
        isSelectable
      }}
    >
      <div className="ax-grid__panel">
        {children}
        <div className="ax-grid__resize--ghost" ref={ghostRef} />
      </div>
    </GridContext.Provider>
  );
};

/** @internal */
export const useGridContext = () => useContext(GridContext);
