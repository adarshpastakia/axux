/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Menu } from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import {
  Fragment,
  useCallback,
  useEffect,
  type FC,
  type MouseEvent,
  useMemo,
} from "react";
import { usePopover } from "../hooks/usePopover";
import { type MenuChildren } from "../menu/types";
import { type CallbackReturn, type ElementProps } from "../types";
import { AxButton, type ButtonProps } from "./Button";
import { createPortal } from "react-dom";

export interface DropdownProps
  extends Omit<ButtonProps, "onClick" | "children"> {
  children: MenuChildren | MenuChildren[];
  /**
   * button label
   */
  label?: string;
  /**
   * popover placement
   */
  placement?: Placement;
  /**
   * popover className
   */
  dropdownClassName?: ElementProps["className"];
  /**
   * click handler
   */
  onClick?: (key: string) => CallbackReturn<AnyObject>;

  /**
   * use portal fro dropdown
   */
  usePortal?: boolean;
}

export const DropdownButton: FC<DropdownProps> = ({
  children,
  placement = "bottom-start",
  dropdownClassName,
  onClick,
  label,
  isDisabled,
  showCaret = true,
  usePortal,
  ...rest
}) => {
  const {
    attributes,
    setPopperElement,
    setReferenceElement,
    popperElement,
    referenceElement,
    styles,
  } = usePopover({
    placement,
    sameWidth: true,
    hideArrow: true,
  });
  const handleMenuClick = useCallback((e: MouseEvent) => {
    const id = (e.target as HTMLElement).dataset.id;
    id && onClick?.(id);
  }, []);
  useEffect(() => {
    popperElement?.addEventListener("closeParentGroup", () => {
      referenceElement?.click();
    });
  }, [popperElement, referenceElement]);

  const wrapper = useMemo(
    () => (usePortal ? createPortal : (d: AnyObject) => d),
    [usePortal],
  );
  return (
    <Menu as={Fragment}>
      {({ open }) => (
        <Fragment>
          <Menu.Button as={Fragment} {...{ ref: setReferenceElement }}>
            <AxButton
              {...rest}
              isDisabled={isDisabled}
              data-popover-open={!isDisabled && open}
              showCaret={showCaret}
            >
              {label}
            </AxButton>
          </Menu.Button>
          {!isDisabled &&
            open &&
            wrapper(
              <Fragment>
                <div className="fixed inset-0" />
                <Menu.Items
                  onMouseUp={handleMenuClick}
                  className={`ax-popover ax-button__dropdown ${
                    dropdownClassName ?? ""
                  }`}
                  ref={setPopperElement as AnyObject}
                  style={styles.popper}
                  {...attributes.popper}
                >
                  <div className="popover__container">{children}</div>
                </Menu.Items>
              </Fragment>,
              document.body,
            )}
        </Fragment>
      )}
    </Menu>
  );
};
