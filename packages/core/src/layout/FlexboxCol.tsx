/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, useMemo } from "react";
import { ChildrenProp, ElementProps } from "../types";

export interface FlexboxColProps extends ElementProps, ChildrenProp {
  /**
   * column span
   */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | string;
  /**
   * column flex
   */
  flex?: "auto" | "fill" | "full";
  /**
   * y-axis alignment
   */
  align?: "start" | "end" | "center" | "stretch";
  /**
   * fixed height
   */
  height?: number | string;
  /**
   * min height
   */
  minHeight?: number | string;
  /**
   * fixed width
   */
  width?: number | string;
  /**
   * min width
   */
  minWidth?: number | string;
  /**
   * max width
   */
  maxWidth?: number | string;
}

export const FlexboxCol = forwardRef<HTMLDivElement, FlexboxColProps>(
  (
    {
      children,
      height,
      minHeight,
      width,
      minWidth,
      maxWidth,
      className,
      flex,
      span,
      align,
      ...rest
    },
    ref
  ) => {
    /******************* class map *******************/
    const classes = useMemo(() => {
      const cls = ["ax-col", className ?? ""];
      if (align) {
        cls.push(`self-${align}`);
      }
      if (flex) {
        cls.push(`ax-col--${flex}`);
      } else if (span) {
        span
          .toString()
          .split(" ")
          .forEach((s) => cls.push(`ax-col--${s}`));
      }
      return cls.join(" ");
    }, [className, flex, span, align]);

    /******************* style map *******************/
    const styles = useMemo(() => {
      return {
        height,
        minHeight,
        width,
        minWidth,
        maxWidth,
      };
    }, [width, minWidth, maxWidth, height, minHeight]);

    /******************* component *******************/
    return (
      <div
        {...rest}
        ref={ref}
        role="presentation"
        className={classes}
        style={styles}
      >
        {children}
      </div>
    );
  }
);
