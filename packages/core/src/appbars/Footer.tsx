// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";
import { ElementProps } from "../types";

/**
 * Footer bar
 * @internal
 */
export const AxFooter: FC<ElementProps> = ({ children, className, ...props }) => {
  return (
    <div className={`ax-footer ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};
