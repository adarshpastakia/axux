/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type RefObject, useCallback, useEffect } from "react";
import { useIsRtl } from "./useIsRtl";

interface Options {
  /**
   * is vertical resize
   */
  isReverse?: boolean;
  /**
   * is vertical resize
   */
  isVertical?: boolean;
  /**
   * callback on drag start
   */
  onStart?: () => void;
  /**
   * callback on drag end
   */
  onEnd?: () => void;
}

export const useResize = (
  resizeRef: RefObject<HTMLElement>,
  onResize: (diff: { x: number; y: number }) => void,
  { isReverse = false, isVertical = false, onStart, onEnd }: Options,
) => {
  const isRtl = useIsRtl();

  const onResizing = useCallback(
    (evt: MouseEvent) => {
      if (resizeRef.current != null) {
        /** ***************** check if reverse enabled of RTL *******************/
        const reversed = ((isRtl ? 1 : 0) ^ (isReverse ? 1 : 0)) === 1;
        const box = resizeRef.current.getBoundingClientRect();
        const x =
          (evt.clientX - (reversed ? box.left : box.right)) *
          (reversed ? -1 : 1);
        const y = evt.clientY - box.bottom;
        onResize({ x, y });
      }
    },
    [onResize, isRtl, isReverse, resizeRef],
  );

  /** ***************** dettach handlers on mouseup *******************/
  const onResizeEnd = useCallback(() => {
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResizing);
    document.removeEventListener("mouseup", onResizeEnd);
    onEnd?.();
  }, [onEnd, onResizing]);

  /** ***************** attach handlers on mousedown *******************/
  const onResizeStart = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      document.body.style.cursor = isVertical ? "row-resize" : "col-resize";
      document.addEventListener("mousemove", onResizing);
      document.addEventListener("mouseup", onResizeEnd);
      onStart?.();
    },
    [onResizing, onResizeEnd, onStart],
  );

  /** ***************** attach event handler *******************/
  useEffect(() => {
    if (resizeRef.current != null) {
      const ref = resizeRef.current;
      ref.addEventListener("mousedown", onResizeStart);

      return () => ref.removeEventListener("mousedown", onResizeStart);
    }
  }, [onResizing, onResizeStart, resizeRef]);

  return null;
};
