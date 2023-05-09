/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Popover } from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import {
  Children,
  cloneElement,
  type FC,
  forwardRef,
  type ForwardRefExoticComponent,
  Fragment,
  useEffect,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
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
   * hide arrow
   */
  hideArrow?: boolean;

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
  hideArrow = false,
  sameWidth = false,
  isDisabled = false,
  placement = "bottom",
  popoverClassName,
  ...rest
}: PopoverProps) => {
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
    hideArrow,
  });

  /** ***************** check for children count *******************/
  if (Children.toArray(children).length !== 2) {
    throw new Error("Two child elements required");
  }

  const [anchorEl, popperEl] = useMemo(
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
            createPortal(
              <Fragment>
                {open && <div className="fixed inset-0" />}
                <Popover.Panel
                  {...rest}
                  className={`popover ${popoverClassName ?? ""}`}
                  ref={setPopperElement as AnyObject}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <div
                    className={`popover__container ${className ?? ""}`}
                    onClick={(e) => e.stopPropagation()}
                  >
                    {open && popperEl}
                  </div>
                  {!hideArrow && (
                    <div
                      ref={setArrowElement as AnyObject}
                      className="popover__arrow"
                      style={styles.arrow}
                      {...attributes.arrow}
                    />
                  )}
                </Popover.Panel>
              </Fragment>,
              document.body
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
