// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty } from "@axux/utilities";
import { FC, forwardRef, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { useWithTooltip, WithTooltipProps } from "../internals/useWithTooltip";
import { AnchorProps, Color, ElementProps, IconProps, RefProp, Size } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxActionButton } from "./ActionButton";
import { AxConfirmButton } from "./ConfirmButton";
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
  split?: boolean | string;
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

  /**
   * panelId to navigate panel stack
   */
  panelId?: string;
}

interface ExtendedFC extends FC<ButtonProps> {
  Group: typeof AxButtonGroup;
  Dropdown: typeof AxDropdown;
  Action: typeof AxActionButton;
  Confirm: typeof AxConfirmButton;
  Positive: FC<Omit<ButtonProps, "color" | "type">>;
  Negative: FC<Omit<ButtonProps, "color" | "type">>;
  Neutral: FC<Omit<ButtonProps, "color" | "type">>;
}

/**
 * Action buttons
 */
export const AxButton: ExtendedFC = forwardRef<HTMLAnchorElement, ButtonProps>(
  (
    {
      children,
      icon,
      label,
      tooltip,
      block,
      to,
      href,
      badge,
      hideCaret,
      split,
      rtlFlip,
      isLoading,
      isDisabled,
      className,
      size = "default",
      type = "default",
      color = "default",
      iconAlign = "start",
      iconHilight = false,
      tabIndex,
      panelId,
      onClick,
      ref: _ref,
      ...aria
    },
    ref
  ) => {
    const InnerButton = useCallback(
      (props) =>
        href ? (
          <a ref={ref} href={href} {...props} />
        ) : to ? (
          <NavLink ref={ref} to={to} {...props} />
        ) : (
          <button ref={ref} type={(aria as KeyValue)["data-type"] ?? "button"} {...props} />
        ),
      [ref, href, to]
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
        >
          <InnerButton
            tabIndex={tabIndex}
            className="ax-button__inner"
            onClick={onClick}
            data-no-label={isEmpty(label || children)}
            data-panel={panelId}
            data-icon-align={iconAlign}
            data-icon-hilight={iconHilight}
            {...aria}
          >
            {icon && <AxIcon className="ax-button__icon" icon={icon} rtlFlip={rtlFlip} />}
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
              <AxIcon icon={AppIcons.iconCaretDown} className="ax-button__caret" />
            )}
          </InnerButton>
          {split && (
            <button
              className="ax-button__inner ax-button__split"
              tabIndex={tabIndex}
              role="split"
              aria-label={`${split}`}
            >
              <AxIcon icon={AppIcons.iconCaretDown} className="ax-button__icon" />
            </button>
          )}
        </div>
      </Wrapper>
    );
  }
) as AnyObject;
AxButton.Group = AxButtonGroup;
AxButton.Dropdown = AxDropdown;
AxButton.Action = AxActionButton;
AxButton.Confirm = AxConfirmButton;
AxButton.Positive = (props) => (
  <AxButton {...props} color="primary" type="solid" data-type="submit" />
);
AxButton.Negative = (props) => (
  <AxButton {...props} color="danger" type="solid" data-type="reset" />
);
AxButton.Neutral = (props) => <AxButton {...props} color="primary" type="link" />;

AxButton.displayName = "AxButton";
AxButton.Group.displayName = "AxButton.Group";
AxButton.Action.displayName = "AxButton.Action";
AxButton.Confirm.displayName = "AxButton.Confirm";
AxButton.Dropdown.displayName = "AxButton.Dropdown";
AxButton.Positive.displayName = "AxButton.Positive";
AxButton.Negative.displayName = "AxButton.Negative";
AxButton.Neutral.displayName = "AxButton.Neutral";
