/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { Indicator } from "../animations";
import { ChildrenProp, ElementProps } from "../types";

export interface PageProps extends ElementProps, ChildrenProp {
  /**
   * paper shadow
   */
  isPaper?: boolean;
  /**
   * loading state
   */
  isLoading?: boolean;
}

export const AxPage: FC<PageProps> = ({
  children,
  className,
  isPaper,
  isLoading,
  ...rest
}) => {
  /******************* component *******************/
  return (
    <div
      {...rest}
      className={`ax-page ${isPaper ? "ax-paper" : ""} ${className ?? ""}`}
    >
      {isLoading && <Indicator />}
      {children}
    </div>
  );
};
