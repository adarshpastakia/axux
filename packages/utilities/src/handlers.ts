/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */
/* istanbul ignore file */

import { type KeyboardEvent, type MouseEvent } from "react";
import { debounce } from "./_debounce";

/** ***************** common handler for enter press *******************/
export const handleEnter = (
  callback?: (e: KeyboardEvent) => void,
  {
    stopPropagation = false,
    preventDefault = false,
  }: { stopPropagation?: boolean; preventDefault?: boolean } = {},
) => {
  return (e: KeyboardEvent) => {
    if (
      !e.shiftKey &&
      !e.altKey &&
      !e.metaKey &&
      e.key === "Enter" &&
      callback
    ) {
      if (stopPropagation) e?.stopPropagation();
      debounce(() => callback?.(e), 100)(e);
      if (preventDefault) {
        e.preventDefault();
        return false;
      }
    }
  };
};

/** ***************** common handler for mouse primary click *******************/
export const handleClick = (
  callback?: (e: MouseEvent) => void,
  {
    stopPropagation = false,
    preventDefault = false,
  }: { stopPropagation?: boolean; preventDefault?: boolean } = {},
) => {
  return (e: MouseEvent) => {
    if (stopPropagation) e?.stopPropagation();
    (e?.button ?? 0) === 0 && callback?.(e);
    if (preventDefault) {
      e.preventDefault();
      return false;
    }
  };
};
