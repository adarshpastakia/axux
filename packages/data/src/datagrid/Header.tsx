/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { memo, useMemo } from "react";
import { useDatagridContext } from "./Context";
import { HeaderCell } from "./HeaderCell";

export const Header = memo(() => {
  const { columns, onRowExpand } = useDatagridContext();

  const [start, end, cols] = useMemo(
    () => [
      columns.filter(
        (col) => col.isLocked === true || col.isLocked === "start"
      ),
      columns.filter((col) => col.isLocked === "end"),
      columns.filter((col) => !col.isLocked),
    ],
    [columns]
  );

  return (
    <div className="ax-datagrid__header">
      <div className="ax-datagrid__fixStart">
        {!(onRowExpand == null) && (
          <div className="ax-datagrid__header--cell px-2">
            <AxIcon icon="" />
          </div>
        )}
        {start.map((props, index) => (
          <HeaderCell key={index} {...props} />
        ))}
      </div>
      {cols.map((props, index) => (
        <HeaderCell key={index} {...props} />
      ))}
      <div className="ax-datagrid__fixEnd">
        {end.map((props, index) => (
          <HeaderCell key={index} {...props} />
        ))}
      </div>
    </div>
  );
});
Header.displayName = "AxDatagrid.Header";
