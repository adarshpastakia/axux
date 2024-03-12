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
 * title
 */
export const AxTitle: FC<ElementProps & ChildrenProp> = ({
  className,
  ...rest
}) => <div {...rest} className={`ax-title ${className ?? ""}`} />;
