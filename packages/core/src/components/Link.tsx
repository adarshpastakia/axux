/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  forwardRef,
  Fragment,
  HTMLAttributes,
  useImperativeHandle,
  useRef,
} from "react";
import { NavLink, useInRouterContext } from "react-router-dom";
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
  /**
   * navlink route state
   */
  state?: KeyValue;

  as?: React.ElementType;

  type?: "button" | "submit" | "reset";
}

export const Link = forwardRef<
  HTMLElement,
  LinkProps & ElementProps & ChildrenProp & HTMLAttributes<HTMLElement>
>(
  (
    {
      to,
      href,
      state,
      as: T = "div",
      onClick,
      onMouseDown,
      type,
      ...props
    },
    ref
  ) => {
    const linkRef = useRef<HTMLElement>(null);
    const isInrouter = useInRouterContext();
    useImperativeHandle(ref, () => linkRef.current!, [linkRef]);
    return (
      <Fragment>
        {isInrouter && !!to ? (
          <NavLink
            {...props}
            ref={linkRef as AnyObject}
            to={to}
            state={state}
            onClick={onClick}
            onMouseDown={onMouseDown}
          />
        ) : !!href ? (
          <a
            {...props}
            ref={linkRef as AnyObject}
            href={href}
            onClick={onClick}
            onMouseDown={onMouseDown}
          />
        ) : (
          <T
            {...props}
            type={type}
            ref={linkRef as AnyObject}
            onClick={onClick}
            onMouseDown={onMouseDown}
          />
        )}
      </Fragment>
    );
  }
);
Link.displayName = "LinkWrapper";
