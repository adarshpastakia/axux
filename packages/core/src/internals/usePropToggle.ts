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
  const [toggleOn, setToggleOn] = useState(is);

  useLayoutEffect(() => {
    setToggleOn(is);
  }, [is]);

  const doToggle = useCallback(() => {
    callback && callback(!toggleOn, key);
    setToggleOn(!toggleOn);
  }, [toggleOn, callback, key]);

  return [toggleOn, doToggle];
};
