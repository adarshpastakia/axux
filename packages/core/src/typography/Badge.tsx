/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { AxIcon } from "../icons/Icon";
import { BadgeProps as BP } from "../types";

export interface BadgeProps extends Omit<BP, "value"> {
  children?: string | number;
  /**
   * placement
   */
  placement?:
    | "top"
    | "bottom"
    | "start"
    | "end"
    | "top-start"
    | "top-end"
    | "bottom-start"
    | "bottom-end";
}

/**
 * Info badges with pinging animation
 */
export const Badge: FC<BadgeProps> = ({
  children,
  color,
  ping,
  icon,
  placement,
}) => {
  /******************* component *******************/
  return (
    <span
      className="ax-badge"
      data-color={color}
      data-is-icon={!!icon}
      data-placement={placement}
      data-empty={!children && !icon}
    >
      <span className="ax-badge__label">
        {icon && <AxIcon icon={icon} />}
        {children && <span>{children}</span>}
      </span>
      {ping && <span className="ax-badge__ping" />}
    </span>
  );
};
