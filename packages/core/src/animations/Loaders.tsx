/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC } from "react";
import { type ElementProps } from "../types";

export interface LoaderProps extends ElementProps {
  //
}

/**
 * bar chart loader
 */
export const Bars: FC<LoaderProps> = ({ className }) => {
  return (
    <ul className={`bar-animation ${className ?? ""}`} aria-hidden="true">
      <li />
      <li />
      <li />
      <li />
    </ul>
  );
};

/**
 * spinner loader
 */
export const Spinner: FC<LoaderProps> = ({ className }) => {
  return (
    <div
      className={`spinner-animation ${className ?? ""}`}
      aria-hidden="true"
    />
  );
};

/**
 * card loading
 */
export const Card: FC<
  LoaderProps & {
    /** show icon placeholder */
    showIcon?: boolean;
  }
> = ({ className = "", showIcon = false }) => {
  return (
    <div className="card-animation">
      <div className={`animate-pulse flex space-x-4 ${className}`}>
        {showIcon && <figure className="rounded-full" />}
        <div className="flex-1 space-y-3 py-1">
          <span />
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <span className="col-span-2" />
              <span className="col-span-1" />
            </div>
            <span />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * @internal
 * panel loading indicator
 */
export const Indicator: FC = () => {
  return (
    <div className="loading-indicator" aria-hidden="true">
      <div />
    </div>
  );
};
