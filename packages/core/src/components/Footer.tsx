/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { type ChildrenProp, type ElementProps } from "../types";

/**
 * footer panel
 */
export const AxFooter: FC<
  ElementProps &
    ChildrenProp & {
      justify?: "start" | "end" | "center" | "between";
    }
> = ({ className, justify = "start", ...rest }) => (
  <div
    {...rest}
    className={`ax-footer justify-${justify} ${className ?? ""}`}
  />
);
