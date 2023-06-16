/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { debounce, isString, isTrue } from "@axux/utilities";
import { type Placement } from "@popperjs/core";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { createRoot, type Root } from "react-dom/client";
import { type TooltipType } from "../types";
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
  const [, startTransition] = useTransition();

  const {
    attributes,
    setArrowElement,
    setPopperElement,
    setReferenceElement,
    styles,
  } = usePopover({
    placement,
  });

  const removeTooltip = useCallback(
    debounce(() => {
      if (refPortal.current) {
        try {
          refPortal.current.unmount();
        } catch (_) {
          //
        }
        clearTimeout(refTimer.current);
        refEl.current?.remove();
        refPortal.current = undefined;
        setPopperElement(undefined);
        setOpen(false);
      }
    }),
    []
  );

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
      startTransition(() => {
        setOpen(true);

        if (isTrue(target.dataset.tooltipHide)) {
          refTimer.current = setTimeout(() => removeTooltip(), 2000);
        }
      });
    }
  }, []);
  const cbLeave = useCallback((e: MouseEvent) => {
    const target = (e.target as HTMLElement).closest(
      "[data-tooltip]"
    ) as HTMLElement;
    if (!target) {
      removeTooltip();
      setOpen(false);
    }
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
    removeTooltip.cancel();
    if (isOpen && !!content && !refPortal.current) {
      refEl.current = document.createElement("div");
      document.body.appendChild(refEl.current);
      refPortal.current = createRoot(refEl.current);
    }
    if (refPortal.current) {
      refPortal.current.render(
        <div
          tabIndex={-1}
          data-color={color}
          ref={setPopperElement as AnyObject}
          className="popover tooltip"
          style={styles.popper}
          {...attributes.popper}
        >
          <div className={`popover__container`}>
            <pre style={{ font: "inherit" }}>{content}</pre>
          </div>
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
