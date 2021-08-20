// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useEffect, useRef } from "react";

export const useAxResizeObserver = (
  onResize: (size: { width: number; height: number }) => void
) => {
  const ref = useRef<HTMLDivElement>(null);
  const resizeTimer = useRef<AnyObject>();

  const doResize = useCallback(() => {
    if (resizeTimer.current) {
      clearTimeout(resizeTimer.current);
    }
    if (onResize && ref.current) {
      const { offsetWidth: width, offsetHeight: height } = ref.current;
      resizeTimer.current = setTimeout(() => onResize({ width, height }), 100);
    }
  }, [onResize]);

  useEffect(() => {
    const timer = resizeTimer.current;
    if (ref.current) {
      const ob = new ResizeObserver(doResize);
      ob.observe(ref.current);
      return () => {
        if (timer) {
          clearTimeout(timer);
        }
        ob.disconnect();
      };
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [doResize, ref]);

  return ref;
};
