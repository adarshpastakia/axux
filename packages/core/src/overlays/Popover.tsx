/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Popover } from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import {
  Children,
  Fragment,
  cloneElement,
  forwardRef,
  useEffect,
  useMemo,
  type FC,
  type ForwardRefExoticComponent,
} from "react";
import { createPortal } from "react-dom";
import { useGlobals } from "../context/Global";
import { usePopover } from "../hooks/usePopover";
import {
  type ChildProp,
  type ChildrenProp,
  type ElementProps,
  type RefProp,
} from "../types";

export interface PopoverProps extends ChildrenProp, ElementProps {
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
   * show arrow
   */
  showArrow?: boolean;

  popoverClassName?: HTMLElement["className"];
}

/**
 * popover control
 */
export const AxPopover: FC<PopoverProps> & {
  Dismiss: ForwardRefExoticComponent<ChildProp & RefProp>;
} = ({
  children,
  className,
  showArrow = false,
  sameWidth = false,
  isDisabled = false,
  placement = "bottom",
  popoverClassName,
  ...rest
}: PopoverProps) => {
  const { portalRoot } = useGlobals();
  const {
    attributes,
    forceUpdate,
    popperElement,
    setArrowElement,
    setPopperElement,
    setReferenceElement,
    styles,
  } = usePopover({
    placement,
    sameWidth,
    showArrow,
  });

  /** ***************** check for children count *******************/
  if (Children.toArray(children).length !== 2) {
    throw new Error("Two child elements required");
  }

  const [anchorEl, popperEl] = useMemo(
    () => Children.toArray(children) as AnyObject[],
    [children],
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

  /** ***************** component *******************/
  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <Fragment>
          <Popover.Button as={Fragment} {...{ ref: setReferenceElement }}>
            {cloneElement(anchorEl, {
              "data-popover-open": open,
            })}
          </Popover.Button>
          {!isDisabled &&
            portalRoot.current &&
            createPortal(
              <Fragment>
                {open && (
                  <Popover.Overlay
                    className="ax-popover__mask"
                    onClick={(e) => e.stopPropagation()}
                  />
                )}
                <Popover.Panel
                  {...rest}
                  className={`ax-popover ${popoverClassName ?? ""}`}
                  ref={setPopperElement as AnyObject}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <div
                    role="none"
                    className={`ax-popover__container ${className ?? ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {open && popperEl}
                  </div>
                  {showArrow && (
                    <div
                      ref={setArrowElement as AnyObject}
                      className="ax-popover__arrow"
                      style={styles.arrow}
                      {...attributes.arrow}
                    />
                  )}
                </Popover.Panel>
              </Fragment>,
              portalRoot.current,
            )}
        </Fragment>
      )}
    </Popover>
  );
};
AxPopover.Dismiss = forwardRef<HTMLElement, AnyObject>((props, ref) => (
  <Popover.Button {...props} ref={ref} as={Fragment} />
));

AxPopover.displayName = "AxPopover";
AxPopover.Dismiss.displayName = "AxPopover.Dismiss";
