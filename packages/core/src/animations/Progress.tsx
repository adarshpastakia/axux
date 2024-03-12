/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Format } from "@axux/utilities";
import { type FC, useMemo } from "react";
import { type Color } from "../types";

export interface ProgressProps {
  /**
   * progress value (0-100)
   */
  value: number;
  /**
   * size
   */
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * color
   */
  color?: Color;
  /**
   * animate
   */
  animate?: boolean;
}

/**
 * circular progress bar
 */
export const ProgressCircle: FC<ProgressProps> = ({
  value = 0,
  size = "sm",
  color = "primary",
}) => {
  /** ***************** make sure value is between 0 and 100 *******************/
  const actualValue = useMemo(() => Math.min(Math.max(value, 0), 100), [value]);

  /** ***************** calculate stroke offset by actual value *******************/
  const strokeDashoffset = useMemo(() => {
    const circumfrence = Math.PI * 2 * 44;
    return circumfrence * (1 - actualValue / 100);
  }, [actualValue]);

  /** ***************** component *******************/
  return (
    <div
      className="progress-circle"
      data-size={size}
      data-color={color}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 100">
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="#888"
          strokeWidth="12"
          strokeOpacity="0.25"
          fillOpacity="0"
        />
        <circle
          cx="50"
          cy="50"
          r="44"
          stroke="currentColor"
          strokeWidth="12"
          fillOpacity="0"
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "center",
            strokeDasharray: Math.PI * 2 * 44,
            strokeDashoffset,
          }}
        />
      </svg>
      <span>{Format.percent(actualValue / 100)}</span>
    </div>
  );
};

/**
 * progress bar
 */
export const ProgressBar: FC<ProgressProps & { label?: string }> = ({
  value = 0,
  size = "sm",
  color = "primary",
  label,
  animate,
}) => {
  /** ***************** make sure value is between 0 and 100 *******************/
  const actualValue = useMemo(() => Math.min(Math.max(value, 0), 100), [value]);

  const progressVar = useMemo<KeyValue>(
    () => ({
      "--progress": actualValue,
    }),
    [actualValue],
  );

  /** ***************** component *******************/
  return (
    <div
      className="progress-bar"
      data-size={size}
      data-color={color}
      data-animate={animate}
      style={progressVar}
      aria-hidden="true"
    >
      <div>
        {label} {Format.percent(actualValue / 100)}
      </div>
      <div data-label={`${label} ${Format.percent(actualValue / 100)}`} />
    </div>
  );
};

export const AxProgress = {
  /**
   * Circle progress bar
   *
   * @prop value
   * @prop size - "sm" "md" "lg" "xl"
   * @prop color - "primary" "accent" "info" "danger" "success" "warning"
   * @prop animate
   */
  Circle: ProgressCircle,
  /**
   * Progress bar
   *
   * @prop value
   * @prop label
   * @prop size - "sm" "md" "lg" "xl"
   * @prop color - "primary" "accent" "info" "danger" "success" "warning"
   * @prop animate
   */
  Bar: ProgressBar,
};
AxProgress.Bar.displayName = "AxProgress.Bar";
AxProgress.Circle.displayName = "AxProgress.Circle";
