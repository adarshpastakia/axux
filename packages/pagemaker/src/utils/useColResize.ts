/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { MouseEvent as ME, useLayoutEffect, useRef, useState } from "react";
import { usePageContext } from "../components/context";
import { SpanType } from "./types";

export const useColResize = (id: string, colSpan?: SpanType) => {
  const refEl = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState<SpanType>(colSpan ?? 12);
  const { updateConfig } = usePageContext();

  useLayoutEffect(() => {
    setSpan(colSpan ?? 12);
  }, [colSpan]);

  const onResize = (evt: MouseEvent) => {
    const newX = evt.clientX;
    if (refEl.current?.parentElement != null) {
      const box = refEl.current.getBoundingClientRect();
      const minWidth = Math.round(refEl.current.parentElement.offsetWidth / 12);
      let newSpan = Math.floor((newX - (box.left - minWidth)) / minWidth) || 1;
      if (newSpan > 12) newSpan = 12;
      setSpan(newSpan as AnyObject);
    }
  };

  const onResizeEnd = (e: MouseEvent) => {
    if (refEl.current != null) {
      updateConfig(
        id,
        "colSpan",
        parseInt(refEl.current.dataset.span ?? "3", 10)
      );
    }
    e.preventDefault();
    e.stopPropagation();
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  const onResizeStart = (e: ME) => {
    e.preventDefault();
    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", onResizeEnd);
  };

  return { span, ref: refEl, onResizeStart };
};
