// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";
import { AxTooltip } from "../overlays/Tooltip";
import { isColor } from "@axux/utilities";

export interface AbbrProps {
  tooltip: string;
  color?: string;
}

export const AxAbbr: FC<AbbrProps> = ({ tooltip, color, children }) => (
  <AxTooltip content={tooltip}>
    <abbr className={`ax-abbr ax-color--${color}`} style={color && isColor(color) ? { color } : {}}>
      {children}
    </abbr>
  </AxTooltip>
);
