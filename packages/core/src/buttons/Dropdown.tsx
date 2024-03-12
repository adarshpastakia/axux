/**
 * AxUX React UI Framework with Tailwind CSS
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
  useMemo,
  type FC,
  type MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { useGlobals } from "../context/Global";
import { usePopover } from "../hooks/usePopover";
import { type MenuChildren } from "../menu/types";
import { type CallbackReturn, type ElementProps } from "../types";
import { AxButton, type ButtonProps } from "./Button";

export interface DropdownProps extends ButtonProps {
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

/**
 * Dropdown button to display menu as dropdown
 *
 * @prop label
 * @prop placement
 * @prop usePortal
 * @prop dropdownClassName
 * @prop onClick(@param menuId)
 * @prop children <MenuItem>[]
 * @prop see Button
 */
export const DropdownButton: FC<DropdownProps> = ({
  children,
  placement = "bottom-start",
  dropdownClassName,
  onClick,
  label,
  isDisabled,
  usePortal,
  hideCaret = false,
  ...rest
}) => {
  const { portalRoot } = useGlobals();
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
              hideCaret={hideCaret}
              isDisabled={isDisabled}
              data-popover-open={!isDisabled && open}
            >
              {label}
            </AxButton>
          </Menu.Button>
          {!isDisabled &&
            open &&
            portalRoot.current &&
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
                  <div className="ax-popover__container ax-menu">
                    {children}
                  </div>
                </Menu.Items>
              </Fragment>,
              portalRoot.current,
            )}
        </Fragment>
      )}
    </Menu>
  );
};
