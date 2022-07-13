/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { iconToken } from "@axux/utilities";
import { Menu } from "@headlessui/react";
import { FC, Fragment, MouseEvent, useCallback } from "react";
import { Link } from "../components/Link";
import { useBadge } from "../hooks/useBadge";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import { AxTooltip } from "../overlays/Tooltip";
import { Ellipsis } from "../typography/Ellipsis";
import { MenuGroup } from "./MenuGroup";
import { MenuItemProps, MenuProps } from "./types";

const MenuItem: FC<MenuItemProps> = ({
  id,
  label,
  icon,
  badge,
  className,
  hotKey,
  isActive,
  isDisabled,
  rtlFlip,
  // @ts-ignore
  popoverRef,
  // @ts-ignore
  "data-extra": extra,
  // @ts-ignore
  "data-popover-open": popoverOpen,
  ...rest
}) => {
  const Badge = useBadge(badge);

  return (
    <Menu.Item disabled={isDisabled}>
      {({ active }) => (
        <Link
          {...rest}
          data-id={id}
          hotKey={hotKey}
          className={`ax-menu__item ${className ?? ""}`}
          data-active={isActive || active}
          data-disabled={isDisabled}
          data-popover-open={popoverOpen}
        >
          <AxIcon
            className="ax-menu__icon"
            icon={icon ?? ""}
            rtlFlip={rtlFlip}
          />

          <Ellipsis className="ax-menu__label">{label}</Ellipsis>
          {Badge}
          {hotKey && <AxHotKey.Label keyCombo={hotKey} />}
        </Link>
      )}
    </Menu.Item>
  );
};

const MenuMini: FC<MenuItemProps> = ({
  id,
  label,
  icon,
  badge,
  className,
  hotKey,
  isActive,
  isDisabled,
  rtlFlip,
  // @ts-ignore
  popoverRef,
  // @ts-ignore
  "data-extra": extra,
  // @ts-ignore
  "data-popover-open": popoverOpen,
  ...rest
}) => {
  const Badge = useBadge(badge);

  return (
    <AxTooltip content={label} placement="right">
      <Menu.Item disabled={isDisabled}>
        {({ active }) => (
          <Link
            {...rest}
            data-id={id}
            hotKey={hotKey}
            className={`ax-menu__mini ${className ?? ""}`}
            data-active={isActive || active}
            data-disabled={isDisabled}
            data-popover-open={popoverOpen}
          >
            <AxIcon
              className="ax-menu__icon"
              icon={icon ?? iconToken(label)}
              rtlFlip={rtlFlip}
            />
            {Badge}
          </Link>
        )}
      </Menu.Item>
    </AxTooltip>
  );
};

export const AxMenu: FC<MenuProps> & {
  Item: typeof MenuItem;
  Mini: typeof MenuMini;
  Group: typeof MenuGroup;
} = ({ children, onClick, className, ...rest }) => {
  const handleMenuClick = useCallback((e: MouseEvent) => {
    const id = (e.target as HTMLElement).dataset.id;
    id && onClick?.(id);
  }, []);
  return (
    <Menu as={Fragment}>
      <Menu.Items
        static
        {...rest}
        className={`ax-menu ${className ?? ""}`}
        onClick={handleMenuClick}
      >
        {children}
      </Menu.Items>
    </Menu>
  );
};

AxMenu.Item = MenuItem;
AxMenu.Mini = MenuMini;
AxMenu.Group = MenuGroup;

AxMenu.Item.displayName = "AxMenu.Item";
AxMenu.Mini.displayName = "AxMenu.Mini";
AxMenu.Group.displayName = "AxMenu.Group";
