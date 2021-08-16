// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useLayoutEffect, useState } from "react";
import { EmptyCallback } from "../types";

/** @internal */
export const usePropToggle = (
  is: boolean,
  callback?: (is: boolean, key?: string) => void,
  key?: string
): [boolean, EmptyCallback] => {
  const [toggle, setToggle] = useState(is);

  useLayoutEffect(() => {
    setToggle(is);
  }, [is]);

  const doToggle = useCallback(() => {
    callback && callback(!toggle, key);
    setToggle(!toggle);
  }, [toggle, callback]);

  return [toggle, doToggle];
};
