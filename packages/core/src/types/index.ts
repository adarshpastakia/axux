/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */
/* istanbul ignore file */

import { type Placement } from "@popperjs/core";
import { type ReactNode, type RefAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/no-invalid-void-type
export type CallbackReturn<T = unknown> = void | T | Promise<T | void>;
export type HandleCallback = () => CallbackReturn;
export type EmptyCallback = () => void;
export type ClickHandler<T = unknown> = (
  ...args: AnyObject[]
) => CallbackReturn<T>;
export type BooleanCallback = (truthy: boolean) => void;

export type Color =
  | "primary"
  | "accent"
  | "info"
  | "danger"
  | "warning"
  | "success";

export type COLORS =
  | "scarlet"
  | "pumpkin"
  | "jade"
  | "denim"
  | "iris"
  | "lilac"
  | "coral"
  | "wood"
  | string;

export type COLOR_SCHEME = "light" | "dark";

export type Size = "sm" | "md" | "lg" | "normal";

export type NavigationDirection = "prev" | "next";

export type Gutter = "none" | "sm" | "md" | "lg" | "normal";

export type RefProp<T = HTMLElement> = RefAttributes<T>;

export interface OverlayRef {
  close: EmptyCallback;
}
export interface ChildProp<T = ReactNode> {
  /**
   * single child of type <T>
   */
  children: T | false;
}
export interface ChildrenProp<T = ReactNode> {
  /**
   * one or more children of type <T>
   */
  children: false | T | Array<false | undefined | T>;
}

export interface ElementProps extends React.AriaAttributes {
  /**
   * css classnames
   */
  className?: HTMLElement["className"];
}
export interface MouseProps {
  /**
   * click handler
   */
  onClick?: ClickHandler;
  /**
   * dont propagate click event
   */
  stopPropagation?: boolean;
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
