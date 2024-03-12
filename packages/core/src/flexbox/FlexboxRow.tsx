/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { forwardRef, useMemo } from "react";
import { type ChildrenProp, type ElementProps, type Gutter } from "../types";

export interface FlexboxRowProps extends ElementProps, ChildrenProp {
  /**
   * no wrap
   */
  noWrap?: boolean;
  /**
   * gutter size
   */
  gutter?: Gutter;
  /**
   * fixed height
   */
  height?: number | string;
  /**
   * min height
   */
  minHeight?: number | string;
  /**
   * flex orientation
   */
  orient?: "row" | "row-reverse" | "col" | "col-reverse";
  /**
   * y-axis alignment
   */
  align?: "start" | "end" | "center" | "stretch";
  /**
   * x-axis alignment
   */
  justify?: "start" | "end" | "center" | "between";
}

// eslint-disable-next-line react/display-name
export const FlexboxRow = forwardRef<HTMLDivElement, FlexboxRowProps>(
  (
    {
      children,
      height,
      minHeight,
      className,
      gutter,
      orient = "row",
      align = "stretch",
      justify = "start",
      noWrap = false,
      ...rest
    },
    ref,
  ) => {
    /** ***************** class map *******************/
    const classes = useMemo(() => {
      const cls = ["ax-row", className ?? ""];
      if (gutter) {
        cls.push(`gutter--${gutter}`);
      }
      return cls.join(" ");
    }, [gutter, className]);

    /** ***************** style map *******************/
    const styles = useMemo(() => {
      return {
        height,
        minHeight,
      };
    }, [height, minHeight]);

    /** ***************** component *******************/
    return (
      <div
        {...rest}
        ref={ref}
        style={styles}
        role="presentation"
        data-nowrap={noWrap}
        data-orient={orient}
        data-align={align}
        data-justify={justify}
        className={classes}
      >
        {children}
      </div>
    );
  },
);
