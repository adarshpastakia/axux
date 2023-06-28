/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { type Placement } from "@popperjs/core";
import { type ReactNode, type RefAttributes } from "react";
import { AxIcon } from "../icons/Icon";
import { AppIcons } from "./appIcons";

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type CallbackReturn<T = boolean> = void | T | Promise<T | void>;
export type HandleCallback = () => CallbackReturn;
export type EmptyCallback = () => void;
export type ClickHandler = () => CallbackReturn<AnyObject>;
export type BooleanCallback = (truthy: boolean) => void;

export type Color = "primary" | "accent" | "danger" | "warning" | "success";

export type Size = "sm" | "md" | "lg";

export type NavigationDirection = "prev" | "next";

export type Gutter = "none" | Size;

export type RefProp<T = HTMLElement> = RefAttributes<T>;

export interface OverlayRef {
  close: EmptyCallback;
}
export interface ChildProp {
  children?: ReactNode;
}
export interface ChildrenProp {
  children?: ReactNode | ReactNode[];
}

export interface ElementProps extends React.AriaAttributes {
  className?: HTMLElement["className"];
}
export interface MouseProps {
  /**
   * click handler
   */
  onClick?: ClickHandler;
}

export interface SizeObject {
  width: number;
  height: number;
}

export interface IconProp {
  /**
   * icon
   *
   * [webfont className | svg path | url | 2 character string]
   */
  icon?: string;
  /**
   * flip icon when rtl
   */
  rtlFlip?: boolean;
}

export interface TooltipProps {
  /**
   * tooltip content
   */
  content: string | JSX.Element;
  /**
   * color
   */
  color?: Color | "info";
  /**
   * placement
   */
  placement?: Placement;

  autoHide?: boolean;
}

export interface BadgeProps {
  className?: HTMLElement["className"];

  /**
   * badge content
   */
  value?: string | number;
  /**
   * badge icon
   */
  icon?: string;
  /**
   * color
   */
  color?: Color;
  /**
   * animate ping
   */
  ping?: boolean;
  /**
   * placement
   */
  placement?:
    | "top"
    | "bottom"
    | "start"
    | "end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
}

export interface CollapseProps {
  /**
   * Allow collapsing
   */
  isCollapsable?: boolean;
  /**
   * Default collapsed
   */
  isCollapsed?: boolean;
  /**
   * Collapse event
   */
  onCollapse?: BooleanCallback;
}
export interface ExpandProps {
  /**
   * Allow expanding
   */
  isExpandable?: boolean;
  /**
   * Default expanded
   */
  isExpanded?: boolean;
  /**
   * Expand event
   */
  onExpand?: BooleanCallback;
}

export type OverlayProps<T extends KeyValue> = {
  /**
   * action handler
   */
  onClose: (returnValue?: AnyObject) => void;
} & T;

export type TooltipType = string | TooltipProps;
export type BadgeType = string | number | BadgeProps;

export const SizeList = ["sm", "md", "lg"];

export const CloseX = (cb?: AnyObject, icon = AppIcons.iconClose) => (
  <span
    className="close-x"
    role="button"
    aria-label="close"
    onClick={(e) => (e?.stopPropagation(), cb?.())}
  >
    <AxIcon icon={icon} />
  </span>
);
