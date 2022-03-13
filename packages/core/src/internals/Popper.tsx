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
  trigger?: "hover" | "click" | "contextmenu";
  placement?: Placement;
  isOpen?: boolean;
  isDisabled?: boolean;
  resize?: boolean;
  className?: string;
  forceRender?: boolean;
  closeOnClick?: boolean;
  preventClose?: boolean;
  triggerSelector?: string;
  showArrow?: boolean;
  usePortal?: boolean;
  updateAnchor?: boolean;
  autoTrigger?: boolean;
  inheritRef?: Ref<HTMLElement>;
  onOpen?: EmptyCallback;
  onClose?: EmptyCallback;
}

export const AxPopper: FC<Props & KeyValue> = ({
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
  usePortal = false,
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
        enabled: trigger !== "hover"
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

  const anchorEl = useMemo(() => {
    if (triggerEl) {
      let triggerButton: HTMLElement =
        (triggerSelector ? triggerEl.querySelector(triggerSelector) : undefined) || triggerEl;

      if (triggerEl.classList.contains("ax-button") && trigger !== "hover") {
        triggerButton =
          triggerEl.querySelector(".ax-button__split") ||
          triggerEl.querySelector(".ax-button__inner") ||
          triggerButton;
      }
      if (triggerEl.classList.contains("ax-button__inner")) {
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
    if (trigger !== "hover") {
      open && forceUpdate && forceUpdate();
    }
    anchorEl &&
      anchorEl.dispatchEvent(new Event(open ? "innershow" : "innerhide", { bubbles: true }));
  }, [open, forceUpdate, anchorEl, trigger]);

  useLayoutEffect(() => {
    if (anchorEl) {
      popperEl && popperEl.addEventListener("updatePopper", () => forceUpdate && forceUpdate());

      if (trigger !== "hover") {
        const handler = (e: MouseEvent) => {
          if (e.button === (trigger === "click" ? 0 : 2)) {
            setOpen(!open);
            open && onClose && onClose();
            !open && onOpen && onOpen();
            return trigger === "click";
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

        return () => {
          trigger && anchorEl.removeEventListener(trigger, handler);
          document.removeEventListener("mouseup", forceClose);
        };
      }
      if (trigger === "hover") {
        const handlerOpen = () => isOpen === undefined && setOpen(true);
        const handlerClose = () => isOpen === undefined && setOpen(false);
        const handlerShow = () => {
          setInnerOpen(true);
          setOpen(false);
        };
        const handlerHide = () => setInnerOpen(false);

        anchorEl.addEventListener("mouseover", handlerOpen);
        anchorEl.addEventListener("mouseout", handlerClose);
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
    popperEl,
    closeOnClick,
    preventClose,
    onOpen,
    onClose,
    forceUpdate,
    anchorEl,
    open,
    isOpen,
    autoTrigger
  ]);

  const triggerProps = useMemo(() => {
    if (updateAnchor && anchorEl) {
      anchorEl.dataset.active = `${open}`;
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
        className={`ax-popper ${className ?? ""}`}
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
