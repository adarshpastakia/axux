// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";
import { ElementProps } from "../types";

/** @internal */
export type ViewportFooterProps = ElementProps;

/**
 * Viewport footer
 * @param className
 * @param children
 * @param aria
 * @constructor
 * @internal
 */
export const AxViewportFooter: FC<ViewportFooterProps> = ({ className, children, ...aria }) => {
  return (
    <div className={`ax-viewport__footer ${className ?? ""}`} {...aria}>
      {children}
    </div>
  );
};
