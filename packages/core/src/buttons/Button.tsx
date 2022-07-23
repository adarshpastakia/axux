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
import { Link } from "../components/Link";
import { useBadge } from "../hooks/useBadge";
import { useTooltip } from "../hooks/useTooltip";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import {
  BadgeType,
  ChildrenProp,
  Color,
  ElementProps,
  EmptyCallback,
  IconProp,
  Size,
  TooltipType,
} from "../types";
import { AppIcons } from "../types/appIcons";
import { Ellipsis } from "../typography/Ellipsis";
import { ActionButton } from "./Action";
import { ConfirmButton } from "./Confirm";
import { DropdownButton } from "./Dropdown";

export interface ButtonProps extends ElementProps, IconProp {
  children?: string;
  /**
   * routing path
   */
  to?: string;
  /**
   * navigation url
   */
  href?: string;
  /**
   * navigation target
   */
  target?: HTMLAnchorElement["target"];
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
  style?: "outline" | "solid" | "link";
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

  onClick?: EmptyCallback;
}

/**
 * Action button
 */
export const AxButton: ForwardRefExoticComponent<ButtonProps> & {
  Action: typeof ActionButton;
  Confirm: typeof ConfirmButton;
  Dropdown: typeof DropdownButton;
  Group: FC<ChildrenProp & { isVertical?: boolean }>;
} = forwardRef<HTMLElement, ButtonProps>((props, ref) => {
  const {
    icon,
    style,
    size,
    children,
    type = "button",
    color,
    rtlFlip,
    noTabFocus,
    iconAlign,
    className,
    isActive,
    isRound,
    isLoading,
    isDisabled,
    showCaret,
    tooltip,
    badge,
    fullWidth,
    invertColor,
    hotKey,
    onClick,
    useSpinner,
    stopPropagation = false,
    // @ts-ignore
    popoverRef,
    // @ts-ignore
    "data-extra": extra,
    // @ts-ignore
    "data-popover-open": popoverOpen,
    ...rest
  } = props;

  const Badge = useBadge(badge);
  const Wrapper = useTooltip(tooltip, isDisabled || popoverOpen);
  const isSquare = useMemo(() => !!icon && !children, [icon, children]);

  /******************* component *******************/
  return (
    <Wrapper innerRef={ref}>
      {hotKey && <AxHotKey keyCombo={hotKey} handler={onClick} />}
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
        {!useSpinner && isLoading && <div className="ax-button__loader" />}
        <Link
          aria-label={children}
          {...rest}
          ref={ref}
          type={type}
          as="button"
          role="button"
          hotKey={hotKey}
          className="ax-button__inner"
          data-popover-open={popoverOpen}
          onClick={handleClick(onClick, { stopPropagation })}
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
            <AxIcon
              className="ax-button__caret"
              icon={AppIcons.iconCaretDown}
            />
          )}
        </Link>
        {Badge}
        {extra}
      </div>
    </Wrapper>
  );
}) as AnyObject;
AxButton.Action = ActionButton;
AxButton.Confirm = ConfirmButton;
AxButton.Dropdown = DropdownButton;
AxButton.Group = ({ children, isVertical = false }) => (
  <div className={`ax-button__group ${isVertical ? "flex-col" : ""}`}>
    {children}
  </div>
);

AxButton.displayName = "AxButton";
AxButton.Action.displayName = "AxButton.Action";
AxButton.Confirm.displayName = "AxButton.Confirm";
AxButton.Dropdown.displayName = "AxButton.Dropdown";
AxButton.Group.displayName = "AxButton.Group";
