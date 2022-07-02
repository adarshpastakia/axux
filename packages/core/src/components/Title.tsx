/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { ChildrenProp, ElementProps } from "../types";
import { Ellipsis } from "../typography/Ellipsis";

/**
 * title
 */
export const AxTitle: FC<ElementProps & ChildrenProp> = ({
  className,
  ...rest
}) => <Ellipsis {...rest} className={`ax-title ${className ?? ""}`} />;
