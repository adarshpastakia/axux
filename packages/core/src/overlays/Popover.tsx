// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Placement } from "@popperjs/core";
import { FC, forwardRef, PropsWithChildren } from "react";
import { AxPopper } from "../internals/Popper";
import { ElementProps, EmptyCallback, RefProp } from "../types";

/** @internal */
export interface PopoverProps extends ElementProps {
  /**
   * Popover open state
   */
  isOpen?: boolean;

  isDisabled?: boolean;
  /**
   * Set minWidth to anchor width
   */
  resize?: boolean;
  /**
   * Force rendering of popover
   */
  forceRender?: boolean;
  /**
   * Popover placement
   */
  placement?: Placement;
  /**
   * Add popover to react portal
   */
  usePortal?: boolean;
  /**
   * Show arrow
   */
  showArrow?: boolean;
  /**
   * Close popover when clicked
   */
  closeOnClick?: boolean;
  preventClose?: boolean;
  /**
   * Event handler when opened
   */
  onOpen?: EmptyCallback;
  /**
   * Event handler when closed
   */
  onClose?: EmptyCallback;

  autoTrigger?: boolean;
}

interface ExtendedFC<T> extends FC<T> {
  PreventClose: FC;
  ForceClose: FC;
}

/**
 * Dropdown
 * @internal
 */
export const AxPopover: ExtendedFC<PopoverProps & RefProp> = forwardRef<HTMLElement, PopoverProps>(
  (
    {
      closeOnClick = false,
      resize = true,
      forceRender = false,
      placement = "bottom-start",
      isOpen,
      preventClose = false,
      isDisabled = false,
      usePortal = false,
      showArrow = false,
      autoTrigger,
      onClose,
      onOpen,
      className,
      children
    },
    ref
  ) => {
    return (
      <AxPopper
        trigger="click"
        resize={resize}
        updateAnchor
        autoTrigger={autoTrigger}
        forceRender={forceRender}
        placement={placement}
        closeOnClick={closeOnClick}
        usePortal={usePortal}
        showArrow={showArrow}
        preventClose={preventClose}
        className={`ax-popover ${className ?? ""}`}
        inheritRef={ref}
        isOpen={isOpen}
        isDisabled={isDisabled}
        onClose={onClose}
        onOpen={onOpen}
      >
        {children}
      </AxPopper>
    );
  }
) as AnyObject;
AxPopover.ForceClose = ({ children }: PropsWithChildren<unknown>) => (
  <div className="ax-force-close" style={{ display: "contents" }}>
    {children}
  </div>
);
AxPopover.PreventClose = ({ children }: PropsWithChildren<unknown>) => (
  <div className="ax-prevent-close" style={{ display: "contents" }}>
    {children}
  </div>
);

AxPopover.displayName = "AxPopover";
AxPopover.ForceClose.displayName = "AxPopover.ForceClose";
AxPopover.PreventClose.displayName = "AxPopover.PreventClose";
