/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { ChildrenProp, ElementProps } from "../types";

export interface LoaderProps extends ElementProps, ChildrenProp {
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
  /******************* component *******************/
  return (
    <div {...rest} className={`ax-loader ${position}`} aria-hidden="true">
      <div className={className}>{children}</div>
    </div>
  );
};
