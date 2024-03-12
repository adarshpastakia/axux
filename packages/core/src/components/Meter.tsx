/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Format, isColor } from "@axux/utilities";
import { type FC, useMemo } from "react";
import { type Color, type ElementProps } from "../types";

export interface MeterProps extends ElementProps {
  /**
   * meter value (0-100)
   */
  value: number;
  /**
   * size
   */
  size?: "xs" | "sm";
  /**
   * color
   */
  color?: Color;
  /**
   * hide value label
   */
  hideLabel?: boolean;
}

export const AxMeter: FC<MeterProps> = ({
  color,
  value,
  size,
  hideLabel,
  className,
  ...rest
}) => {
  /** ***************** calculate active meter dots *******************/
  const activeCount = useMemo(() => {
    return value / 16.67;
  }, [value]);
  /** ***************** build style map *******************/
  const styles = useMemo(() => {
    const s: KeyValue = {};
    if (color && isColor(color)) {
      s.color = color;
    }
    return s;
  }, [color]);

  return (
    <div
      {...rest}
      className={`ax-meter ${className ?? ""}`}
      data-color={color}
      data-size={size}
      style={styles}
    >
      {[0, 1, 2, 3, 4, 5].map((step) => (
        <div
          key={step}
          className="ax-meter--bar"
          data-active={activeCount >= step}
          style={{ width: `${Math.min((activeCount - step) * 100, 100)}%` }}
        />
      ))}
      {!hideLabel && (
        <label className="ax-meter--label">{Format.percent(value / 100)}</label>
      )}
    </div>
  );
};
