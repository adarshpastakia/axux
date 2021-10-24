// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxIcon, AxTooltip } from "@axux/core";
import { useResize } from "@axux/core/dist/internals/useResize";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Fragment, useMemo, useRef, useState } from "react";
import { useGridContext } from "./GridContext";
import { GridColumn } from "./types";

/**
 * Header cell
 * @param name
 * @param icon
 * @param label
 * @param tooltip
 * @param minWidth
 * @param maxWidth
 * @param filterOptions
 * @param isPrimary
 * @param isSortable
 * @param isFilterable
 * @param isResizeable
 * @constructor
 * @internal
 * TODO: add filter panel by type
 */
export const HeaderCell: VFC<GridColumn> = ({
  name,
  icon,
  label,
  tooltip,
  minWidth = "2rem",
  maxWidth,
  filterOptions,
  isPrimary,
  isSortable,
  isFilterable,
  isResizeable
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const { sort, onSort, widths, onResizeStart, onResizeEnd, onResize } = useGridContext();

  const [width, setWidth] = useState<string>();

  useResize(
    resizeHandleRef,
    ({ x }) => {
      if (elementRef.current) {
        setWidth(`${elementRef.current.offsetWidth + x}px`);
        onResize(`${elementRef.current.offsetWidth + x}px`);
      }
    },
    {
      onStart: () => {
        onResizeStart(elementRef);
      },
      onEnd: () => {
        if (elementRef.current) {
          onResizeEnd(name, `${elementRef.current.offsetWidth}px`);
          setWidth(undefined);
        }
      }
    }
  );

  const tooltipContent = useMemo(
    () => (
      <Fragment>
        {isPrimary && <AxIcon icon={AppIcons.iconPrimaryKey} />}
        <label>{tooltip !== true ? tooltip : label}</label>
      </Fragment>
    ),
    [isPrimary, label, tooltip]
  );

  return (
    <div
      ref={elementRef}
      className="ax-grid__header--cell"
      style={{
        flex: width || widths[name] ? `0 0 ${width ?? widths[name]}` : undefined,
        minWidth,
        maxWidth
      }}
    >
      <AxTooltip content={tooltipContent} placement="bottom-start" isDisabled={!tooltip} usePortal>
        <div
          className="ax-grid__header--label"
          data-sortable={isSortable}
          onClick={() => isSortable && onSort(name)}
        >
          {icon && <AxIcon icon={icon} />}
          {isPrimary && <AxIcon icon={AppIcons.iconPrimaryKey} />}
          <label>{label}</label>
          {isSortable && (
            <div className="ax-grid__header--sort" data-sort={sort.name === name && sort.order}>
              <span>▼</span>
              <span>▲</span>
            </div>
          )}
        </div>
      </AxTooltip>
      {isFilterable && filterOptions && (
        <AxButton
          className="ax-grid__header--filter"
          icon={AppIcons.iconFilter}
          color="primary"
          type="link"
        />
      )}
      {isResizeable && <div className="ax-grid__header--resize" ref={resizeHandleRef} />}
    </div>
  );
};
