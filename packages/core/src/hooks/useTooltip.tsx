/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */
/* istanbul ignore file */

import { debounce, isString, isTrue } from "@axux/utilities";
import { type Placement } from "@popperjs/core";
import { useEffect, useRef, useState, useTransition } from "react";
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

export const TooltipWatcher = () => {
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

  const removeTooltip = useRef(() => {
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
  });

  const cbEnter = useRef(
    debounce((e: MouseEvent) => {
      const target: HTMLElement | null = (e.target as HTMLElement)?.closest?.(
        "[data-tooltip]",
      );
      if (
        target &&
        !!target.dataset.tooltip &&
        !isTrue(target.dataset.disabled) &&
        !isTrue(target.dataset.popoverOpen)
      ) {
        setPlacement(target.dataset.tooltipPlacement as AnyObject);
        setContent(target.dataset.tooltip);
        setColor(target.dataset.tooltipColor);
        setReferenceElement(target);
        startTransition(() => {
          setOpen(true);

          if (isTrue(target.dataset.tooltipHide)) {
            refTimer.current = setTimeout(() => removeTooltip.current(), 2000);
          }
        });
      } else {
        removeTooltip.current();
      }
    }, 1000),
  );
  const cbLeave = useRef((e: MouseEvent) => {
    cbEnter.current.cancel();
    removeTooltip.current();
    setOpen(false);
  });

  useEffect(() => {
    document.addEventListener("mouseover", cbEnter.current);
    document.addEventListener("mouseout", cbLeave.current);
    document.addEventListener("mouseleave", cbLeave.current);
    document.addEventListener("mousedown", cbLeave.current);
    return () => {
      document.removeEventListener("mouseover", cbEnter.current);
      document.removeEventListener("mouseout", cbLeave.current);
      document.removeEventListener("mouseleave", cbLeave.current);
      document.removeEventListener("mousedown", cbLeave.current);
    };
  }, []);

  useEffect(() => {
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
          className="ax-popover ax-tooltip"
          style={styles.popper}
          {...attributes.popper}
        >
          <div className={`ax-popover__container`}>
            <pre
              style={{ font: "inherit" }}
              dangerouslySetInnerHTML={{ __html: content ?? "" }}
            />
          </div>
          <div
            ref={setArrowElement as AnyObject}
            className="ax-popover__arrow"
            style={styles.arrow}
            {...attributes.arrow}
          />
        </div>,
      );
    }
  }, [isOpen, content, color, attributes, styles]);

  return null;
};
