/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { debounce } from "@axux/utilities";
import { useEffect, useMemo } from "react";

export const useDebounce = (
  callback?: (...rest: AnyObject) => AnyObject,
  deps: AnyObject[] = [],
  timeout = 250,
) => {
  const cb = useMemo(
    () => debounce(callback ?? (() => undefined), timeout),
    [callback, ...deps],
  );
  useEffect(() => {
    return () => {
      cb?.cancel();
    };
  }, [cb]);

  return cb;
};
