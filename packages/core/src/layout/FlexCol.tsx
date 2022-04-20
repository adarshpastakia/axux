// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, useMemo } from "react";
import { makePadding } from "../helpers";
import { AlignItem, ElementProps, PaddingProps, RefProp } from "../types";

/** @internal */
export interface FlexColProps extends ElementProps, PaddingProps, RefProp<HTMLDivElement> {
  /**
   * Column span
   */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | string;
  /**
   * Column flex
   */
  flex?: "auto" | "fill" | "full";
  /**
   * Set inner content to 100% height
   */
  stretchContent?: boolean;
  /**
   * Align self
   */
  align?: AlignItem;
  /**
   * Fixed height
   */
  height?: number | string;
  /**
   * Min height
   */
  minHeight?: number | string;
  /**
   * Fixed width
   */
  width?: number | string;
  /**
   * Min width
   */
  minWidth?: number | string;
  /**
   * Max width
   */
  maxWidth?: number | string;
}

/**
 * FlexBox column
 * @param span
 * @param flex
 * @param stretchContent
 * @param align
 * @param width
 * @param minWidth
 * @param height
 * @param minHeight
 * @param className
 * @param children
 * @param padding
 * @param paddingX
 * @param paddingY
 * @param paddingTop
 * @param paddingBottom
 * @param paddingStart
 * @param paddingEnd
 * @param aria-*
 * @constructor
 * @internal
 */
export const AxFlexCol: FC<FlexColProps> = forwardRef<HTMLDivElement, FlexColProps>(
  (
    {
      children,
      span,
      flex,
      stretchContent = false,
      align = "",
      width = "unset",
      maxWidth = "unset",
      minWidth = "unset",
      height = "unset",
      minHeight = "unset",
      className,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd,
      ...aria
    },
    ref
  ) => {
    const classes = useMemo(() => {
      const cls = ["ax-col", className ?? ""];
      if (flex) {
        cls.push(`ax-col--${flex}`);
      }
      if (stretchContent) {
        cls.push(`ax-col--content-stretch`);
      }
      if (align) {
        cls.push(`ax-col--${align}`);
      }
      if (span) {
        span
          .toString()
          .split(" ")
          .forEach((s) => cls.push(`ax-col--${s}`));
      } else if (!flex) {
        cls.push(`ax-col--auto`);
      }
      cls.push(
        makePadding({
          padding,
          paddingX,
          paddingY,
          paddingTop,
          paddingBottom,
          paddingStart,
          paddingEnd
        })
      );
      return cls.join(" ");
    }, [
      className,
      flex,
      stretchContent,
      align,
      span,
      padding,
      paddingX,
      paddingY,
      paddingTop,
      paddingBottom,
      paddingStart,
      paddingEnd
    ]);

    const styles = useMemo(() => {
      return {
        height,
        minHeight,
        width,
        maxWidth,
        minWidth
      };
    }, [height, maxWidth, minHeight, minWidth, width]);

    return (
      <div ref={ref} className={classes} style={styles} {...aria}>
        {children}
      </div>
    );
  }
);
