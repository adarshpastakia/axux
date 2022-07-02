/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useTransition,
} from "react";

export const useResizeObserver = (
  onResize: (size: { width: number; height: number }) => void
) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pending, startTransition] = useTransition();

  const doResize = useCallback(() => {
    startTransition(() => {
      if (onResize && ref.current) {
        const { offsetWidth: width, offsetHeight: height } = ref.current;
        onResize({ width, height });
      }
    });
  }, [onResize]);

  useEffect(() => {
    if (ref.current) {
      const ob = new ResizeObserver(doResize);
      ob.observe(ref.current);
      return () => {
        ob.disconnect();
      };
    }
  }, [doResize, ref]);

  return ref;
};
