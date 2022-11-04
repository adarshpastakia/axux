/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Popover } from "@headlessui/react";
import { Placement } from "@popperjs/core";
import {
  Children,
  cloneElement,
  FC,
  forwardRef,
  ForwardRefExoticComponent,
  Fragment,
  useEffect,
  useMemo,
} from "react";
import { createPortal } from "react-dom";
import { usePopover } from "../hooks/usePopover";
import { ChildProp, ChildrenProp, ElementProps, RefProp } from "../types";

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
  // @ts-ignore
  popoverClassName,
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
    sameWidth,
    hideArrow,
  });

  /******************* check for children count *******************/
  if (Children.toArray(children).length !== 2) {
    throw new Error("Two child elements required");
  }

  const [anchorEl, popperEl] = useMemo(
    () => Children.toArray(children) as AnyObject[],
    [children]
  );

  useEffect(() => {
    if (popperElement) {
      const cb = () => forceUpdate?.();
      popperElement.addEventListener("updatePopper", cb);
      return () => {
        popperElement.removeEventListener("updatePopper", cb);
      };
    }
  }, [popperElement]);

  /******************* component *******************/
  return (
    <Popover as={Fragment}>
      {({ open }) => (
        <Fragment>
          <Popover.Button as={Fragment} {...{ ref: setReferenceElement }}>
            {cloneElement(anchorEl as AnyObject, {
              "data-popover-open": open,
            })}
          </Popover.Button>
          {!isDisabled &&
            open &&
            createPortal(
              <Popover.Panel
                {...rest}
                tabIndex={-1}
                className={`popover ${popoverClassName ?? ""}`}
                ref={setPopperElement as AnyObject}
                style={styles.popper}
                {...attributes.popper}
              >
                <div className={`popover__container ${className ?? ""}`}>
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
              </Popover.Panel>,
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
