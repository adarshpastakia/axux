// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isTrue } from "@axux/utilities";
import { FC, forwardRef, Fragment, MouseEventHandler, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { useIcon } from "../hooks/useIcon";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { usePropToggle } from "../internals/usePropToggle";
import { AxPopover } from "../overlays/Popover";
import { AxTooltip } from "../overlays/Tooltip";
import { AnchorProps, Color, ElementProps, IconProps, RefProp } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxText } from "../typography/Text";

/** @internal */
export interface MenuItemProps
  extends RefProp<HTMLAnchorElement>,
    IconProps<JSX.Element>,
    ElementProps,
    AnchorProps {
  id?: string;
  label: string | JSX.Element;
  info?: string;
  mark?: string;
  color?: Color;
  panelId?: string;
  badge?: BadgeType;
  isActive?: boolean;
  isFloating?: boolean;
  isDisabled?: boolean;
  isCollapsable?: boolean;
  defaultCollapsed?: boolean;
  appendLabel?: string | JSX.Element;
  onClick?: MouseEventHandler;
}

const MenuItemInner: FC<MenuItemProps & KeyValue> = forwardRef<
  HTMLAnchorElement,
  MenuItemProps & KeyValue
>(
  (
    {
      to,
      href,
      label,
      className,
      color,
      id,
      isActive,
      isDisabled,
      onClick,
      appendLabel,
      badge,
      icon,
      rtlFlip,
      info,
      isFloating,
      isCollapsed,
      isCollapsable,
      mark,
      panelId,
      showCaret,
      isClickable,
      menuCollapsed,
      toggleCollapse,
      ...aria
    },
    ref
  ) => {
    const badgeEl = useBadge(badge);
    const iconEl = useIcon(icon, "", rtlFlip);

    const elProps = useMemo(
      () => ({
        className: `ax-menu__item ${!!panelId ? "ax-prevent-close" : ""}  ${className ?? ""}`,
        "data-id": id,
        "data-color": color ?? "",
        "data-panel": panelId,
        "data-floating": isFloating,
        "data-active": isTrue(isActive || (aria as KeyValue)["data-active"]),
        "data-disabled": isDisabled,
        "data-clickable": isClickable,
        onClick: isCollapsable && !menuCollapsed ? toggleCollapse : onClick,
        ...aria
      }),
      [
        className,
        id,
        color,
        panelId,
        isActive,
        aria,
        isDisabled,
        isFloating,
        isClickable,
        isCollapsable,
        menuCollapsed,
        toggleCollapse,
        onClick
      ]
    );

    const innerEl = useMemo(
      () => (
        <Fragment>
          {iconEl ?? <span />}
          <div className="ax-menu__item__label">
            <AxText.Marked mark={mark}>{label}</AxText.Marked>
            {info && <span className="ax-menu__item__subtext">{info}</span>}
          </div>
          {badgeEl}
          {appendLabel}
          {showCaret && (
            <div className="ax-menu__item__caret">
              <AxIcon
                className="flippable"
                icon={
                  (isCollapsable && !isCollapsed) || showCaret === "bottom"
                    ? AppIcons.iconCaretDown
                    : AppIcons.iconCaretRight
                }
              />
            </div>
          )}
        </Fragment>
      ),
      [appendLabel, badgeEl, iconEl, info, isCollapsable, isCollapsed, label, mark, showCaret]
    );

    return (
      <AxTooltip content={label} isDisabled={!menuCollapsed} placement="right" usePortal ref={ref}>
        {isEmpty(to) ? (
          <a href={href} {...elProps}>
            {innerEl}
          </a>
        ) : (
          <NavLink end to={to} {...elProps}>
            {innerEl}
          </NavLink>
        )}
      </AxTooltip>
    );
  }
);
MenuItemInner.displayName = "AxMenu.Item.Inner";

/**
 * Menus item
 * @internal
 */
export const AxMenuItem: FC<MenuItemProps> = forwardRef<HTMLAnchorElement, MenuItemProps>(
  (
    {
      panelId,
      isFloating,
      defaultCollapsed = true,
      placement = "end",
      isCollapsable,
      children,
      ...props
    }: AnyObject,
    ref
  ) => {
    const [collapsed, toggleCollapse] = usePropToggle(defaultCollapsed);
    const menuCollapsed = isTrue((props as AnyObject)["data-collapsed"]);
    const floating = isTrue(isFloating || menuCollapsed) && !!children;
    const showCaret = isTrue(
      isCollapsable || !!panelId || floating || (props as AnyObject)["data-popover"]
    );

    const Wrapper = useMemo(() => (floating ? AxPopover : Fragment), [floating]);
    const wrapperProps = useMemo<AnyObject>(
      () =>
        floating
          ? {
              closeOnClick: true,
              usePortal: true,
              updateAnchor: true,
              placement: placement === "bottom" ? "bottom-start" : "right-start",
              resize: false
            }
          : {},
      [floating, placement]
    );

    return (
      <Wrapper {...wrapperProps}>
        <MenuItemInner
          ref={ref}
          panelId={panelId}
          showCaret={showCaret && placement}
          isFloating={floating}
          isCollapsed={collapsed}
          isCollapsable={isCollapsable}
          isClickable={!isCollapsable && !!children ? !!props.onClick : true}
          menuCollapsed={menuCollapsed}
          toggleCollapse={toggleCollapse}
          {...props}
        />
        {((isCollapsable && !collapsed) || floating) && <div className="ax-menu">{children}</div>}
      </Wrapper>
    );
  }
);
