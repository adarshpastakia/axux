/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { type ChildrenProp, type ElementProps } from "../types";

export interface LoaderProps extends ElementProps, ChildrenProp {
  /**
   * loader position
   */
  position?: "absolute" | "fixed";
}

/**
 * loader overlay
 */
export const AxLoader: FC<LoaderProps> = ({
  children,
  className,
  position = "absolute",
  ...rest
}) => {
  /** ***************** component *******************/
  return (
    <div {...rest} className={`ax-loader ${position}`} aria-hidden="true">
      <div className={className}>{children}</div>
    </div>
  );
};
