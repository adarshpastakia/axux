/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, forwardRef } from "react";
import { ChildProp, ElementProps, TooltipProps as TP } from "../types";
import { AxPopover } from "./Popover";

export interface TooltipProps extends TP, ChildProp, ElementProps {
  /**
   * force open
   */
  isOpen?: boolean;
  /**
   * disable
   */
  isDisabled?: boolean;
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
      // @ts-ignore
      popoverRef,
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
        isDisabled={isDisabled || parentOpen}
        // @ts-ignore
        popoverRef={ref}
        data-color={color}
        classPrefix="tooltip"
        trigger="hover"
      >
        {children}
        {content}
      </AxPopover>
    );
  }
);
