/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC } from "react";
import { AxIcon } from "../icons/Icon";
import { type BadgeProps as BP, type ElementProps } from "../types";

export interface BadgeProps extends Omit<BP, "value">, ElementProps {
  children?: string | number;
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
