/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { forwardRef, type FC } from "react";
import { Indicator } from "../animations";
import { type ChildrenProp, type ElementProps, type RefProp } from "../types";

export interface SectionProps extends RefProp, ElementProps, ChildrenProp {
  /**
   * loading state
   */
  isLoading?: boolean;
}

/**
 * Sectioned layout component that provides the page layout and can be rendered as content of page
 */
export const AxSection: FC<SectionProps> = forwardRef<
  HTMLDivElement,
  SectionProps
>(({ className, isLoading, children, ...rest }, ref) => (
  <div {...rest} ref={ref} className={`ax-section ${className ?? ""}`}>
    {isLoading && <Indicator />}
    {children}
  </div>
)) as AnyObject;
AxSection.displayName = "AxSection";
