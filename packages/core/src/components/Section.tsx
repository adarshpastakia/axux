/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef } from "react";
import { Indicator } from "../animations";
import { ChildrenProp, ElementProps } from "../types";

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
  )
);
AxSection.displayName = "AxSection";
