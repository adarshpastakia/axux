/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { AxIcon } from "../icons/Icon";
import {
  type BadgeProps as BP,
  type ChildrenProp,
  type ElementProps,
} from "../types";

export interface BadgeProps
  extends Omit<BP, "value">,
    ElementProps,
    ChildrenProp<string | number | undefined> {
  //
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
  className,
}) => {
  /** ***************** component *******************/
  return (
    <span
      className={`ax-badge ${className ?? ""}`}
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
