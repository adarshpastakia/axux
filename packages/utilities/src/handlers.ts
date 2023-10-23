/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { type KeyboardEvent, type MouseEvent } from "react";
import { debounce } from "./_debounce";

/** ***************** common handler for enter press *******************/
export const handleEnter = (callback?: AnyObject, preventDefault = false) => {
  return (e: KeyboardEvent) => {
    if (e.key === "Enter" && callback) {
      debounce(() => callback?.(e), 100)();
      if (preventDefault) {
        e.preventDefault();
        return false;
      }
    }
  };
};

/** ***************** common handler for mouse primary click *******************/
export const handleClick = (
  callback?: AnyObject,
  { stopPropagation = false }: { stopPropagation?: boolean } = {}
) => {
  return (e?: MouseEvent) => {
    if (stopPropagation) e?.stopPropagation();
    (e?.button ?? 0) === 0 && callback?.(e);
  };
};
