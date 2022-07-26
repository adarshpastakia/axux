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
import { memo, ReactNode, useCallback, useState } from "react";
import { BodyCell } from "./BodyCell";
import { useDatagridContext } from "./Context";

export const BodyRow = memo(({ record }: KeyValue) => {
  const { columns, isSelectable, onRowSelect, onRowExpand } =
    useDatagridContext();

  const [isExpanded, setExpanded] = useState(false);
  const [expandedNode, setExpandedNode] = useState<ReactNode>();
  const handleExpand = useCallback(() => {
    if (!expandedNode) {
      const node = onRowExpand?.(record);
      setExpandedNode(node);
      return setExpanded(!!node);
    }
    setExpanded(!isExpanded);
  }, [isExpanded, expandedNode, record, onRowExpand]);

  return (
    <div className="ax-datagrid__row">
      <div
        className="ax-datagrid__row--flex"
        data-selectable={isSelectable}
        onClick={
          isSelectable ? handleClick(() => onRowSelect?.(record)) : undefined
        }
      >
        {!!onRowExpand && (
          <div
            className="ax-datagrid__body--cell cursor-pointer"
            onClick={handleClick(handleExpand, { stopPropagation: true })}
          >
            <AxIcon
              icon={
                isExpanded
                  ? AppIcons.iconCollapseMinus
                  : AppIcons.iconExpandPlus
              }
            />
          </div>
        )}
        {columns.map((props, column) => (
          <BodyCell key={column} {...props} record={record} />
        ))}
      </div>
      {isExpanded && expandedNode}
    </div>
  );
});
