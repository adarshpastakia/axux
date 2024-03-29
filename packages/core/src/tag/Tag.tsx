/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isColor } from "@axux/utilities";
import { forwardRef, useMemo, type ForwardRefExoticComponent } from "react";
import { getTooltipProps } from "../hooks/useTooltip";
import { AxIcon } from "../icons/Icon";
import {
  CloseX,
  type Color,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
  type MouseProps,
  type TooltipType,
} from "../types";

export interface TagProps extends ElementProps, MouseProps, IconProp {
  children?: JSX.Element | string;
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
  color?:
    | Color
    | "red"
    | "orange"
    | "amber"
    | "yellow"
    | "lime"
    | "green"
    | "emerald"
    | "teal"
    | "cyan"
    | "sky"
    | "blue"
    | "indigo"
    | "violet"
    | "purple"
    | "fuchsia"
    | "pink"
    | "rose"
    | string;
}

/**
 * Tag labels
 */
export const AxTag: ForwardRefExoticComponent<TagProps> = forwardRef<
  HTMLDivElement,
  TagProps
>(
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
      // @ts-expect-error ignore
      "data-popover-open": popoverOpen,
      ...rest
    },
    ref
  ) => {
    /** ***************** build style map *******************/
    const styles = useMemo(() => {
      const s: KeyValue = {};
      if (color && isColor(color)) {
        s.color = color;
      }
      return s;
    }, [color]);

    const tooltipProps = useMemo(() => getTooltipProps(tooltip), [tooltip]);

    /** ***************** component *******************/
    return (
      <div
        aria-label={children?.toString()}
        {...rest}
        {...tooltipProps}
        ref={ref}
        role="term"
        className={`ax-tag ${className ?? ""}`}
        data-fill={fill}
        data-size={size}
        data-color={color}
        data-clickable={!(onClick == null)}
        data-disabled={isDisabled}
        data-popover-open={popoverOpen}
        onClick={onClick}
        style={styles}
      >
        {icon && <AxIcon icon={icon} rtlFlip={rtlFlip} />}
        <label>{children}</label>
        {onRemove != null && CloseX(onRemove)}
      </div>
    );
  }
);
AxTag.displayName = "AxTag";
