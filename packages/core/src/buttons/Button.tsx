// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty } from "@axux/utilities";
import { FC, forwardRef, MouseEventHandler, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { useWithTooltip, WithTooltipProps } from "../internals/useWithTooltip";
import { AnchorProps, Color, ElementProps, IconProps, RefProp, Size } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxDropdown } from "./Dropdown";
import { AxButtonGroup } from "./Group";

/** @internal */
export interface ButtonProps
  extends RefProp<HTMLAnchorElement>,
    IconProps,
    AnchorProps,
    ElementProps,
    WithTooltipProps {
  /**
   * Button size
   */
  size?: Size;
  /**
   * Button theme
   */
  color?: Color;
  /**
   * Button display style
   */
  type?: "default" | "outline" | "solid" | "link";
  /**
   * Tab index to allow focus
   */
  tabIndex?: number;

  /**
   * Button label
   */
  label?: string;
  /**
   * Button value for toggle group
   */
  value?: string;
  /**
   * Click event handler
   */
  onClick?: MouseEventHandler;

  /**
   * Badge indicator
   */
  badge?: BadgeType;

  /**
   * Stretch button to fill container
   */
  block?: boolean;
  /**
   * Use split button for dropdown
   */
  split?: boolean;
  /**
   * Icon placement inline-end
   */
  iconAlign?: "start" | "end";
  /**
   * Highlight icon
   */
  iconHilight?: boolean;

  /**
   * Disabled
   */
  isDisabled?: boolean;
  /**
   * Show busy indicator
   */
  isLoading?: boolean;

  /**
   * When used in dropdown use to hide caret
   */
  hideCaret?: boolean;
}

interface ExtendedFC<T> extends FC<T> {
  Group: typeof AxButtonGroup;
  Dropdown: typeof AxDropdown;
  Positive: FC<Omit<ButtonProps, "color" | "type">>;
  Negative: FC<Omit<ButtonProps, "color" | "type">>;
  Neutral: FC<Omit<ButtonProps, "color" | "type">>;
}

/**
 * Action buttons
 */
export const AxButton: ExtendedFC<ButtonProps> = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      icon,
      label,
      tooltip,
      block,
      href,
      badge,
      onClick,
      hideCaret,
      split,
      isLoading,
      isDisabled,
      className,
      size = "default",
      type = "default",
      color = "default",
      iconAlign = "start",
      iconHilight = false,
      tabIndex,
      ref: _ref,
      ...aria
    },
    ref
  ) => {
    const InnerButton = useCallback(
      (props) =>
        href ? (
          <NavLink ref={ref} to={href} {...props} />
        ) : (
          <button ref={ref} type="button" {...props} />
        ),
      [ref, href]
    );
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    InnerButton.displayName = "AxButton.Inner";

    const { Wrapper, tooltipProps } = useWithTooltip(tooltip, ref);
    const badgeEl = useBadge(badge);

    return (
      <Wrapper {...tooltipProps}>
        <div
          className={`ax-button ${className ?? ""}`}
          data-style={type}
          data-theme={color}
          data-size={size}
          data-block={block}
          data-busy={isLoading}
          data-disabled={isDisabled}
          {...aria}
        >
          <InnerButton
            tabIndex={tabIndex}
            className="ax-button__inner"
            onClick={onClick}
            data-no-label={isEmpty(label || children)}
            data-icon-align={iconAlign}
            data-icon-hilight={iconHilight}
            {...aria}
          >
            {icon && <AxIcon className="ax-button__icon" icon={icon} />}
            {isLoading && (
              <AxIcon className="ax-button__spinner" icon={AppIcons.iconSpinner} spin />
            )}
            {(label || children) && (
              <div className="ax-button__label">
                <span>{label || children}</span>
              </div>
            )}
            {badgeEl}
            {!hideCaret && !split && !!(aria as KeyValue)["data-popover"] && (
              <AxIcon icon={AppIcons.iconCaret} className="ax-button__caret" />
            )}
          </InnerButton>
          {split && (
            <button className="ax-button__inner ax-button__split" tabIndex={tabIndex}>
              <AxIcon icon={AppIcons.iconCaret} className="ax-button__icon" />
            </button>
          )}
        </div>
      </Wrapper>
    );
  }
) as AnyObject;
AxButton.Group = AxButtonGroup;
AxButton.Dropdown = AxDropdown;
AxButton.Positive = (props) => <AxButton {...props} color="primary" type="solid" />;
AxButton.Negative = (props) => <AxButton {...props} color="danger" type="solid" />;
AxButton.Neutral = (props) => <AxButton {...props} color="default" type="default" />;

AxButton.displayName = "AxButton";
AxButton.Group.displayName = "AxButton.Group";
AxButton.Dropdown.displayName = "AxButton.Dropdown";
AxButton.Positive.displayName = "AxButton.Positive";
AxButton.Negative.displayName = "AxButton.Negative";
AxButton.Neutral.displayName = "AxButton.Neutral";
