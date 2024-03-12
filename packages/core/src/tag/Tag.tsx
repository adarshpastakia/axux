/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isColor } from "@axux/utilities";
import { handleClick, handleEnter } from "@axux/utilities/src/handlers";
import { forwardRef, useMemo, type FC } from "react";
import { getTooltipProps } from "../hooks/useTooltip";
import { AxIcon } from "../icons/Icon";
import { Close } from "../internal/Close";
import {
  type ChildrenProp,
  type Color,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
  type MouseProps,
  type RefProp,
  type TooltipType,
} from "../types";

export interface TagProps
  extends RefProp,
    ElementProps,
    MouseProps,
    IconProp,
    ChildrenProp {
  /**
   * remove handler
   */
  onRemove?: EmptyCallback;
  /**
   * disable clickable tag
   */
  isDisabled?: boolean;
  /**
   * tooltip
   */
  tooltip?: TooltipType;
  /**
   * size
   */
  size?: "sm" | "md" | "normal";
  /**
   * fill color
   */
  fill?: boolean;
  /**
   * color
   */
  color?: Color | string;
}

/**
 * Tag labels
 */
export const AxTag: FC<TagProps> = forwardRef<HTMLDivElement, TagProps>(
  (
    {
      children,
      className,
      fill,
      size,
      icon,
      rtlFlip,
      color,
      tooltip,
      onClick,
      onRemove,
      isDisabled,
      stopPropagation,
      // @ts-expect-error ignore
      "data-popover-open": popoverOpen,
      ...rest
    },
    ref,
  ) => {
    /** ***************** build style map *******************/
    const styles = useMemo(() => {
      const s: KeyValue = {};
      if (color && isColor(color)) {
        s["--color"] = color;
      }
      return s;
    }, [color]);

    const tooltipProps = useMemo(() => getTooltipProps(tooltip), [tooltip]);

    const clickHandler = useMemo(() => {
      if (!isDisabled && onClick) {
        return handleClick(onClick, { stopPropagation });
      }
    }, [onClick, isDisabled, stopPropagation]);

    /** ***************** component *******************/
    return (
      <div
        {...rest}
        {...tooltipProps}
        ref={ref}
        role={onClick == null ? "term" : "button"}
        tabIndex={-1}
        className={`ax-tag ${className ?? ""}`}
        data-fill={fill}
        data-size={size}
        data-color={color}
        data-clickable={!(onClick == null)}
        data-disabled={isDisabled}
        data-popover-open={popoverOpen}
        onClick={clickHandler}
        onKeyDown={handleEnter(onClick)}
        style={styles}
      >
        {icon && <AxIcon icon={icon} rtlFlip={rtlFlip} />}
        <label>{children}</label>
        {onRemove != null && Close(onRemove)}
      </div>
    );
  },
) as AnyObject;
AxTag.displayName = "AxTag";
