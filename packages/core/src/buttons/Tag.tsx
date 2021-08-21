// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, MouseEventHandler, UIEventHandler } from "react";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { useWithTooltip, WithTooltipProps } from "../internals/useWithTooltip";
import { BaseColor, Color, ColorPalette, ElementProps, IconProps, RefProp, Size } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface TagProps extends RefProp, IconProps, ElementProps, WithTooltipProps {
  /**
   * Tag label color
   */
  color?: Color | BaseColor | ColorPalette;
  /**
   * Size
   */
  size?: Size;
  /**
   * Badge indicator
   */
  badge?: BadgeType;
  /**
   * Disable click
   */
  isDisabled?: boolean;
  /**
   * Fill color for background
   */
  fillColor?: boolean;
  /**
   * Click event handler
   */
  onClick?: MouseEventHandler;
  /**
   * Remove event handler
   */
  onRemove?: UIEventHandler;
  /**
   * Tab index to allow focus
   */
  tabIndex?: number;
}

/**
 * Label tags
 * @internal
 */
export const AxTag: FC<TagProps> = forwardRef<HTMLElement, TagProps>(
  (
    {
      icon,
      children,
      isDisabled,
      onClick,
      onRemove,
      badge,
      fillColor = false,
      size = "normal",
      color = "default",
      className,
      tooltip,
      ...aria
    },
    ref
  ) => {
    const { Wrapper, tooltipProps } = useWithTooltip(tooltip, ref);
    const badgeEl = useBadge(badge);
    return (
      <Wrapper {...tooltipProps}>
        <div
          ref={ref as AnyObject}
          className={`ax-tag ax-color--${color} ${className ?? ""}`}
          data-size={size}
          data-clickable={!!onClick}
          data-solid={fillColor}
          data-disabled={isDisabled}
          {...aria}
        >
          <div className="ax-tag__inner" onClick={onClick}>
            {icon && <AxIcon icon={icon} />}
            <span>{children}</span>
          </div>
          {badgeEl}
          {onRemove && (
            <AxIcon className="ax-tag__close" icon={AppIcons.iconClose} onClick={onRemove} />
          )}
        </div>
      </Wrapper>
    );
  }
);
AxTag.displayName = "AxTag";
