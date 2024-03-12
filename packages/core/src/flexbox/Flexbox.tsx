/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { forwardRef, useMemo, type ForwardRefExoticComponent } from "react";
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
export const FlexBoxRoot: ForwardRefExoticComponent<FlexboxProps> = forwardRef<
  HTMLDivElement,
  FlexboxProps
>(
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
    ref,
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
  },
) as AnyObject;
FlexBoxRoot.displayName = "AxFlexBox";

export const AxFlexBox = Object.assign(FlexBoxRoot, {
  Row: FlexboxRow,
  Col: FlexboxCol,
});

AxFlexBox.displayName = "AxFlexBox";
AxFlexBox.Row.displayName = "AxFlexBox.Row";
AxFlexBox.Col.displayName = "AxFlexBox.Col";
