/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isEmpty } from "@axux/utilities";
import { Popover } from "@headlessui/react";
import { Placement } from "@popperjs/core";
import {
  Children,
  cloneElement,
  FC,
  Fragment,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { usePopover } from "../hooks/usePopover";
import { ChildProp, ChildrenProp, ElementProps } from "../types";

export interface PopoverProps extends ChildrenProp, ElementProps {
  /**
   * popover placement
   */
  placement?: Placement;
  /**
   * force open
   */
  isOpen?: boolean;
  /**
   * disable
   */
  isDisabled?: boolean;
  /**
   * trigger
   */
  trigger?: "click" | "hover";
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
 * popover control
 */
export const AxPopover: FC<PopoverProps> & { Dismiss: FC<ChildProp> } = ({
  children,
  className,
  isOpen,
  hideArrow = false,
  sameWidth = false,
  isDisabled = false,
  trigger = "click",
  placement = "bottom",
  // @ts-ignore
  popoverClassName,
  // @ts-ignore
  popoverRef,
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
  const [open, setOpen] = useState(false);
  const isStatic = useMemo(
    () => trigger === "hover" || !isEmpty(isOpen),
    [trigger]
  );

  /******************* reset open *******************/
  useLayoutEffect(() => {
    setOpen(!isEmpty(isOpen) && isOpen);
  }, [isOpen]);

  /******************* check for children count *******************/
  if (Children.toArray(children).length !== 2) {
    throw new Error("Two child elements required");
  }

  const [anchorEl, popperEl] = useMemo(
    () => Children.toArray(children) as AnyObject[],
    [children]
  );
  useImperativeHandle(popoverRef, () => referenceElement, [referenceElement]);
  // useImperativeHandle(anchorEl.ref, () => referenceElement, [referenceElement]);

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
      {({ open: _open }) => (
        <Fragment>
          <Popover.Button as={Fragment} {...{ ref: setReferenceElement }}>
            {cloneElement(anchorEl as AnyObject, {
              "data-popover-open": trigger !== "hover" && (_open || open),
              onMouseEnter: () => isStatic && isEmpty(isOpen) && setOpen(true),
              onMouseLeave: () => isStatic && isEmpty(isOpen) && setOpen(false),
            })}
          </Popover.Button>
          {!isDisabled && ((isStatic && open) || (!isStatic && _open)) && (
            <Popover.Panel
              {...rest}
              tabIndex={-1}
              static={isStatic}
              className={`popover ${popoverClassName ?? ""}`}
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
            >
              <div className={`popover__container ${className ?? ""}`}>
                {popperEl}
              </div>
              {!hideArrow && (
                <div
                  ref={setArrowElement}
                  className="popover__arrow"
                  style={styles.arrow}
                  {...attributes.arrow}
                />
              )}
            </Popover.Panel>
          )}
        </Fragment>
      )}
    </Popover>
  );
};
AxPopover.Dismiss = (props) => <Popover.Button {...props} as={Fragment} />;

AxPopover.displayName = "AxPopover";
AxPopover.Dismiss.displayName = "AxPopover.Dismiss";
