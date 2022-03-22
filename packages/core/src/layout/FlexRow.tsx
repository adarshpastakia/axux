// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, forwardRef, useMemo } from "react";
import { AlignItem, ElementProps, Gutter, JustifyContent, RefProp } from "../types";

/** @internal */
export interface FlexRowProps extends ElementProps, RefProp<HTMLDivElement> {
  /**
   * Wrap columns
   */
  wrap?: boolean;
  /**
   * Arrange reverse order
   */
  reverse?: boolean;
  /**
   * Vertical flow
   */
  vertical?: boolean;
  /**
   * Item alignment
   */
  align?: AlignItem;
  /**
   * Justify content
   */
  justify?: JustifyContent;
  /**
   * Gutter spacing
   */
  gutter?: Gutter;
  /**
   * Fixed height
   */
  height?: number | string;
  /**
   * Min height
   */
  minHeight?: number | string;
}

/**
 * Flexbox row
 * @internal
 */
export const AxFlexRow: FC<FlexRowProps> = forwardRef<HTMLDivElement, FlexRowProps>(
  (
    {
      children,
      wrap = true,
      reverse = false,
      vertical = false,
      align = "",
      justify = "",
      gutter,
      className,
      height = "unset",
      minHeight = "unset",
      ...aria
    },
    ref
  ) => {
    const classes = useMemo(() => {
      const cls = ["ax-row", className ?? ""];
      if (wrap === false) {
        cls.push(`ax-row--nowrap`);
      }
      if (vertical) {
        cls.push(`ax-row--vertical`);
      }
      if (reverse) {
        cls.push(`ax-row--reverse`);
      }
      if (align) {
        cls.push(`ax-row--${align}`);
      }
      if (justify) {
        cls.push(`ax-row--${justify}`);
      }
      if (gutter !== undefined) {
        cls.push(`ax-gutter--${gutter}`);
      }
      return cls.join(" ");
    }, [className, wrap, vertical, reverse, align, justify, gutter]);

    const styles = useMemo(() => {
      return {
        height,
        minHeight
      };
    }, [height, minHeight]);

    return (
      <div ref={ref} className={classes} style={styles} {...aria}>
        {children}
      </div>
    );
  }
);
