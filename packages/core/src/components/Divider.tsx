/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isString } from "@axux/utilities";
import { type FC, Fragment } from "react";
import { type ChildProp, type ElementProps } from "../types";

export interface DividerProps extends ElementProps, Partial<ChildProp> {
  /**
   * rainbow colored
   */
  rainbow?: boolean;
  /**
   * vertical style
   */
  vertical?: boolean;
  /**
   * divider size (width: horizontal, height:vertical)
   */
  width?: number;
  /**
   * color hex value
   */
  color?: string;
  /**
   * apply color as text bg
   */
  applyBg?: boolean;
  /**
   * margin size
   */
  size?: "sm" | "md";
  /**
   * text alignment
   */
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
          {isString(children) && (
            <div>
              <span>{children}</span>
            </div>
          )}
          {!isString(children) && children}
          <hr style={{ "--dv-width": width } as AnyObject} />
        </Fragment>
      )}
    </div>
  );
};
