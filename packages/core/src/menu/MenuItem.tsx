// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isTrue } from "@axux/utilities";
import { FC, forwardRef, Fragment, MouseEventHandler, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AxIcon } from "../icons/Icon";
import { BadgeType, useBadge } from "../internals/useBadge";
import { usePropToggle } from "../internals/usePropToggle";
import { AxPopover } from "../overlays/Popover";
import { AxTooltip } from "../overlays/Tooltip";
import { AnchorProps, Color, ElementProps, IconProps, RefProp } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxText } from "../typography/Text";

export type MenuItemType = string | MenuItemProps;

/** @internal */
export interface MenuItemProps
  extends RefProp<HTMLAnchorElement>,
    IconProps,
    ElementProps,
    AnchorProps {
  id?: string;
  label: string;
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
      href = "",
      label,
      className,
      color,
      id,
      isActive,
      isDisabled,
      onClick,
      appendLabel,
      badge,
      icon = "blank",
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

    const elProps = useMemo(
      () => ({
        className: `ax-menu__item ${!!panelId ? "ax-prevent-close" : ""}  ${className ?? ""}`,
        "data-id": id,
        "data-color": color ?? "",
        "data-panel": panelId,
        "data-floating": isFloating,
        "data-active": isActive || (aria as KeyValue)["data-active"],
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
          <AxIcon icon={icon} />
          <div className="ax-menu__item__label">
            <AxText mark={mark}>{label}</AxText>
            {info && <span className="ax-menu__item__subtext">{info}</span>}
          </div>
          {badgeEl}
          {appendLabel}
          {showCaret && (
            <div className="ax-menu__item__caret">
              <AxIcon
                icon={isCollapsable && !isCollapsed ? AppIcons.iconCaret : AppIcons.iconNext}
              />
            </div>
          )}
        </Fragment>
      ),
      [appendLabel, badgeEl, icon, info, isCollapsable, isCollapsed, label, mark, showCaret]
    );

    return (
      <AxTooltip content={label} isDisabled={!menuCollapsed} placement="right" usePortal ref={ref}>
        {isEmpty(href) ? (
          <a {...elProps}>{innerEl}</a>
        ) : (
          <NavLink to={href} {...elProps}>
            {innerEl}
          </NavLink>
        )}
      </AxTooltip>
    );
  }
);
MenuItemInner.displayName = "AxMenu.Item.Inner";

/**
 * Menu item
 * @internal
 */
export const AxMenuItem: FC<MenuItemProps> = forwardRef<HTMLAnchorElement, MenuItemProps>(
  ({ panelId, isFloating, defaultCollapsed = true, isCollapsable, children, ...props }, ref) => {
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
              placement: "right-start",
              resize: false
            }
          : {},
      [floating]
    );

    return (
      <Wrapper {...wrapperProps}>
        <MenuItemInner
          ref={ref}
          panelId={panelId}
          showCaret={showCaret}
          isFloating={floating}
          isCollapsed={collapsed}
          isCollapsable={isCollapsable}
          isClickable={!isCollapsable && !!children ? !!props.onClick : true}
          menuCollapsed={menuCollapsed}
          toggleCollapse={toggleCollapse}
          {...props}
        />
        {(!collapsed || !isCollapsable || floating) && <div className="ax-menu">{children}</div>}
      </Wrapper>
    );
  }
);
