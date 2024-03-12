/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { iconToken } from "@axux/utilities";
import { Menu } from "@headlessui/react";
import {
  Fragment,
  useCallback,
  type FC,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from "react";
import { Link } from "../components/Link";
import { useBadge } from "../hooks/useBadge";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import { type ChildProp, type ElementProps } from "../types";
import { MenuGroup } from "./MenuGroup";
import { type MenuItemProps, type MenuProps } from "./types";

const FakeItem = (props: KeyValue) => {
  return (
    <div className={props.disabled ? "pointer-events-none" : ""}>
      {props.children({})}
    </div>
  );
};

const MenuItem: FC<MenuItemProps<ReactNode>> = ({
  id,
  label,
  icon,
  badge,
  append,
  className,
  hotKey,
  isActive,
  isDisabled,
  rtlFlip,
  onClick,
  // @ts-expect-error ignore
  "data-extra": extra,
  // @ts-expect-error ignore
  "data-panel": panelId,
  // @ts-expect-error ignore
  "data-popover-open": popoverOpen,
  ...rest
}) => {
  const Badge = useBadge(badge);

  const T = panelId ? FakeItem : Menu.Item;

  return (
    <T as={Fragment} disabled={isDisabled}>
      {({ active }) => (
        <div role="none" onMouseUp={onClick}>
          <Link
            {...rest}
            data-id={id}
            className={`ax-menu__item ${className ?? ""}`}
            data-hover={active}
            data-panel={panelId}
            data-active={isActive}
            data-disabled={isDisabled}
            data-popover-open={popoverOpen}
          >
            <AxIcon
              className="ax-menu__icon"
              icon={icon ?? ""}
              rtlFlip={rtlFlip}
            />

            <div className="ax-menu__label">{label}</div>
            {Badge}
            {append}
            {hotKey && <AxHotKey.Label keyCombo={hotKey} />}
          </Link>
        </div>
      )}
    </T>
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
  // @ts-expect-error ignore
  "data-extra": extra,
  // @ts-expect-error ignore
  "data-popover-open": popoverOpen,
  ...rest
}) => {
  const Badge = useBadge(badge);

  return (
    <Menu.Item as={Fragment} disabled={isDisabled}>
      {({ active }) => (
        <div>
          <Link
            {...rest}
            data-id={id}
            className={`ax-menu__mini ${className ?? ""}`}
            data-hover={active}
            data-active={isActive}
            data-disabled={isDisabled}
            data-popover-open={popoverOpen}
            data-tooltip={label}
            data-tooltip-placement="right"
          >
            <AxIcon
              className="ax-menu__icon"
              icon={icon ?? iconToken(label)}
              rtlFlip={rtlFlip}
            />
            {Badge}
          </Link>
        </div>
      )}
    </Menu.Item>
  );
};

const MenuTitle: FC<ElementProps & ChildProp> = ({ children, className }) => {
  return <div className={`px-4 text-muted ${className ?? ""}`}>{children}</div>;
};

export const MenuRoot: FC<MenuProps> = ({
  children,
  onClick,
  className,
  ...rest
}: MenuProps) => {
  const handleMenuClick = useCallback((e: ReactMouseEvent) => {
    const id = (e.target as HTMLElement).dataset.id;
    id && onClick?.(id);
  }, []);
  return (
    <Menu as={Fragment}>
      <Menu.Items
        static
        {...rest}
        onMouseUp={handleMenuClick}
        className={`ax-menu ${className ?? ""}`}
      >
        {children}
      </Menu.Items>
    </Menu>
  );
};

export const AxMenu = Object.assign(MenuRoot, {
  Item: MenuItem,
  Mini: MenuMini,
  Group: MenuGroup,
  Title: MenuTitle,
});

AxMenu.Item.displayName = "AxMenu.Item";
AxMenu.Mini.displayName = "AxMenu.Mini";
AxMenu.Group.displayName = "AxMenu.Group";
AxMenu.Title.displayName = "AxMenu.Title";
