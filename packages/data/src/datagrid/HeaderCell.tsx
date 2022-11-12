/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { handleClick } from "@axux/utilities/dist/handlers";
import { memo, useCallback, useMemo } from "react";
import { useDatagridContext } from "./Context";
import { DatagridColumn } from "./types";

const KEY =
  "M4 6.5C4 4 6 2 8.5 2S13 4 13 6.5C13 8.46 11.75 10.13 10 10.74V15H13V18H10V22H7V10.74C5.25 10.13 4 8.46 4 6.5M7 6.5C7 7.33 7.67 8 8.5 8S10 7.33 10 6.5 9.33 5 8.5 5 7 5.67 7 6.5";

export const HeaderCell = memo(
  ({
    icon,
    name,
    isPrimary,
    isResizeable,
    isSortable,
    tooltip,
    rtlFlip,
    label,
    minWidth,
    maxWidth,
  }: DatagridColumn<AnyObject>) => {
    const { startResize, widths, sort, onSort } = useDatagridContext();

    const width = useMemo(
      () => widths.get(name.toString()) ?? 180,
      [widths, name]
    );

    const tooltipContent = useMemo(
      () =>
        !!tooltip
          ? `${isPrimary ? "🔑" : ""}${tooltip !== true ? tooltip : label}`
          : "",
      [isPrimary, label, tooltip]
    );

    const handleSort = useCallback(() => {
      onSort?.(
        name.toString(),
        sort?.name === name && sort.order === "asc" ? "desc" : "asc"
      );
    }, [onSort, name, sort]);

    return (
      <div
        data-name={name}
        className="ax-datagrid__header--cell"
        style={{ minWidth, maxWidth, width }}
      >
        <div
          className="ax-datagrid__header--label"
          data-sortable={isSortable}
          data-centered={!label && !!icon}
          onClick={handleClick(handleSort)}
          data-tooltip={tooltipContent}
          data-tooltip-placement="bottom-start"
        >
          {icon && <AxIcon icon={icon} rtlFlip={rtlFlip} />}
          {isPrimary && <AxIcon rtlFlip icon={KEY} />}
          <label>{label}</label>
          {isSortable && (
            <div
              className="ax-datagrid__header--sort"
              data-sort={sort?.name === name && sort?.order}
            >
              <span>▼</span>
              <span>▲</span>
            </div>
          )}
        </div>
        {isResizeable && (
          <div
            onMouseDown={startResize}
            className="ax-datagrid__header--resize"
          />
        )}
      </div>
    );
  }
);
