/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Format } from "@axux/utilities";
import { FC, useMemo } from "react";
import { Color } from "../types";

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
  /******************* make sure value is between 0 and 100 *******************/
  const actualValue = useMemo(() => Math.min(Math.max(value, 0), 100), [value]);

  /******************* calculate stroke offset by actual value *******************/
  const strokeDashoffset = useMemo(() => {
    const circumfrence = Math.PI * 2 * 44;
    return circumfrence * (1 - actualValue / 100);
  }, [actualValue]);

  /******************* component *******************/
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
export const ProgressBar: FC<ProgressProps> = ({
  value = 0,
  size = "sm",
  color = "primary",
  animate,
}) => {
  /******************* make sure value is between 0 and 100 *******************/
  const actualValue = useMemo(() => Math.min(Math.max(value, 0), 100), [value]);

  /******************* component *******************/
  return (
    <div
      className="progress-bar"
      data-size={size}
      data-color={color}
      data-animate={animate}
      style={{ "--progress": actualValue } as AnyObject}
      aria-hidden="true"
    >
      <span>{Format.percent(actualValue / 100)}</span>
    </div>
  );
};

export const AxProgress = {
  Circle: ProgressCircle,
  Bar: ProgressBar,
};
AxProgress.Bar.displayName = "AxProgress.Bar";
AxProgress.Circle.displayName = "AxProgress.Circle";
