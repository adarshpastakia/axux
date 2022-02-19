// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useMemo } from "react";
import { Color, ColorPalette, VFC } from "../types";

/** @internal */
export interface MeterProps {
  /**
   * Meter value
   */
  value: number;
  /**
   * Meter theme
   */
  color?: Color | ColorPalette | "rainbow";
  /**
   * Meter border
   */
  border?: boolean;
  /**
   * Show value label
   */
  showLabel?: boolean;
}

/**
 * Meter bar
 * @param value
 * @param showLabel
 * @param color
 * @param border
 * @constructor
 */
export const AxMeter: VFC<MeterProps> = ({ value = 0, showLabel, color, border }) => {
  const percent = useMemo(() => {
    return `${(value > 100 ? 100 : value).toFixed(2)}%`;
  }, [value]);
  return (
    <div
      className={`ax-meter ${border ? "ax-border" : ""} ax-border--${color}`}
      data-theme={color}
      style={{
        paddingInlineStart: percent
      }}
    >
      {showLabel && <label>{percent}</label>}
    </div>
  );
};
