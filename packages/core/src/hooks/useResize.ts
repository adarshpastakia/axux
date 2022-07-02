/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { RefObject, useCallback, useEffect } from "react";
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
  callback: (diff: { x: number; y: number }) => void,
  { isReverse = false, isVertical = false, onStart, onEnd }: Options
) => {
  const isRtl = useIsRtl();

  const onResize = useCallback(
    (evt: MouseEvent) => {
      if (resizeRef.current) {
        /******************* check if reverse enabled of RTL *******************/
        const reversed = ((isRtl ? 1 : 0) ^ (isReverse ? 1 : 0)) === 1;
        const box = resizeRef.current.getBoundingClientRect();
        const x =
          (evt.clientX - (reversed ? box.left : box.right)) *
          (reversed ? -1 : 1);
        const y = evt.clientY - box.bottom;
        callback({ x, y });
      }
    },
    [callback, isRtl, isReverse, resizeRef]
  );

  /******************* dettach handlers on mouseup *******************/
  const onResizeEnd = useCallback(() => {
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
    onEnd && onEnd();
  }, [onEnd, onResize]);

  /******************* attach handlers on mousedown *******************/
  const onResizeStart = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      document.body.style.cursor = isVertical ? "row-resize" : "col-resize";
      document.addEventListener("mousemove", onResize);
      document.addEventListener("mouseup", onResizeEnd);
      onStart && onStart();
    },
    [onResize, onResizeEnd, onStart]
  );

  /******************* attach event handler *******************/
  useEffect(() => {
    if (resizeRef.current) {
      const ref = resizeRef.current;
      ref.addEventListener("mousedown", onResizeStart);

      return () => ref.removeEventListener("mousedown", onResizeStart);
    }
  }, [onResize, onResizeStart, resizeRef]);

  return null;
};
