/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { debounce } from "@axux/utilities";
import { useCallback, useEffect } from "react";

export const useDebounce = (
  callback?: (...rest: AnyObject) => AnyObject,
  timeout = 250
) => {
  const cb = useCallback(debounce(callback ?? (() => undefined), timeout), [
    callback,
  ]);
  useEffect(() => {
    return () => {
      cb?.cancel();
    };
  }, [callback]);

  return cb;
};
