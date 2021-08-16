// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { ElementProps } from "@axux/core/dist/types";
import { FC, memo, MouseEvent, useCallback } from "react";

/** @internal */
export interface AddonProps extends ElementProps {
  /**
   * Alignment
   */
  align?: "start" | "end";
}

/**
 * Input container addon
 * @param children
 * @param className
 * @param align
 * @constructor
 * @internal
 */
export const AxAddon: FC<AddonProps> = memo(
  ({ children, className = "", align = "start", ...aria }) => {
    const onClick = useCallback((e: MouseEvent<HTMLDivElement>) => {
      const elNext =
        e.currentTarget.nextElementSibling &&
        (e.currentTarget.nextElementSibling.querySelector(".ax-field__input") as HTMLInputElement);

      if (elNext) {
        setTimeout(() => elNext.focus(), 100);
      } else {
        const elFirst =
          e.currentTarget.parentElement &&
          (e.currentTarget.parentElement.querySelector(".ax-field__input") as HTMLInputElement);
        if (elFirst) {
          setTimeout(() => elFirst.focus(), 100);
        }
      }
    }, []);

    return (
      <div
        className={`ax-field__addon ${className}`}
        data-align={align}
        onClick={onClick}
        {...aria}
      >
        {children}
      </div>
    );
  }
);
