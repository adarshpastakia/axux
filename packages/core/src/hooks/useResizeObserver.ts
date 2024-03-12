/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import {
  type RefObject,
  useCallback,
  useEffect,
  useRef,
  useTransition,
} from "react";
import ResizeObserver from "resize-observer-polyfill";
import { type SizeObject } from "../types";

export const useResizeObserver = <T extends HTMLElement = HTMLDivElement>(
  onResize: (size: SizeObject) => void,
): RefObject<T> => {
  const ref = useRef<T>(null);
  const [, startTransition] = useTransition();

  const doResize = useCallback(() => {
    startTransition(() => {
      if (onResize && ref.current != null) {
        const { offsetWidth: width, offsetHeight: height } = ref.current;
        onResize({ width, height });
      }
    });
  }, [onResize]);

  useEffect(() => {
    if (ref.current != null) {
      const ob = new ResizeObserver(doResize);
      ob.observe(ref.current);
      return () => {
        ob.disconnect();
      };
    }
  }, [doResize, ref]);

  return ref;
};
