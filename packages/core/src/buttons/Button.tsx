/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { handleClick } from "@axux/utilities/src/handlers";
import { forwardRef, useMemo, type FC } from "react";
import { AxAnimation } from "../animations";
import { Link, type LinkProps } from "../components/Link";
import { useBadge } from "../hooks/useBadge";
import { getTooltipProps } from "../hooks/useTooltip";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import {
  type BadgeType,
  type ChildrenProp,
  type Color,
  type ElementProps,
  type IconProp,
  type MouseProps,
  type RefProp,
  type Size,
  type TooltipType,
} from "../types";
import { AppIcons } from "../types/appIcons";
import { ActionButton } from "./Action";
import { ConfirmButton } from "./Confirm";
import { DropdownButton } from "./Dropdown";

export interface ButtonProps
  extends RefProp,
    IconProp,
    MouseProps,
    ElementProps,
    Partial<ChildrenProp> {
  /**
   * size
   */
  size?: Size;
  /**
   * color
   */
  color?: Color;
  /**
   * button style
   */
  variant?: "outline" | "solid" | "link" | "normal";
  /**
   * icon alignment
   */
  iconAlign?: "start" | "end" | "top";
  /**
   * button type
   */
  type?: "button" | "submit" | "reset";
  /**
   * full width
   */
  fullWidth?: boolean;
  /**
   * active state
   */
  isActive?: boolean;
  /**
   * rounded button
   */
  isRound?: boolean;
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * disabled state
   */
  isDisabled?: boolean;
  /**
   * hide dropdown caret
   */
  hideCaret?: boolean;
  /**
   * use loading spinner
   */
  useSpinner?: boolean;
  /**
   * disable tab focus
   */
  noTabFocus?: boolean;
  /**
   * tooltip
   */
  tooltip?: TooltipType;
  /**
   * badge
   */
  badge?: BadgeType;
  /**
   * hot key
   */
  hotKey?: string;
  /**
   * navigation props
   */
  nav?: LinkProps;
}

export interface ButtonGroupProps extends ElementProps, ChildrenProp {
  isVertical?: boolean;
  variant?: "normal" | "flat" | "plain";
}

/**
 * Button group
 * @prop className
 * @prop isVertical
 * @prop variant - normal | flat | plain
 */
export const ButtonGroup: FC<ButtonGroupProps> = ({
  children,
  variant = "normal",
  isVertical = false,
  className = "",
  ...rest
}: ButtonGroupProps) => (
  <div
    className={`ax-button__group ${className ?? ""}`}
    data-variant={variant}
    data-vertical={isVertical}
    {...rest}
  >
    {children}
  </div>
);

/**
 * A simple clickable element used to trigger a specific action or function in the user interface
 */
export const ButtonComponent: FC<ButtonProps> = forwardRef<
  HTMLElement,
  ButtonProps
>((props, ref) => {
  const {
    icon,
    variant: style,
    size,
    children,
    type = "button",
    color,
    rtlFlip,
    noTabFocus,
    iconAlign,
    className,
    isActive = false,
    isRound = false,
    isLoading = false,
    isDisabled = false,
    hideCaret = true,
    tooltip,
    badge,
    fullWidth,
    hotKey,
    onClick,
    useSpinner,
    stopPropagation = false,
    // @ts-expect-error ignore
    "data-extra": extra,
    // @ts-expect-error ignore
    "data-tool": tool,
    // @ts-expect-error ignore
    "data-popover-open": popoverOpen,
    ...rest
  } = props;

  const Badge = useBadge(badge);
  const isSquare = useMemo(() => !!icon && !children, [icon, children]);

  const tooltipProps = useMemo(() => getTooltipProps(tooltip), [tooltip]);

  const clickHandler = useMemo(() => {
    if (!isDisabled && !isLoading && !isActive) {
      return handleClick(onClick, { stopPropagation });
    }
  }, [onClick, isActive, isDisabled, isLoading, stopPropagation]);

  /** ***************** component *******************/
  return (
    <div
      data-type={style}
      data-size={size}
      data-tool={tool}
      data-color={color}
      data-active={isActive}
      data-round={isRound}
      data-block={fullWidth}
      data-square={isSquare}
      data-spinner={!!useSpinner}
      data-loading={isLoading}
      data-disabled={isDisabled}
      data-icon-align={iconAlign}
      className={`ax-button ${className ?? ""}`}
    >
      {hotKey && <AxHotKey keyCombo={hotKey} handler={onClick} />}
      {!useSpinner && isLoading && <div className="ax-button__loader" />}
      <Link
        {...rest}
        type={type}
        as="button"
        role="button"
        ref={ref}
        className="ax-button__inner"
        onClick={clickHandler}
        data-disabled={isDisabled || isLoading}
        data-popover-open={popoverOpen}
        {...tooltipProps}
        tabIndex={noTabFocus ? -1 : 0}
      >
        {!(useSpinner && isLoading) && icon && (
          <AxIcon className="ax-button__icon" rtlFlip={rtlFlip} icon={icon} />
        )}
        {useSpinner && isLoading && (
          <AxAnimation.Spinner className="ax-button__icon" />
        )}
        {children && <div className="ax-button__label">{children}</div>}
        {Badge}
        {hotKey && <AxHotKey.Label keyCombo={hotKey} />}
        {!hideCaret && (
          <AxIcon className="ax-button__caret" icon={AppIcons.iconCaretDown} />
        )}
      </Link>
      {extra}
    </div>
  );
});
ButtonComponent.displayName = "AxButton";

export const AxButton = Object.assign(ButtonComponent, {
  Group: ButtonGroup,
  Action: ActionButton,
  Confirm: ConfirmButton,
  Dropdown: DropdownButton,
});

AxButton.displayName = "AxButton";
AxButton.Action.displayName = "AxButton.Action";
AxButton.Confirm.displayName = "AxButton.Confirm";
AxButton.Dropdown.displayName = "AxButton.Dropdown";
AxButton.Group.displayName = "AxButton.Group";
