/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ReactElement } from "react";
import { AxDivider } from "../components/Divider";
import {
  BadgeType,
  CollapseProps,
  ElementProps,
  IconProp,
  MouseProps,
} from "../types";

export type MenuChildren =
  | ReactElement<MenuItemProps | MenuGroupProps | typeof AxDivider>
  | undefined;

export interface MenuItemProps extends ElementProps, IconProp, MouseProps {
  /**
   * menu label
   */
  id?: string;
  /**
   * menu label
   */
  label: string;
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
   * active state
   */
  isActive?: boolean;
  /**
   * disabled state
   */
  isDisabled?: boolean;
  /**
   * badge
   */
  badge?: BadgeType;
  /**
   * hot key
   */
  hotKey?: string;
  children?: MenuChildren | MenuChildren[];
}

export interface MenuGroupProps
  extends ElementProps,
    IconProp,
    Omit<CollapseProps, "isCollapsable"> {
  children: MenuChildren | MenuChildren[];
  /**
   * menu label
   */
  label: string;
  /**
   * group type
   */
  type?: "divider" | "mini" | "floating" | "collapsable";
}

export interface MenuProps extends ElementProps {
  children: MenuChildren | MenuChildren[];
  onClick?: (id: string) => void;
}
