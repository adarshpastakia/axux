/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Menu } from "@headlessui/react";
import { Placement } from "@popperjs/core";
import { FC, Fragment } from "react";
import { usePopover } from "../hooks/usePopover";
import { MenuChildren } from "../menu/types";
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
   * click handler
   */
  onClick?: (key: string) => void;
}

export const DropdownButton: FC<DropdownProps> = ({
  children,
  placement = "bottom-start",
  onClick,
  label,
  ...rest
}) => {
  const { attributes, setPopperElement, setReferenceElement, styles } =
    usePopover({
      placement,
      sameWidth: true,
      hideArrow: true,
    });
  return (
    <Menu as={Fragment}>
      <Menu.Button as={Fragment} {...{ ref: setReferenceElement }}>
        {({ open }) => (
          <AxButton {...rest} data-popover-open={open}>
            {label}
          </AxButton>
        )}
      </Menu.Button>
      <Menu.Items
        className={`popover ax-button__dropdown`}
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <div className="popover__container">{children}</div>
      </Menu.Items>
    </Menu>
  );
};
