// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, useMemo } from "react";
import { ElementProps, Gutter, RefProp } from "../types";
import { AxFlexCol } from "./FlexCol";
import { AxFlexRow } from "./FlexRow";

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
  /**
   * Max width
   */
  maxWidth?: string | number;
}

interface ExtendedFC extends FC<FlexBoxProps> {
  Row: typeof AxFlexRow;
  Col: typeof AxFlexCol;
  Grid: typeof Grid;
  Space: typeof Spacing;
}

const Grid: FC<ElementProps & { columns?: number }> = ({ className, columns = 2, ...props }) => {
  return (
    <div
      className={`ax-grid ${className ?? ""}`}
      {...props}
      style={{ "--columns": Math.min(4, Math.max(1, columns)) } as AnyObject}
    />
  );
};

const Spacing: FC<ElementProps> = ({ className, ...props }) => {
  return <div className={`ax-spacing ${className ?? ""}`} {...props} />;
};

/**
 * FlexBox container for Grid and Flex items
 * @internal
 */
export const AxFlexBox: ExtendedFC = forwardRef<HTMLDivElement, FlexBoxProps>(
  ({ fluid = false, gutter, maxWidth, children, className }, ref) => {
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
      <div ref={ref} className={classes} style={{ maxWidth }}>
        {children}
      </div>
    );
  }
) as AnyObject;
AxFlexBox.Row = AxFlexRow;
AxFlexBox.Col = AxFlexCol;
AxFlexBox.Grid = Grid;
AxFlexBox.Space = Spacing;

AxFlexBox.displayName = "AxFlexBox";
AxFlexBox.Row.displayName = "AxFlexBox.Row";
AxFlexBox.Col.displayName = "AxFlexBox.Col";
AxFlexBox.Grid.displayName = "AxFlexBox.Grid";
AxFlexBox.Space.displayName = "AxFlexBox.Spaced";
