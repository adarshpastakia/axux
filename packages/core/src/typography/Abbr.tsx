// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";
import { isColor } from "../helpers";
import { AxTooltip } from "../overlays/Tooltip";

export interface AbbrProps {
  tooltip: string;
  color?: string;
}

export const AxAbbr: FC<AbbrProps> = ({ tooltip, color, children }) => (
  <AxTooltip content={tooltip} usePortal>
    <abbr className={`ax-abbr ax-color--${color}`} style={color && isColor(color) ? { color } : {}}>
      {children}
    </abbr>
  </AxTooltip>
);
