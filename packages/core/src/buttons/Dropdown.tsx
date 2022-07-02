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
import { AxButton, ButtonProps } from "./Button";

export interface DropdownProps extends Omit<ButtonProps, "onClick"> {
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
  placement,
  onClick,
  label,
  ...rest
}) => {
  return (
    <Menu>
      <Menu.Button as={Fragment}>
        <AxButton {...rest}>{label}</AxButton>
      </Menu.Button>
      <Menu.Items className="absolute flex flex-col">{children}</Menu.Items>
    </Menu>
  );
};
