/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, HTMLAttributes } from "react";
import { NavLink } from "react-router-dom";
import { ChildrenProp, ElementProps } from "../types";

export interface LinkProps {
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
}

export const Link = forwardRef<
  HTMLElement,
  LinkProps & ElementProps & ChildrenProp & HTMLAttributes<HTMLElement>
>(({ to, href, ...props }, ref) =>
  !!to ? (
    <NavLink {...props} ref={ref as AnyObject} to={to} />
  ) : !!href ? (
    <a {...props} ref={ref as AnyObject} href={href} />
  ) : (
    <div {...props} ref={ref as AnyObject} />
  )
);
