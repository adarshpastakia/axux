/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type ReactElement } from "react";
import { type AxDivider } from "../components/Divider";
import { type LinkProps } from "../components/Link";
import {
  type BadgeType,
  type ChildrenProp,
  type CollapseProps,
  type ElementProps,
  type IconProp,
  type MouseProps,
} from "../types";

export type MenuChildren = ReactElement<
  MenuItemProps | MenuGroupProps | typeof AxDivider
>;

export interface MenuItemProps<T = string>
  extends ElementProps,
    IconProp,
    MouseProps {
  /**
   * menu label
   */
  id?: string;
  /**
   * menu label
   */
  label: T;
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
  /**
   * append element
   */
  append?: ReactElement;
  /**
   * navigation props
   */
  nav?: LinkProps;
}

export interface MenuGroupProps
  extends ElementProps,
    IconProp,
    ChildrenProp<MenuChildren>,
    Omit<CollapseProps, "isCollapsable"> {
  /**
   * menu label
   */
  label: string;
  /**
   * group type
   */
  type?: "divider" | "mini" | "floating" | "collapsable";
  /**
   * badge
   */
  badge?: BadgeType;
}

export interface MenuProps extends ElementProps, ChildrenProp<MenuChildren> {
  /**
   * menu click handler
   * @param id
   * @returns
   */
  onClick?: (id: string) => void;
}
