/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, Fragment } from "react";
import { ChildProp, ElementProps } from "../types";

export interface DividerProps extends ElementProps, ChildProp {
  rainbow?: boolean;
  vertical?: boolean;
  width?: number;
  color?: string;
  applyBg?: boolean;
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
  color,
  width = 1,
  applyBg,
  align = "start",
  className,
  ...rest
}) => {
  /** ***************** component *******************/
  return (
    <div
      {...rest}
      data-size={size}
      data-bg={applyBg}
      data-align={align}
      data-rainbow={rainbow}
      data-vertical={vertical}
      data-has-label={!!children}
      className={`ax-divider ${className ?? ""}`}
      style={{ "--dv-color": color } as AnyObject}
    >
      <hr style={{ "--dv-width": width } as AnyObject} />
      {children && (
        <Fragment>
          <div>
            <span>{children}</span>
          </div>
          <hr style={{ "--dv-width": width } as AnyObject} />
        </Fragment>
      )}
    </div>
  );
};
