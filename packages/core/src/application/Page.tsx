/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { Indicator } from "../animations";
import { type ChildrenProp, type ElementProps } from "../types";

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
  isPaper = false,
  isLoading = false,
  ...rest
}) => {
  /** ***************** component *******************/
  return (
    <div
      {...rest}
      data-test-loading={isLoading}
      className={`ax-page ${isPaper ? "paper" : ""} ${className ?? ""}`}
    >
      {isLoading && <Indicator />}
      {children}
    </div>
  );
};
