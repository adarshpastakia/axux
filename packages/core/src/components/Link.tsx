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
  replace?: boolean;
  download?: boolean;
}

interface LinkWrapperProps {
  as?: React.ElementType;
  nav?: LinkProps;
  type?: "button" | "submit" | "reset";
}

export const Link = forwardRef<
  HTMLElement,
  LinkWrapperProps & ElementProps & ChildrenProp & HTMLAttributes<HTMLElement>
>(
  (
    {
      nav: { to, href, state, replace, download, target } = {},
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
            target={target}
            replace={replace}
            download={download}
            onClick={onClick}
            onMouseDown={onMouseDown}
          />
        ) : !!href ? (
          <a
            {...props}
            ref={linkRef as AnyObject}
            href={href}
            target={target}
            download={download}
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
