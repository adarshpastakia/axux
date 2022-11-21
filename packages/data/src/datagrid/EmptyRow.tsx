/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { useMemo } from "react";
import { useDatagridContext } from "./Context";

export const EmptyRow = () => {
  const { columns, widths, onRowExpand } = useDatagridContext();

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
    <div className="ax-datagrid__row flex-1">
      <div className="ax-datagrid__row--flex min-h-full">
        <div className="ax-datagrid__fixStart">
          {!(onRowExpand == null) && (
            <div className="ax-datagrid__body--cell">
              <AxIcon icon="" />
            </div>
          )}
          {start.map(({ minWidth, maxWidth, name }, column) => (
            <div
              key={column}
              className="ax-datagrid__body--cell"
              style={{
                minWidth,
                maxWidth,
                width: widths.get(name.toString()) ?? 180,
              }}
            />
          ))}
        </div>
        {cols.map(({ name, minWidth, maxWidth }, column) => (
          <div
            key={column}
            className="ax-datagrid__body--cell"
            style={{
              minWidth,
              maxWidth,
              width: widths.get(name.toString()) ?? 180,
            }}
          />
        ))}
        <div className="ax-datagrid__fixEnd">
          {end.map(({ minWidth, maxWidth, name }, column) => (
            <div
              key={column}
              className="ax-datagrid__body--cell"
              style={{
                minWidth,
                maxWidth,
                width: widths.get(name.toString()) ?? 180,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
