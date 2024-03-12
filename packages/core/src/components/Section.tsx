/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { forwardRef } from "react";
import { Indicator } from "../animations";
import { type ChildrenProp, type ElementProps } from "../types";

export interface SectionProps extends ElementProps, ChildrenProp {
  /**
   * loading state
   */
  isLoading?: boolean;
}

/**
 * sectioned panel
 */
export const AxSection = forwardRef<HTMLDivElement, SectionProps>(
  ({ className, isLoading, children, ...rest }, ref) => (
    <div {...rest} ref={ref} className={`ax-section ${className ?? ""}`}>
      {isLoading && <Indicator />}
      {children}
    </div>
  ),
);
AxSection.displayName = "AxSection";
