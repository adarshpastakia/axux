// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { RefObject, useCallback, useEffect } from "react";
import { useIsRtl } from "./useIsRtl";

interface Options {
  reverse?: boolean;
  vertical?: boolean;
  onStart?: () => void;
  onEnd?: () => void;
}

/** @internal */
export const useResize = (
  resizeRef: RefObject<HTMLElement>,
  callback: (diff: { x: number; y: number }) => void,
  { reverse = false, vertical = false, onStart, onEnd }: Options
) => {
  const { isRtl } = useIsRtl();

  const onResize = useCallback(
    (evt: MouseEvent) => {
      if (resizeRef.current) {
        const isReverse = ((isRtl ? 1 : 0) ^ (reverse ? 1 : 0)) === 1;
        const box = resizeRef.current.getBoundingClientRect();
        const x = (evt.clientX - (isReverse ? box.left : box.right)) * (isReverse ? -1 : 1);
        const y = evt.clientY - box.bottom;
        callback({ x, y });
      }
    },
    [callback, isRtl, resizeRef, reverse]
  );
  const onResizeEnd = useCallback(() => {
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
    onEnd && onEnd();
  }, [onEnd, onResize]);
  const onResizeStart = useCallback(
    (e: MouseEvent) => {
      e.preventDefault();
      document.body.style.cursor = vertical ? "row-resize" : "col-resize";
      document.addEventListener("mousemove", onResize);
      document.addEventListener("mouseup", onResizeEnd);
      onStart && onStart();
    },
    [onResize, onResizeEnd, onStart]
  );

  useEffect(() => {
    if (resizeRef.current) {
      const ref = resizeRef.current;
      ref.addEventListener("mousedown", onResizeStart);

      return () => ref.removeEventListener("mousedown", onResizeStart);
    }
  }, [onResize, onResizeStart, resizeRef]);

  return null;
};
