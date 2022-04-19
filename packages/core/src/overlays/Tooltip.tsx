// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty } from "@axux/utilities";
import { Placement } from "@popperjs/core";
import { cloneElement, FC, forwardRef, ReactElement, useMemo } from "react";
import { AxPopper } from "../internals/Popper";
import { AllColors, ElementProps, RefProp } from "../types";

/** @internal */
export interface TooltipProps extends ElementProps, RefProp {
  /**
   * Tooltip content
   */
  content: string | JSX.Element;
  /**
   * Tooltip color
   */
  color?: AllColors;
  /**
   * Tooltip placement
   */
  placement?: Placement;
  /**
   * Add popover to react portal
   */
  usePortal?: boolean;

  isOpen?: boolean;
  isDisabled?: boolean;
  autoTrigger?: boolean;
}

export const AxTooltip: FC<TooltipProps> = forwardRef<HTMLElement, TooltipProps>(
  (
    { children, content, placement = "top", color, className, autoTrigger, isDisabled, ...props },
    ref
  ) => {
    const classes = useMemo(() => {
      if (!color) {
        return "ax-bg--darkest ax-color--empty";
      }
      return `ax-bg--${color} ax-color--contrast`;
    }, [color]);
    return isEmpty(content) || isDisabled ? (
      cloneElement(children as ReactElement, { ref })
    ) : (
      <AxPopper
        trigger="hover"
        inheritRef={ref}
        placement={placement}
        autoTrigger={autoTrigger}
        isDisabled={isEmpty(content) || isDisabled}
        className={`ax-tooltip ${classes} ${className ?? ""}`}
        showArrow
        {...props}
      >
        {children}
        <span>{content}</span>
      </AxPopper>
    );
  }
);
AxTooltip.displayName = "AxTooltip";
