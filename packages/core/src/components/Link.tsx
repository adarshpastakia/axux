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
import { NavLink } from "react-router-dom";
import { AxHotKey } from "../hotkeys/HotKey";
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

  hotKey?: string;
}

export const Link = forwardRef<
  HTMLElement,
  LinkProps & ElementProps & ChildrenProp & HTMLAttributes<HTMLElement>
>(({ to, href, hotKey, ...props }, ref) => {
  const linkRef = useRef<HTMLElement>(null);
  useImperativeHandle(ref, () => linkRef.current!, [linkRef]);
  return (
    <Fragment>
      {hotKey && (
        <AxHotKey
          keyCombo={hotKey}
          handler={() => linkRef.current?.click?.()}
        />
      )}
      {!!to ? (
        <NavLink {...props} ref={linkRef as AnyObject} to={to} />
      ) : !!href ? (
        <a {...props} ref={linkRef as AnyObject} href={href} />
      ) : (
        <div {...props} ref={linkRef as AnyObject} />
      )}
    </Fragment>
  );
});
Link.displayName = "LinkWrapper";
