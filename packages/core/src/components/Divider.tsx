/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, Fragment } from "react";
import { ElementProps } from "../types";

export interface DividerProps extends ElementProps {
  children?: string;
  rainbow?: boolean;
  vertical?: boolean;
  size?: "xs" | "sm";
  align?: "start" | "center" | "end";
}

/**
 * divider with labels
 */
export const AxDivider: FC<DividerProps> = ({
  children,
  rainbow,
  vertical,
  size,
  align = "start",
  className,
  ...rest
}) => {
  /******************* component *******************/
  return (
    <div
      {...rest}
      data-size={size}
      data-align={align}
      data-rainbow={rainbow}
      data-vertical={vertical}
      data-has-label={!!children}
      className={`ax-divider ${className ?? ""}`}
    >
      <hr />
      {children && (
        <Fragment>
          <span>{children}</span>
          <hr />
        </Fragment>
      )}
    </div>
  );
};
