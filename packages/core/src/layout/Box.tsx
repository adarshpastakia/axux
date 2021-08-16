// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, useMemo } from "react";
import { makeMargin, makePadding } from "../helpers";
import { AllColors, ElementProps, MarginProps, PaddingProps, RefProp, TextAlign } from "../types";

/** @internal */
export interface BoxProps extends ElementProps, MarginProps, PaddingProps, RefProp<HTMLDivElement> {
  /**
   * Inline block
   */
  inline?: boolean;
  /**
   * Background color
   */
  bg?: AllColors;
  /**
   * Text color
   */
  color?: AllColors;
  /**
   * Text align
   */
  align?: TextAlign;
}

/**
 * Simple box container
 * @param children
 * @param className
 * @param inline
 * @param bg
 * @param color
 * @param align
 * @param margin
 * @param marginX
 * @param marginY
 * @param marginTop
 * @param marginBottom
 * @param marginStart
 * @param marginEnd
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
export const AxBox: FC<BoxProps> = forwardRef<HTMLDivElement, BoxProps>(
  (
    {
      children,
      className,
      inline,
      bg,
      color,
      align,
      margin,
      marginX,
      marginY,
      marginTop,
      marginBottom,
      marginStart,
      marginEnd,
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
      const cls = ["ax-box", inline ? "ax-inline-block" : "ax-block", className ?? ""];
      if (bg) {
        cls.push(`ax-bg--${bg}`);
      }
      if (color) {
        cls.push(`ax-color--${color}`);
      }
      if (align) {
        cls.push(`ax-align--${align}`);
      }
      cls.push(
        makeMargin({
          margin,
          marginX,
          marginY,
          marginTop,
          marginBottom,
          marginStart,
          marginEnd
        })
      );
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
      align,
      bg,
      inline,
      className,
      color,
      margin,
      marginBottom,
      marginEnd,
      marginStart,
      marginTop,
      marginX,
      marginY,
      padding,
      paddingBottom,
      paddingEnd,
      paddingStart,
      paddingTop,
      paddingX,
      paddingY
    ]);

    return (
      <div ref={ref} className={classes} {...aria}>
        {children}
      </div>
    );
  }
);
AxBox.displayName = "AxBox";
