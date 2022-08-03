/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Menu } from "@headlessui/react";
import { Placement } from "@popperjs/core";
import { FC, Fragment, MouseEvent, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePopover } from "../hooks/usePopover";
import { MenuChildren } from "../menu/types";
import { ElementProps } from "../types";
import { AxButton, ButtonProps } from "./Button";

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
      <Menu.Button as={Fragment} {...{ ref: setReferenceElement }}>
        {({ open }) => (
          <AxButton {...rest} data-popover-open={open} showCaret={showCaret}>
            {label}
          </AxButton>
        )}
      </Menu.Button>
      {createPortal(
        <Menu.Items
          onClick={handleMenuClick}
          className={`popover ax-button__dropdown ${dropdownClassName ?? ""}`}
          ref={setPopperElement as AnyObject}
          style={styles.popper}
          {...attributes.popper}
        >
          <div className="popover__container">{children}</div>
        </Menu.Items>,
        document.body
      )}
    </Menu>
  );
};
