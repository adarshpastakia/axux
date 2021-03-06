/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
import {
  ChildrenProp,
  Color,
  ElementProps,
  IconProp,
} from "@axux/core/dist/types";
import { isString } from "@axux/utilities";
import { FC, memo, MouseEvent, useCallback } from "react";

export interface AddonProps extends ElementProps, IconProp, ChildrenProp {
  /**
   * addon color
   */
  color?: Color;
  /**
   * addon alignment within field
   */
  align?: "start" | "end";
  /**
   * show spinner
   */
  showSpinner?: boolean;
}

export const Addon: FC<AddonProps> = memo(
  ({
    icon,
    rtlFlip,
    color,
    align = "start",
    showSpinner,
    children,
    className,
    ...rest
  }) => {
    const focus = useCallback((e: MouseEvent) => {
      (
        e.currentTarget.parentElement?.querySelector(
          ":scope>input,:scope>textarea"
        ) as HTMLElement
      )?.focus();

      (
        e.currentTarget.nextElementSibling?.querySelector(
          "input,textarea"
        ) as HTMLElement
      )?.focus();
    }, []);

    return (
      <div
        onClick={focus}
        data-align={align}
        className={`ax-field__addon ${className ?? ""}`}
        {...rest}
      >
        {showSpinner && <AxAnimation.Spinner className="text-primary" />}
        {!showSpinner && icon && (
          <AxIcon icon={icon} color={color} rtlFlip={rtlFlip} />
        )}
        {!showSpinner && isString(children) ? (
          <span>{children}</span>
        ) : (
          children
        )}
      </div>
    );
  }
);
