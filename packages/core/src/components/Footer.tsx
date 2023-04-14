/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
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
