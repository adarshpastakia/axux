/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { KeyboardEvent, MouseEvent } from "react";

/******************* common handler for enter press *******************/
export const handleEnter = (callback?: AnyObject) => {
  return (e: KeyboardEvent) => {
    e.key === "Enter" && callback?.(e);
  };
};

/******************* common handler for mouse primary click *******************/
export const handleClick = (
  callback?: AnyObject,
  { stopPropagation = false }: { stopPropagation?: boolean } = {}
) => {
  return (e?: MouseEvent) => {
    if (stopPropagation) e?.stopPropagation();
    (e?.button ?? 0) === 0 && callback?.(e);
  };
};
