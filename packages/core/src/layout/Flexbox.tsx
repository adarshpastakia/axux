/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, type ForwardRefExoticComponent, useMemo } from "react";
import { type ChildrenProp, type ElementProps, type Gutter } from "../types";
import { FlexboxCol } from "./FlexboxCol";
import { FlexboxRow } from "./FlexboxRow";

export interface FlexboxProps extends ElementProps, ChildrenProp {
  /**
   * full width
   */
  fluid?: boolean;
  /**
   * gutter size
   */
  gutter?: Gutter;
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

/**
 * FlexBox layout
 */
export const AxFlexBox: ForwardRefExoticComponent<FlexboxProps> & {
  Row: typeof FlexboxRow;
  Col: typeof FlexboxCol;
} = forwardRef<HTMLDivElement, FlexboxProps>(
  (
    {
      fluid,
      gutter = "nm",
      className,
      children,
      width,
      minWidth,
      maxWidth,
      ...rest
    },
    ref
  ) => {
    /** ***************** class map *******************/
    const classes = useMemo(() => {
      const cls = ["ax-flexbox", className ?? ""];
      if (gutter) {
        cls.push(`gutter--${gutter}`);
      }
      return cls.join(" ");
    }, [fluid, gutter, className]);

    /** ***************** component *******************/
    return (
      <div
        {...rest}
        role="presentation"
        className={classes}
        data-fluid={fluid}
        ref={ref}
        style={{ width, minWidth, maxWidth }}
      >
        {children}
      </div>
    );
  }
) as AnyObject;
AxFlexBox.Row = FlexboxRow;
AxFlexBox.Col = FlexboxCol;

AxFlexBox.displayName = "AxFlexBox";
AxFlexBox.Row.displayName = "AxFlexBox.Row";
AxFlexBox.Col.displayName = "AxFlexBox.Col";
