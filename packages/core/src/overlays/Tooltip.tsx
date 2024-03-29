/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type Placement } from "@popperjs/core";
import {
  Children,
  cloneElement,
  type FC,
  Fragment,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { usePopover } from "../hooks/usePopover";
import { type ChildProp, type ElementProps, type RefProp, type TooltipProps as TP } from "../types";

export interface TooltipProps
  extends TP,
    ChildProp,
    ElementProps,
    RefProp<HTMLElement> {
  /**
   * force open
   */
  isOpen?: boolean;
  /**
   * popover placement
   */
  placement?: Placement;
  /**
   * disable
   */
  isDisabled?: boolean;
  /**
   * same width as target
   */
  sameWidth?: boolean;
  /**
   * hide arrow
   */
  hideArrow?: boolean;
}

/**
 * simple tooltips
 */
export const AxTooltip: FC<TooltipProps> = ({
  children,
  content,
  className,
  hideArrow = false,
  sameWidth = false,
  isDisabled = false,
  placement = "bottom",
  isOpen = false,
  autoHide = false,
  color,
  // @ts-expect-error ignore
  innerRef,
  // @ts-expect-error ignore
  "data-popover-open": parentOpen,
  ...rest
}) => {
  const {
    attributes,
    forceUpdate,
    popperElement,
    referenceElement,
    setArrowElement,
    setPopperElement,
    setReferenceElement,
    styles,
  } = usePopover({
    placement,
  });
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    setOpen(!!isOpen);
  }, [isOpen]);

  const timer = useRef<AnyObject>();
  useLayoutEffect(() => {
    clearTimeout(timer.current);
    if (open && autoHide) {
      timer.current = setTimeout(() => {
        try {
          setOpen(false);
        } catch (_) {
          /* */
        }
      }, 2000);
    }
  }, [open, autoHide]);

  const [anchorEl] = useMemo(
    () => Children.toArray(children) as AnyObject[],
    [children]
  );

  useEffect(() => {
    if (popperElement != null) {
      const cb = () => forceUpdate?.();
      popperElement.addEventListener("updatePopper", cb);
      return () => {
        popperElement.removeEventListener("updatePopper", cb);
      };
    }
  }, [popperElement]);

  useLayoutEffect(() => {
    open && setTimeout(() => forceUpdate?.(), 0);
  }, [open, content]);

  useImperativeHandle(
    innerRef,
    () => {
      return referenceElement;
    },
    [innerRef]
  );

  /** ***************** component *******************/
  return (
    <Fragment>
      {cloneElement(anchorEl , {
        ref: setReferenceElement,
        onMouseEnter: () => !isDisabled && setOpen(true),
        onMouseLeave: () => !isDisabled && !isOpen && setOpen(false),
      })}
      {!parentOpen &&
        open &&
        createPortal(
          <div
            {...rest}
            tabIndex={-1}
            data-color={color}
            className="popover tooltip"
            ref={setPopperElement as AnyObject}
            style={styles.popper}
            {...attributes.popper}
          >
            <div className={`popover__container ${className ?? ""}`}>
              {content}
            </div>
            {!hideArrow && (
              <div
                ref={setArrowElement as AnyObject}
                className="popover__arrow"
                style={styles.arrow}
                {...attributes.arrow}
              />
            )}
          </div>,
          document.body
        )}
    </Fragment>
  );
};
AxTooltip.displayName = "AxTooltip";
