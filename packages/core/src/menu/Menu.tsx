// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isString } from "@axux/utilities";
import { FC, MouseEvent } from "react";
import { AxDivider } from "../divider/Divider";
import { AxContent } from "../panels/Content";
import { AxPanel } from "../panels/Panel";
import { ElementProps, Size } from "../types";
import { AxText, TextProps } from "../typography/Text";
import { AxMenuItem, MenuItemType } from "./MenuItem";

/** @internal */
export interface MenuProps extends ElementProps {
  size?: Size;
  title?: string;
  panelId?: string;
  items?: MenuItemType[];
  onClick?: (menuId: string) => void;
}

interface ExtendedFC extends FC<MenuProps> {
  Item: typeof AxMenuItem;
  Text: FC<
    Pick<TextProps, "bg" | "color" | "transform" | "align" | "size" | "weight" | "className">
  >;
  Divider: FC;
}

/**
 * Menu
 * @param children
 * @param size
 * @param items
 * @param onClick
 * @param className
 * @param rest
 * @constructor
 * @internal
 */
export const AxMenu: ExtendedFC = ({ children, size, items, onClick, className, ...rest }) => {
  const checkMenuClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (onClick && target.dataset.id) {
      onClick(target.dataset.id);
    }
  };
  return (
    <AxPanel
      {...rest}
      className={`ax-menu ${className ?? ""}`}
      onClick={checkMenuClick}
      data-size={size}
    >
      <AxContent padding="none" scroll>
        {children}
        {items &&
          items.map((item) =>
            isString(item) ? (
              <AxDivider>{item === "-" ? null : item}</AxDivider>
            ) : (
              <AxMenuItem {...item} />
            )
          )}
      </AxContent>
    </AxPanel>
  );
};
AxMenu.Item = AxMenuItem;
AxMenu.Divider = ({ children }) => <AxDivider>{children}</AxDivider>;
AxMenu.Text = ({ className, color = "dark", ...props }) => (
  <AxText
    className={`ax-padding--y--xs ax-padding--x--sm ${className}`}
    color={color}
    block
    ellipsis
    {...props}
  />
);

AxMenu.displayName = "AxMenu";
AxMenu.Item.displayName = "AxMenu.Item";
AxMenu.Text.displayName = "AxMenu.Text";
AxMenu.Divider.displayName = "AxMenu.Divider";