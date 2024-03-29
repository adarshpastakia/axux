/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { handleClick } from "@axux/utilities/dist/handlers";
import {
  memo,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { BodyCell } from "./BodyCell";
import { useDatagridContext } from "./Context";

export const BodyRow = memo(({ row, record }: KeyValue) => {
  const { columns, isSelectable, onRowSelect, onRowExpand, canExpand } =
    useDatagridContext();

  const [expandedNode, setExpandedNode] = useState<ReactNode>();
  useEffect(() => {
    setExpandedNode(undefined);
  }, [record]);
  const handleExpand = useCallback(() => {
    if (expandedNode) return setExpandedNode(undefined);
    const node = onRowExpand?.(record);
    setExpandedNode(node);
  }, [expandedNode, record, onRowExpand]);

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
    <div className="ax-datagrid__row" data-row={row}>
      <div
        className="ax-datagrid__row--flex"
        data-selectable={isSelectable}
        onClick={
          isSelectable ? handleClick(() => onRowSelect?.(record)) : undefined
        }
      >
        <div className="ax-datagrid__fixStart">
          {!(onRowExpand == null) && (
            <div
              className={`ax-datagrid__body--cell ${
                canExpand?.(record) !== false
                  ? "cursor-pointer"
                  : "opacity-30 pointer-events-none"
              }`}
              onClick={handleClick(handleExpand, { stopPropagation: true })}
            >
              <AxIcon
                icon={
                  expandedNode
                    ? AppIcons.iconCollapseMinus
                    : AppIcons.iconExpandPlus
                }
              />
            </div>
          )}
          {start.map((props, column) => (
            <BodyCell key={column} {...props} record={record} row={row} />
          ))}
        </div>
        {cols.map((props, column) => (
          <BodyCell key={column} {...props} record={record} row={row} />
        ))}
        <div className="ax-datagrid__fixEnd">
          {end.map((props, column) => (
            <BodyCell key={column} {...props} record={record} row={row} />
          ))}
        </div>
      </div>
      {expandedNode}
    </div>
  );
});
BodyRow.displayName = "AxDatagrid.BodyRow";
