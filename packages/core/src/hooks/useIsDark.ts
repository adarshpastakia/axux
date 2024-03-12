/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useCallback, useLayoutEffect, useState } from "react";

export const useIsDark = () => {
  const [isDark, setDark] = useState(false);
  const checkTheme = useCallback(() => {
    const [r, g, b]: [number, number, number] = getComputedStyle(
      document.documentElement,
    ).backgroundColor.match(/\d?\d?\d/g) as AnyObject;
    setDark(r < 100 && g < 100 && b < 100);
  }, []);
  useLayoutEffect(() => {
    if (MutationObserver) {
      const ob = new MutationObserver(checkTheme);
      ob.observe(document.documentElement, { attributes: true });
      checkTheme();
      return () => {
        ob.disconnect();
      };
    }
  }, []);
  return isDark;
};
