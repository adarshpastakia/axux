/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import {
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
  type DragEvent,
  type HTMLAttributes,
} from "react";
import { NavLink, useInRouterContext } from "react-router-dom";
import { type ChildrenProp, type ElementProps } from "../types";

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
  /**
   * replace nav location
   */
  replace?: boolean;
  /**
   * is download link
   */
  download?: boolean;
}

interface LinkWrapperProps {
  /**
   * link as
   */
  as?: React.ElementType;
  /**
   * link nav props
   */
  nav?: LinkProps;
  /**
   * link type
   */
  type?: "button" | "submit" | "reset";
  /**
   * make card draggable
   */
  draggable?: boolean;
  /**
   * drag event data key
   */
  dragKey?: string;
  /**
   * drag event data
   */
  dragData?: KeyValue;
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
      dragKey,
      dragData,
      draggable,
      ...props
    },
    ref,
  ) => {
    const linkRef = useRef<HTMLElement>(null);
    const isInrouter = useInRouterContext();
    useImperativeHandle<HTMLElement | null, HTMLElement | null>(
      ref,
      () => linkRef.current,
      [linkRef],
    );
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
            draggable={draggable}
            onDragStart={
              !draggable
                ? undefined
                : (e: DragEvent) =>
                    dragKey &&
                    e.dataTransfer?.setData(dragKey, JSON.stringify(dragData))
            }
            onClick={onClick}
            onMouseDown={onMouseDown}
          />
        ) : href ? (
          <a
            {...props}
            role="button"
            ref={linkRef as AnyObject}
            href={href}
            target={target}
            download={download}
            draggable={draggable}
            onDragStart={
              !draggable
                ? undefined
                : (e: DragEvent) =>
                    dragKey &&
                    e.dataTransfer?.setData(dragKey, JSON.stringify(dragData))
            }
            onClick={onClick}
            onMouseDown={onMouseDown}
          >
            {props.children}
          </a>
        ) : (
          <T
            {...props}
            type={type}
            draggable={draggable}
            onDragStart={
              !draggable
                ? undefined
                : (e: DragEvent) =>
                    dragKey &&
                    e.dataTransfer?.setData(dragKey, JSON.stringify(dragData))
            }
            ref={linkRef as AnyObject}
            onClick={onClick}
            onMouseDown={onMouseDown}
          />
        )}
      </Fragment>
    );
  },
);
Link.displayName = "LinkWrapper";
