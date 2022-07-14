/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, forwardRef, RefObject } from "react";
import { ChildProp, ElementProps, TooltipProps as TP } from "../types";
import { AxPopover, PopoverProps } from "./Popover";

export interface TooltipProps extends TP, ChildProp, ElementProps {
  /**
   * force open
   */
  isOpen?: boolean;
  /**
   * disable
   */
  isDisabled?: boolean;
  /**
   * inner element ref
   */
  innerRef?: PopoverProps["innerRef"];
}

/**
 * simple tooltips
 */
export const AxTooltip: FC<TooltipProps> = forwardRef<
  HTMLDivElement,
  TooltipProps
>(
  (
    {
      children,
      content,
      color,
      isDisabled,
      innerRef,
      // @ts-ignore
      "data-popover-open": parentOpen,
      ...rest
    },
    ref
  ) => {
    /******************* component *******************/
    return (
      <AxPopover
        {...rest}
        trigger="hover"
        data-color={color}
        isDisabled={isDisabled || parentOpen}
        innerRef={innerRef}
        // @ts-ignore
        popoverClassName="tooltip"
      >
        {children}
        {content}
      </AxPopover>
    );
  }
);
