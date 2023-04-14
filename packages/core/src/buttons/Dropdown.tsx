/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Menu } from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import { type FC, Fragment, type MouseEvent, useCallback, useEffect } from "react";
import { usePopover } from "../hooks/usePopover";
import { type MenuChildren } from "../menu/types";
import { type ElementProps } from "../types";
import { AxButton, type ButtonProps } from "./Button";

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
  onClick?: (key: string) => void;
}

export const DropdownButton: FC<DropdownProps> = ({
  children,
  placement = "bottom-start",
  dropdownClassName,
  onClick,
  label,
  isDisabled,
  showCaret = true,
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
          {!isDisabled && open && (
            <Fragment>
              <div className="fixed inset-0" />
              <Menu.Items
                onMouseUp={handleMenuClick}
                className={`popover ax-button__dropdown ${
                  dropdownClassName ?? ""
                }`}
                ref={setPopperElement as AnyObject}
                style={styles.popper}
                {...attributes.popper}
              >
                <div className="popover__container">{children}</div>
              </Menu.Items>
            </Fragment>
          )}
        </Fragment>
      )}
    </Menu>
  );
};
