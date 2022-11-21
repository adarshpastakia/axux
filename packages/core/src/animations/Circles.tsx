/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";

export interface CircleProps {
  /**
   * use text color and size to control indicator color and size
   */
  className?: string;
}

/**
 * animated tick
 */
export const Check: FC<CircleProps> = ({ className }) => {
  /** ***************** component *******************/
  return (
    <svg
      className={`check-animation ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
    >
      <circle className="check-animation__circle" cx="26" cy="26" r="25" />
      <path
        className="check-animation__icon"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>
  );
};

/**
 * animated cross
 */
export const Cross: FC<CircleProps> = ({ className }) => {
  /** ***************** component *******************/
  return (
    <svg
      className={`check-animation ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
    >
      <circle className="check-animation__circle" cx="26" cy="26" r="25" />
      <path
        className="check-animation__icon"
        d="M14.1 14.1l23.8 23.8 m0,-23.8 l-23.8,23.8"
      />
    </svg>
  );
};

/**
 * animated info
 */
export const Info: FC<CircleProps> = ({ className }) => {
  /** ***************** component *******************/
  return (
    <svg
      className={`check-animation ${className ?? ""}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
      aria-hidden="true"
    >
      <circle className="check-animation__circle" cx="26" cy="26" r="25" />
      <path
        className="check-animation__icon"
        d="M26 22L26 41M27 22L27 41M25 22L25 41M26 11L26 16M27 11L27 16M25 11L25 16Z"
      />
    </svg>
  );
};
