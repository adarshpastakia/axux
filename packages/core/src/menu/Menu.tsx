// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, MouseEvent } from "react";
import { AxDivider } from "../divider/Divider";
import { AxContent } from "../panels/Content";
import { AxPanel } from "../panels/Panel";
import { ElementProps, IconProps, Size } from "../types";
import { AxText, TextProps } from "../typography/Text";
import { AxMenuItem } from "./MenuItem";
import { useIcon } from "../hooks/useIcon";
import { AxMenuBar } from "./MenuBar";

/** @internal */
export interface MenuProps extends Omit<ElementProps, "onClick"> {
  size?: Size;
  title?: string;
  panelId?: string;
  withIcons?: boolean;
  onClick?: (menuId: string) => void;
}

interface ExtendedFC extends FC<MenuProps> {
  Item: typeof AxMenuItem;
  Bar: typeof AxMenuBar;
  Text: FC<
    IconProps &
      Pick<TextProps, "bg" | "color" | "transform" | "align" | "size" | "weight" | "className">
  >;
  Divider: FC;
}

/**
 * Menus
 * @internal
 */
export const AxMenu: ExtendedFC = ({ children, withIcons, size, onClick, className, ...rest }) => {
  const checkMenuClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (onClick && target.dataset.id) {
      onClick(target.dataset.id);
    }
  };
  return (
    <AxPanel {...rest}>
      <AxContent
        className={`ax-menu ${className ?? ""}`}
        padding="none"
        onClick={checkMenuClick}
        data-size={size}
        data-with-icons={withIcons}
      >
        {children}
      </AxContent>
    </AxPanel>
  );
};
AxMenu.Bar = AxMenuBar;
AxMenu.Item = AxMenuItem;
AxMenu.Divider = ({ children }) => <AxDivider>{children}</AxDivider>;
AxMenu.Text = ({ className, color = "dark", icon, rtlFlip, ...props }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const iconEl = useIcon(icon, "", rtlFlip);
  return (
    <div className="ax-menu__text">
      {iconEl ?? <span />}
      <AxText className={`${className}`} color={color} block ellipsis {...props} />
    </div>
  );
};

AxMenu.displayName = "AxMenu";
AxMenu.Bar.displayName = "AxMenu.Bar";
AxMenu.Item.displayName = "AxMenu.Item";
AxMenu.Text.displayName = "AxMenu.Text";
AxMenu.Divider.displayName = "AxMenu.Divider";
