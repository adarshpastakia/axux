// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useMemo } from "react";
import { AxPopper } from "../internals/Popper";
import { PopoverProps } from "../overlays/Popover";
import { AxPanelStack } from "../panels/PanelStack";
import { ElementProps } from "../types";
import { AxButton, ButtonProps } from "./Button";

/** @internal */
export interface DropdownProps
  extends Omit<ButtonProps, "value" | "href" | "target" | "download">,
    Omit<PopoverProps, "resize" | "triggerSelector">,
    ElementProps {
  //
}

/**
 * Dropdown option list
 * @param value
 * @param className
 * @param props
 * @constructor
 * @internal
 */
export const AxDropdown: FC<DropdownProps> = ({ className, children, ...props }) => {
  const elProps = useMemo(() => {
    const {
      usePortal,
      isOpen,
      onOpen,
      placement = "bottom-start",
      forceRender,
      closeOnClick,
      onClose,
      ...buttonProps
    } = props;
    return {
      buttonProps,
      popoverProps: { usePortal, isOpen, onOpen, placement, forceRender, closeOnClick, onClose }
    };
  }, [props]);

  return (
    <AxPopper {...elProps.popoverProps} closeOnClick resize trigger="click">
      <AxButton {...elProps.buttonProps} className="ax-dropdown" />
      <AxPanelStack className={className}>{children}</AxPanelStack>
    </AxPopper>
  );
};
