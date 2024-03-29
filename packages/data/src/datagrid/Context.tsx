/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ChildrenProp, type ElementProps } from "@axux/core/dist/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type FC,
  type MouseEvent,
  type ReactNode,
} from "react";
import { type DatagridColumn } from "./types";
import { useResizer } from "./useResizer";

interface ContextType {
  columns: Array<DatagridColumn<AnyObject>>;
  data: KeyValue[];
  widths: Map<string, number>;

  startResize: (event: MouseEvent<HTMLElement>) => void;

  isSelectable: boolean;
  onRowSelect?: (record: KeyValue) => void;
  canExpand?: (record: KeyValue) => boolean;
  onRowExpand?: (record: KeyValue) => ReactNode;

  sort?: { name: string; order: "asc" | "desc" };
  onSort: (name: string, dir: "asc" | "desc") => void;
}

const DatagridContext = createContext<ContextType>({} as ContextType);

export const DatagridProvider: FC<KeyValue & ElementProps & ChildrenProp> = ({
  children,
  columns = [],
  data = [],
  className,
  isSelectable,
  onRowSelect,
  sort,
  onSort,
  onRowExpand,
  datagridRef,
  lastScroll,
  onScroll,
  canExpand,
  ...props
}) => {
  const ghostRef = useRef<HTMLDivElement>(null);
  const [widths, setWidths] = useState<Map<string, number>>(new Map());
  const refBody = useRef<HTMLDivElement>(null);

  useEffect(() => {
    refBody.current?.scrollTo({
      top: 0,
      behavior: "auto",
    });
  }, [data]);

  useImperativeHandle(
    datagridRef,
    () => ({
      hilight: (row: number) => {
        refBody.current
          ?.querySelectorAll(`.ax-datagrid__row.hilight`)
          .forEach((el) => el?.classList.remove("hilight"));
        const el = refBody.current?.querySelector(`[data-row="${row}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
        el?.classList.add("hilight");
      },
      unhilight: () => {
        refBody.current
          ?.querySelectorAll(`.ax-datagrid__row.hilight`)
          .forEach((el) => el?.classList.remove("hilight"));
      },
      scrollTo: (row: number) => {
        const el = refBody.current?.querySelector(`[data-row="${row}"]`);
        el?.scrollIntoView({ behavior: "smooth" });
      },
    }),
    []
  );

  useEffect(() => {
    setWidths(
      new Map(
        columns.map(
          ({ name, width, minWidth = 0, maxWidth = 999 }: KeyValue) => [
            name.toString(),
            width ?? Math.min(Math.max(180, minWidth), maxWidth),
          ]
        )
      )
    );
  }, [columns]);

  const startResize = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const colEl = e.currentTarget.closest(
        ".ax-datagrid__header--cell"
      ) as HTMLElement;
      if (colEl) {
        ghostRef.current != null &&
          useResizer(colEl, ghostRef.current, (width) => {
            setWidths(new Map(widths.set(colEl.dataset.name ?? "", width)));
          });
      }
    },
    [widths]
  );

  useEffect(() => {
    refBody?.current?.scrollTo({ top: lastScroll, behavior: "auto" });
  }, []);

  return (
    <DatagridContext.Provider
      value={{
        columns,
        data,
        widths,
        startResize,
        onRowExpand,
        isSelectable,
        onRowSelect,
        canExpand,
        sort,
        onSort,
      }}
    >
      <div className={`ax-datagrid ${className ?? ""}`}>
        <div
          className={`ax-datagrid__wrapper ${className ?? ""}`}
          onScroll={(e) => onScroll?.(e.currentTarget.scrollTop)}
          ref={refBody}
        >
          {children}
        </div>
        <div className="ax-datagrid__resize--ghost" ref={ghostRef}>
          <div />
        </div>
      </div>
    </DatagridContext.Provider>
  );
};

export const useDatagridContext = () => useContext(DatagridContext);
