/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { iconToken } from "@axux/utilities";
import { Menu } from "@headlessui/react";
import {
  FC,
  Fragment,
  MouseEvent as ReactMouseEvent,
  ReactNode,
  useCallback,
} from "react";
import { Link } from "../components/Link";
import { useBadge } from "../hooks/useBadge";
import { AxHotKey } from "../hotkeys/HotKey";
import { AxIcon } from "../icons/Icon";
import { AxTooltip } from "../overlays/Tooltip";
import { ChildProp, ElementProps } from "../types";
import { MenuGroup } from "./MenuGroup";
import { MenuItemProps, MenuProps } from "./types";

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
  // @ts-ignore
  popoverRef,
  // @ts-ignore
  "data-extra": extra,
  // @ts-ignore
  "data-panel": panelId,
  // @ts-ignore
  "data-popover-open": popoverOpen,
  ...rest
}) => {
  const Badge = useBadge(badge);

  const T = !!panelId ? FakeItem : Menu.Item;

  return (
    <T as={Fragment} disabled={isDisabled}>
      {({ active }) => (
        <div onMouseUp={onClick}>
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
    </AxTooltip>
  );
};

const MenuTitle: FC<ElementProps & ChildProp> = ({ children, className }) => {
  return <div className={`px-4 text-muted ${className ?? ""}`}>{children}</div>;
};

export const AxMenu: FC<MenuProps> & {
  Item: typeof MenuItem;
  Mini: typeof MenuMini;
  Group: typeof MenuGroup;
  Title: typeof MenuTitle;
} = ({ children, onClick, className, ...rest }) => {
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
        ref={(el: AnyObject) => el?.focus()}
        className={`ax-menu ${className ?? ""}`}
      >
        {children}
      </Menu.Items>
    </Menu>
  );
};

AxMenu.Item = MenuItem;
AxMenu.Mini = MenuMini;
AxMenu.Group = MenuGroup;
AxMenu.Title = MenuTitle;

AxMenu.Item.displayName = "AxMenu.Item";
AxMenu.Mini.displayName = "AxMenu.Mini";
AxMenu.Group.displayName = "AxMenu.Group";
AxMenu.Title.displayName = "AxMenu.Title";
