/**
 * AxUX React UI Framework with Pure CSS
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
        {showIcon && <div className="rounded-full bg-current h-10 w-10"></div>}
        <div className="flex-1 space-y-3 py-1">
          <div className="h-2 bg-current rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-current rounded col-span-2"></div>
              <div className="h-2 bg-current rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-current rounded"></div>
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
