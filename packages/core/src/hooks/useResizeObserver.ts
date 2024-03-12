/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useEffect, useRef, useTransition, type RefObject } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { type SizeObject } from "../types";
import { useDebounce } from "./useDebounce";

export const useResizeObserver = <T extends HTMLElement = HTMLDivElement>(
  onResize?: (size: SizeObject) => void,
): RefObject<T> => {
  const ref = useRef<T>(null);
  const [, startTransition] = useTransition();

  const doResize = useDebounce(() => {
    startTransition(() => {
      if (onResize && ref.current != null) {
        const { offsetWidth: width, offsetHeight: height } = ref.current;
        onResize?.({ width, height });
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
