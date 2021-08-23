// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useMemo, VFC } from "react";
import { Color } from "../types";

/** @internal */
export interface MeterProps {
  /**
   * Meter value
   */
  value: number;
  /**
   * Button theme
   */
  color?: Color | "rainbow";
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
 * @constructor
 */
export const AxMeter: VFC<MeterProps> = ({ value = 0, showLabel, color }) => {
  const percent = useMemo(() => {
    return `${(value > 100 ? 100 : value).toFixed(2)}%`;
  }, [value]);
  return (
    <div
      className="ax-meter"
      data-theme={color}
      style={{
        paddingInlineStart: percent
      }}
    >
      {showLabel && <label>{percent}</label>}
    </div>
  );
};
