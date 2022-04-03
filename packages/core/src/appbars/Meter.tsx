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
 * @internal
 */
export const AxMeter: VFC<MeterProps> = ({ value = 0, showLabel, color, border }) => {
  const percent = useMemo(() => {
    return `${((value > 1 ? value / 100 : value) * 100).toFixed(2)}%`;
  }, [value]);
  return (
    <div
      className="ax-meter"
      data-border={border}
      data-theme={color}
      style={{
        paddingInlineStart: percent
      }}
    >
      {showLabel && <label>{percent}</label>}
    </div>
  );
};
