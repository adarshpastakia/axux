// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, MouseEventHandler, useMemo } from "react";
import { NavLink } from "react-router-dom";
import { AnchorProps, ElementProps } from "../types";

/** @internal */
export interface LinkProps extends AnchorProps, ElementProps {
  /**
   * URL
   */
  href: string;
  /**
   * Click event handler
   */
  onClick?: MouseEventHandler;
}

/**
 * Link element
 * @param children
 * @param href
 * @param onClick
 * @param className
 * @param aria-*
 * @constructor
 * @internal
 */
export const AxLink: FC<LinkProps> = ({ children, href, onClick, className, ...aria }) => {
  const classes = useMemo(() => {
    const classes = ["ax-link", className ?? ""];
    return classes.join(" ");
  }, [className]);
  return (
    <NavLink to={href} rel="noreferrer" onClick={onClick} className={classes} {...aria}>
      {children}
    </NavLink>
  );
};
AxLink.displayName = "AxLink";
