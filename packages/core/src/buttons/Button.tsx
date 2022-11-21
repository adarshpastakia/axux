/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { handleClick } from "@axux/utilities/dist/handlers";
import { FC, forwardRef, ForwardRefExoticComponent, useMemo } from "react";
import { AxAnimation } from "../animations";
import { Link, LinkProps } from "../components/Link";
import { useBadge } from "../hooks/useBadge";
import { getTooltipProps } from "../hooks/useTooltip";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import {
  BadgeType,
  ChildrenProp,
  Color,
  ElementProps,
  EmptyCallback,
  IconProp,
  RefProp,
  Size,
  TooltipType,
} from "../types";
import { AppIcons } from "../types/appIcons";
import { Ellipsis } from "../typography/Ellipsis";
import { ActionButton } from "./Action";
import { ConfirmButton } from "./Confirm";
import { DropdownButton } from "./Dropdown";

export interface ButtonProps extends ElementProps, IconProp, RefProp {
  children?: string;
  /**
   * size
   */
  size?: Size;
  /**
   * color
   */
  color?: Color | "invert";
  /**
   * button style
   */
  variant?: "outline" | "solid" | "link";
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
   * invert text color
   */
  invertColor?: boolean;
  /**
   * show dropdown caret
   */
  showCaret?: boolean;
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
   * dont propagate click event
   */
  stopPropagation?: boolean;
  /**
   * navigation props
   */
  nav?: LinkProps;

  onClick?: EmptyCallback;
}

/**
 * Action button
 */
export const AxButton: ForwardRefExoticComponent<ButtonProps> & {
  Action: typeof ActionButton;
  Confirm: typeof ConfirmButton;
  Dropdown: typeof DropdownButton;
  Group: FC<ChildrenProp & ElementProps & { isVertical?: boolean }>;
} = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
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
    showCaret,
    tooltip,
    badge,
    fullWidth,
    invertColor,
    hotKey,
    onClick,
    useSpinner,
    stopPropagation = false,
    // @ts-expect-error
    "data-extra": extra,
    // @ts-expect-error
    "data-popover-open": popoverOpen,
    ...rest
  } = props;

  const Badge = useBadge(badge);
  const isSquare = useMemo(() => !!icon && !children, [icon, children]);

  const tooltipProps = useMemo(() => getTooltipProps(tooltip), [tooltip]);

  /** ***************** component *******************/
  return (
    <div
      data-type={style}
      data-size={size}
      data-color={color}
      data-active={isActive}
      data-round={isRound}
      data-block={fullWidth}
      data-square={isSquare}
      data-spinner={!!useSpinner}
      data-loading={isLoading}
      data-disabled={isDisabled}
      data-icon-align={iconAlign}
      data-invert={invertColor}
      className={`ax-button ${className ?? ""}`}
    >
      {hotKey && <AxHotKey keyCombo={hotKey} handler={onClick} />}
      {!useSpinner && isLoading && <div className="ax-button__loader" />}
      <Link
        aria-label={children}
        {...rest}
        type={type}
        as="button"
        role="button"
        ref={ref}
        className="ax-button__inner"
        onClick={handleClick(onClick, { stopPropagation })}
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
        {children && (
          <Ellipsis className="ax-button__label">{children}</Ellipsis>
        )}
        {hotKey && <AxHotKey.Label keyCombo={hotKey} />}
        {showCaret && (
          <AxIcon className="ax-button__caret" icon={AppIcons.iconCaretDown} />
        )}
      </Link>
      {Badge}
      {extra}
    </div>
  );
}) as AnyObject;
AxButton.Action = ActionButton;
AxButton.Confirm = ConfirmButton;
AxButton.Dropdown = DropdownButton;
AxButton.Group = ({
  children,
  isVertical = false,
  className = "",
}: { isVertical?: boolean } & ElementProps & ChildrenProp) => (
  <div
    className={`ax-button__group ${className ?? ""}`}
    data-vertical={isVertical}
  >
    {children}
  </div>
);

AxButton.displayName = "AxButton";
AxButton.Action.displayName = "AxButton.Action";
AxButton.Confirm.displayName = "AxButton.Confirm";
AxButton.Dropdown.displayName = "AxButton.Dropdown";
AxButton.Group.displayName = "AxButton.Group";
