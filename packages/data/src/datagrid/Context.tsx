/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp } from "@axux/core/dist/types";
import {
  createContext,
  FC,
  MouseEvent,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { DatagridColumn } from "./types";
import { useResizer } from "./useResizer";

interface ContextType {
  columns: DatagridColumn<AnyObject>[];
  data: KeyValue[];
  widths: Map<string, number>;

  startResize: (event: MouseEvent<HTMLElement>) => void;

  isSelectable: boolean;
  onRowSelect?: (record: KeyValue) => void;
  onRowExpand?: (record: KeyValue) => ReactNode;

  sort?: { name: string; order: "asc" | "desc" };
  onSort: (name: string, dir: "asc" | "desc") => void;
}

const DatagridContext = createContext<ContextType>({} as ContextType);

export const DatagridProvider: FC<KeyValue & ChildrenProp> = ({
  children,
  columns = [],
  data = [],
  className,
  isSelectable,
  onRowSelect,
  sort,
  onSort,
  onRowExpand,
  ...props
}) => {
  const ghostRef = useRef<HTMLDivElement>(null);
  const [widths, setWidths] = useState<Map<string, number>>(new Map());

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
        ghostRef.current &&
          useResizer(colEl, ghostRef.current, (width) => {
            setWidths(new Map(widths.set(colEl.dataset.name ?? "", width)));
          });
      }
    },
    [widths]
  );

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
        sort,
        onSort,
      }}
    >
      <div className={`ax-datagrid ${className ?? ""}`}>
        <div className={`ax-datagrid__wrapper ${className ?? ""}`}>
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
