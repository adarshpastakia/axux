// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isVisible, withinDomTree, withinElement } from "@axux/utilities/dist/dom";
import { Placement } from "@popperjs/core";
import {
  Children,
  cloneElement,
  FC,
  ReactElement,
  Ref,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { createPortal } from "react-dom";
import { usePopper } from "react-popper";
import { EmptyCallback } from "../types";

/** @internal */
export interface Props {
  /**
   * Overlay trigger
   */
  trigger?: "hover" | "click" | "contextmenu";
  /**
   * custom element selector for acting as overlay trigger
   */
  triggerSelector?: string;
  /**
   * Overlay placement
   * @values "top" | "bottom" | "right" | "left" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "right-start" | "right-end" | "left-start" | "left-end"
   */
  placement?: Placement;
  /**
   * use isOpen to manually control overlay visibility
   */
  isOpen?: boolean;
  /**
   * disable overlay
   */
  isDisabled?: boolean;
  /**
   * Force overlay minWidth to anchor width
   */
  resize?: boolean;
  /**
   * CSS classname
   */
  className?: string;
  /**
   * Callback handler onOpen
   */
  onOpen?: EmptyCallback;
  /**
   * Callback handler onClose
   */
  onClose?: EmptyCallback;
  /**
   * Pass anchor element ref
   */
  inheritRef?: Ref<HTMLElement>;
  forceRender?: boolean;
  closeOnClick?: boolean;
  preventClose?: boolean;
  showArrow?: boolean;
  usePortal?: boolean;
  updateAnchor?: boolean;
  autoTrigger?: boolean;
}

export const AxPopper: FC<Props> = ({
  children,
  trigger,
  placement = "auto",
  inheritRef,
  resize,
  showArrow = false,
  isOpen,
  isDisabled,
  className,
  onOpen,
  onClose,
  closeOnClick,
  triggerSelector,
  forceRender,
  preventClose = false,
  usePortal: portal = false,
  updateAnchor,
  autoTrigger = true,
  ...props
}) => {
  const refCloseTimer = useRef<AnyObject>();
  const [anchor, dropdown] = Children.toArray(children);

  if (!anchor) {
    throw Error("Expected anchor element");
  }
  if (!dropdown) {
    throw Error("Expected dropdown element");
  }

  const [open, setOpen] = useState(isOpen);
  const [minWidth, setMinWidth] = useState(0);
  const [innerOpen, setInnerOpen] = useState(false);

  const [triggerEl, setTriggerEl] = useState<HTMLDivElement | null>(null);
  const [popperEl, setPopperEl] = useState<HTMLDivElement | null>(null);
  const [arrowElement, setArrowElement] = useState<HTMLDivElement | null>(null);
  const { styles, attributes, forceUpdate } = usePopper(triggerEl, popperEl, {
    placement,
    strategy: "fixed",
    modifiers: [
      {
        name: "flip",
        enabled: true
      },
      {
        name: "preventOverflow",
        enabled: true
      },
      {
        name: "offset",
        options: {
          offset: [0, showArrow ? 10 : 0]
        }
      },
      { name: "arrow", enabled: showArrow, options: { element: arrowElement } }
    ]
  });

  const usePortal = useMemo(
    () => (trigger !== "hover" ? withinDomTree(triggerEl, ".ax-viewport") : portal),
    [portal, trigger, triggerEl]
  );
  const anchorEl = useMemo(() => {
    // Find trigger element to attach mouse events
    if (triggerEl) {
      let triggerButton: HTMLElement =
        (triggerSelector ? triggerEl.querySelector(triggerSelector) : undefined) || triggerEl;

      if (triggerEl.classList.contains("ax-button__inner") && trigger !== "hover") {
        triggerButton =
          triggerEl.parentElement?.querySelector(".ax-button__split") || triggerButton;
      }
      if (triggerEl.classList.contains("ax-tag")) {
        triggerButton = triggerEl.querySelector(".ax-tag__inner") || triggerButton;
      }
      return triggerButton;
    }
  }, [trigger, triggerEl, triggerSelector]);

  useEffect(() => {
    return () => clearTimeout(refCloseTimer.current);
  }, []);

  useLayoutEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  useLayoutEffect(() => {
    if (inheritRef) {
      if (typeof inheritRef === "function") {
        inheritRef(triggerEl);
      }
    }
  }, [triggerEl, inheritRef]);

  useLayoutEffect(() => {
    if (resize && triggerEl) {
      setMinWidth(
        triggerEl.classList.contains("ax-button__inner") && triggerEl.parentElement
          ? triggerEl.parentElement.offsetWidth
          : triggerEl.offsetWidth
      );
    }
  }, [resize, triggerEl]);

  useLayoutEffect(() => {
    if (trigger !== "hover" && open) {
      open && forceUpdate && forceUpdate();
    }
    // fire inner hide/show event for anchors with multiple overlays (tooltip + overlay)
    trigger !== "hover" &&
      triggerEl &&
      triggerEl.dispatchEvent(new Event(open ? "innershow" : "innerhide", { bubbles: true }));
  }, [open, forceUpdate, triggerEl, trigger]);

  useEffect(() => {
    const updater = () => forceUpdate && forceUpdate();
    triggerEl && triggerEl.addEventListener("updatePopper", updater);
    popperEl && popperEl.addEventListener("updatePopper", updater);

    return () => {
      triggerEl && triggerEl.removeEventListener("updatePopper", updater);
      popperEl && popperEl.removeEventListener("updatePopper", updater);
    };
  }, [forceUpdate, triggerEl, popperEl]);

  useLayoutEffect(() => {
    if (anchorEl) {
      if (trigger !== "hover") {
        const handler = (e: MouseEvent) => {
          if (e.button === (trigger === "click" ? 0 : 2)) {
            setOpen(!open);
            open && onClose && onClose();
            !open && onOpen && onOpen();
            return trigger === "click";
          }
        };

        const closePrevious = (e: MouseEvent) => {
          const canClose = !withinElement(e.target as HTMLElement, anchorEl, popperEl);
          if (isVisible(popperEl) && canClose) {
            refCloseTimer.current = setTimeout(() => {
              setOpen(false);
              onClose && onClose();
            }, 10);
          }
        };

        const forceClose = (e: MouseEvent) => {
          const _preventClose = withinDomTree(
            e.target as HTMLElement,
            ".ax-prevent-close",
            ".ax-force-close"
          );
          const forceClose =
            !_preventClose &&
            withinDomTree(e.target as HTMLElement, ".ax-force-close", ".ax-prevent-close");
          let canClose = !_preventClose && closeOnClick;
          if (!closeOnClick) canClose = !withinElement(e.target as HTMLElement, anchorEl, popperEl);
          if (isVisible(popperEl) && (forceClose || canClose)) {
            refCloseTimer.current = setTimeout(() => {
              setOpen(false);
              onClose && onClose();
            }, 10);
          }
        };

        anchorEl.dataset.clickable = "true";
        trigger && autoTrigger && anchorEl.addEventListener(trigger, handler);
        open && !preventClose && document.addEventListener("mouseup", forceClose);
        open && !preventClose && document.addEventListener("mousedown", closePrevious);

        return () => {
          trigger && anchorEl.removeEventListener(trigger, handler);
          document.removeEventListener("mouseup", forceClose);
          document.removeEventListener("mousedown", closePrevious);
        };
      }
      if (trigger === "hover") {
        const handlerOpen = () => setOpen(true);
        const handlerClose = () => setOpen(false);
        const handlerShow = () => {
          setInnerOpen(true);
          setOpen(false);
        };
        const handlerHide = () => setInnerOpen(false);

        autoTrigger && anchorEl.addEventListener("mouseover", handlerOpen);
        autoTrigger && anchorEl.addEventListener("mouseout", handlerClose);
        anchorEl.addEventListener("innershow", handlerShow);
        anchorEl.addEventListener("innerhide", handlerHide);

        return () => {
          anchorEl.removeEventListener("mouseover", handlerOpen);
          anchorEl.removeEventListener("mouseout", handlerClose);
          anchorEl.removeEventListener("innershow", handlerShow);
          anchorEl.removeEventListener("innerhide", handlerHide);
        };
      }
    }
  }, [
    trigger,
    triggerSelector,
    closeOnClick,
    preventClose,
    onOpen,
    onClose,
    open,
    autoTrigger,
    triggerEl,
    popperEl,
    anchorEl
  ]);

  const triggerProps = useMemo(() => {
    if (updateAnchor && anchorEl) {
      anchorEl.dataset.open = `${open}`;
      return {
        "data-popover-anchor": "true",
        "data-popover": "true"
      };
    }
    return {};
  }, [anchorEl, open, updateAnchor]);

  const popperBody = useMemo(
    () => (
      <div
        className={`ax-popper ax-root ${className ?? ""}`}
        data-show={open && !innerOpen && !isDisabled}
        ref={setPopperEl}
        data-show-arrow={showArrow}
        style={{ ...styles.popper, minWidth }}
        {...attributes.popper}
        {...props}
      >
        <div className="ax-popper--body">{dropdown}</div>
        {showArrow && (
          <div className="ax-popper--arrow" ref={setArrowElement} style={styles.arrow} />
        )}
      </div>
    ),
    [
      attributes.popper,
      className,
      dropdown,
      innerOpen,
      isDisabled,
      minWidth,
      open,
      props,
      showArrow,
      styles.arrow,
      styles.popper
    ]
  );

  const renderBody = useMemo(
    () => forceRender || (open && !innerOpen && !isDisabled),
    [forceRender, innerOpen, isDisabled, open]
  );

  return (
    <>
      {cloneElement(anchor as ReactElement, {
        ref: setTriggerEl,
        ...triggerProps
      })}
      {usePortal && renderBody && createPortal(popperBody, document.body)}
      {!usePortal && renderBody && popperBody}
    </>
  );
};
AxPopper.displayName = "AxPopper";
