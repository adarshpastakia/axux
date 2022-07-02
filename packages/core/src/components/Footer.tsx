/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { ChildrenProp, ElementProps } from "../types";

/**
 * footer panel
 */
export const AxFooter: FC<ElementProps & ChildrenProp> = ({
  className,
  ...rest
}) => <div {...rest} className={`ax-footer ${className ?? ""}`} />;
