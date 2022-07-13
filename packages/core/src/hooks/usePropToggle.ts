/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useCallback, useLayoutEffect, useState } from "react";
import { CallbackReturn, EmptyCallback } from "../types";

/**
 * hook to control boolean props
 * @param isOn (is prop true)
 * @param callback (optional callback)
 * @param key (optional key to pass to callback)
 * @returns
 */
export const usePropToggle = (
  isOn = false,
  callback?: (is: boolean, key?: string) => CallbackReturn,
  key?: string
): [boolean, EmptyCallback] => {
  const [toggleOn, setToggleOn] = useState(isOn);

  /******************* update toggle state on change *******************/
  useLayoutEffect(() => {
    setToggleOn(isOn);
  }, [isOn]);

  /******************* toggle handler *******************/
  const doToggle = useCallback(() => {
    if (!callback || callback(!toggleOn, key) !== false) setToggleOn(!toggleOn);
  }, [toggleOn, callback, key]);

  return [toggleOn, doToggle];
};
