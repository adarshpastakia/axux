// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, useMemo } from "react";
import { ElementProps, Gutter, RefProp } from "../types";
import { AxFlexCol, FlexColProps } from "./FlexCol";
import { AxFlexRow, FlexRowProps } from "./FlexRow";

/** @internal */
export interface FlexBoxProps extends ElementProps, RefProp<HTMLDivElement> {
  /**
   * Full width container
   */
  fluid?: boolean;
  /**
   * Gutter spacing
   */
  gutter?: Gutter;
}

interface ExtendedFC extends FC<FlexBoxProps> {
  Row: typeof AxFlexRow;
  Col: typeof AxFlexCol;
}

/**
 * FlexBox layout components
 * @internal
 */
export const AxFlexBox: ExtendedFC = forwardRef<HTMLDivElement, FlexBoxProps>(
  ({ fluid = false, gutter, children, className }, ref) => {
    const classes = useMemo(() => {
      const cls = ["ax-container", className ?? ""];
      if (fluid) {
        cls.push("ax-container--fluid");
      }
      if (gutter !== undefined) {
        cls.push(`ax-gutter--${gutter}`);
      }
      return cls.join(" ");
    }, [className, fluid, gutter]);

    return (
      <div ref={ref} className={classes}>
        {children}
      </div>
    );
  }
) as AnyObject;
AxFlexBox.Row = AxFlexRow;
AxFlexBox.Col = AxFlexCol;

AxFlexBox.displayName = "AxFlexBox";
AxFlexBox.Row.displayName = "AxFlexBox.Row";
AxFlexBox.Col.displayName = "AxFlexBox.Col";
