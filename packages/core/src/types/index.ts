// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  AriaAttributes,
  FC,
  HTMLAttributeAnchorTarget,
  HTMLAttributes,
  RefAttributes
} from "react";

export interface VFC<T = KeyValue> extends FC<T> {
  children?: never;
}

export type RefProp<T = HTMLElement> = RefAttributes<T>;

export type BaseColor = "base" | "muted" | "invert";

/**
 * Basic application color palette
 */
export type Color = "default" | "primary" | "secondary" | "info" | "danger" | "success" | "warning";

/**
 * Grayscale colors
 */
export type Grayscale = "empty" | "lightest" | "light" | "medium" | "darkest" | "dark" | "opaque";

/**
 * Extended color palette
 */
export type ColorPalette =
  | "white"
  | "black"
  | "teal"
  | "green"
  | "cyan"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "yellow"
  | "orange"
  | "red"
  | "fuchsia"
  | "pink";

export type AllColors = Color | Grayscale | ColorPalette | BaseColor | string;

/**
 * Basic sizes
 */
export type Size = "default" | "xs" | "sm" | "md" | "lg" | "xl";
/**
 * Gutter size
 */
export type Gutter = "none" | "xs" | "sm" | "md" | "lg";

/**
 * Font
 */
export type Font = "sans-serif" | "serif" | "mono";
/**
 * Font weights
 */
export type Weight = "thin" | "light" | "medium" | "normal" | "bold" | "black";
/**
 * Text alignment
 */
export type TextAlign = "start" | "center" | "end" | "justify";
/**
 * Text transform
 */
export type TextTransform =
  | "title"
  | "lower"
  | "upper"
  | "smallcaps"
  | "underline"
  | "strikethrough";

/**
 * Spacing values
 */
export type Spacing = "none" | "xxs" | "xs" | "sm" | "md" | "lg" | "xl" | "xxl";

/**
 * Flexbox alignment
 */
export type AlignItem = "top" | "middle" | "bottom" | "stretch";
/**
 * Flexbox justify
 */
export type JustifyContent = "start" | "center" | "end" | "spaced" | "even";

export type EmptyCallback = () => void;
export type BooleanReturn = () => boolean | void;
export type BooleanCallback = (b: boolean) => void;

export type IconType = "blank" | string | JSX.Element;

export const SizeList = ["none", "xxs", "xs", "sm", "md", "lg", "xl", "xxl"];

export interface ElementProps extends AriaAttributes {
  /**
   * CSS class name
   */
  className?: HTMLAttributes<HTMLElement>["className"];
}

export interface AnchorProps {
  to?: string;
  href?: string;
  download?: boolean;
  target?: HTMLAttributeAnchorTarget | undefined;
}

export interface PaddingProps {
  /**
   * Padding
   * e.g. Spacing value or multiple spacing with @breakpoint separated by space
   */
  padding?: Spacing | string | true;
  /**
   * Padding: Start+End
   */
  paddingX?: Spacing | string | true;
  /**
   * Padding: Top+Bottom
   */
  paddingY?: Spacing | string | true;
  /**
   * Padding: Top
   */
  paddingTop?: Spacing | string | true;
  /**
   * Padding: Bottom
   */
  paddingBottom?: Spacing | string | true;
  /**
   * Padding: Start
   */
  paddingStart?: Spacing | string | true;
  /**
   * Padding: End
   */
  paddingEnd?: Spacing | string | true;
}
export interface MarginProps {
  /**
   * Margin
   * e.g. Spacing value or multiple spacing with @breakpoint separated by space
   */
  margin?: Spacing | string | true;
  /**
   * Margin: Start+End
   */
  marginX?: Spacing | string | true;
  /**
   * Margin: Top+Bottom
   */
  marginY?: Spacing | string | true;
  /**
   * Margin: Top
   */
  marginTop?: Spacing | string | true;
  /**
   * Margin: Bottom
   */
  marginBottom?: Spacing | string | true;
  /**
   * Margin: Start
   */
  marginStart?: Spacing | string | true;
  /**
   * Margin: End
   */
  marginEnd?: Spacing | string | true;
}

export interface IconProps {
  /**
   * Icon svg path (24x24) | font class | component
   */
  icon?: IconType;
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
  onCollapse?: (collapsed: boolean) => void;
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
  onExpand?: (expanded: boolean) => void;
}
