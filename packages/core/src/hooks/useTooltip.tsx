/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { isString, isTrue } from "@axux/utilities";
import { Placement } from "@popperjs/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { createRoot, Root } from "react-dom/client";
import { TooltipType } from "../types";
import { usePopover } from "./usePopover";

export const getTooltipProps = (tooltip?: TooltipType) => {
  if (isString(tooltip)) {
    return { "data-tooltip": tooltip, "data-tooltip-placement": "bottom" };
  }
  if (tooltip) {
    const {
      content,
      placement = "bottom",
      color = "",
      autoHide = false,
    } = tooltip;
    return {
      "data-tooltip": content,
      "data-tooltip-placement": placement,
      "data-tooltip-color": color,
      "data-tooltip-hide": autoHide,
    };
  }
  return {};
};

export const useTooltipWatcher = () => {
  const refEl = useRef<HTMLDivElement>();
  const refTimer = useRef<AnyObject>();
  const refPortal = useRef<Root>();
  const [isOpen, setOpen] = useState(false);
  const [content, setContent] = useState<string>();
  const [placement, setPlacement] = useState<Placement>("bottom");
  const [color, setColor] = useState<string>();

  const {
    attributes,
    setArrowElement,
    setPopperElement,
    setReferenceElement,
    styles,
  } = usePopover({
    placement,
  });

  const removeTooltip = useCallback(() => {
    if (refPortal.current != null) {
      try {
        refPortal.current.unmount();
      } catch (_) {
        //
      }
      clearTimeout(refTimer.current);
      refEl.current?.remove();
      refPortal.current = undefined;
      setPopperElement(undefined);
    }
  }, []);

  const cbEnter = useCallback((e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest(
      "[data-tooltip]"
    ) as HTMLElement;
    if (
      target &&
      !isTrue(target.dataset.disabled) &&
      !isTrue(target.dataset.popoverOpen)
    ) {
      removeTooltip();
      setPlacement(target.dataset.tooltipPlacement as AnyObject);
      setContent(target.dataset.tooltip);
      setColor(target.dataset.tooltipColor);
      setReferenceElement(target);
      setOpen(true);

      if (isTrue(target.dataset.tooltipHide)) {
        refTimer.current = setTimeout(() => removeTooltip(), 2000);
      }
    }
  }, []);
  const cbLeave = useCallback((e: MouseEvent) => {
    removeTooltip();
    setOpen(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mouseover", cbEnter);
    document.addEventListener("mouseout", cbLeave);
    document.addEventListener("mousedown", cbLeave);
    return () => {
      document.removeEventListener("mouseover", cbEnter);
      document.removeEventListener("mouseout", cbLeave);
      document.removeEventListener("mousedown", cbLeave);
    };
  }, []);

  useEffect(() => {
    if (isOpen && !!content) {
      refEl.current = document.createElement("div");
      document.body.appendChild(refEl.current);
      refPortal.current = createRoot(refEl.current);
    }
  }, [isOpen, content]);

  useEffect(() => {
    if (refPortal.current != null) {
      refPortal.current.render(
        <div
          tabIndex={-1}
          data-color={color}
          ref={setPopperElement as AnyObject}
          className="popover tooltip"
          style={styles.popper}
          {...attributes.popper}
        >
          <div className={`popover__container`}>{content}</div>
          <div
            ref={setArrowElement as AnyObject}
            className="popover__arrow"
            style={styles.arrow}
            {...attributes.arrow}
          />
        </div>
      );
    }
  }, [isOpen, content, color, attributes, styles]);

  return () => {
    document.removeEventListener("mouseover", cbEnter);
    document.removeEventListener("mouseout", cbLeave);
  };
};
