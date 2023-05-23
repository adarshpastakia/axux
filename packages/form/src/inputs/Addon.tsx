/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon } from "@axux/core";
import {
  type ChildrenProp,
  type Color,
  type ElementProps,
  type IconProp,
} from "@axux/core/dist/types";
import { isString } from "@axux/utilities";
import { type FC, memo, type MouseEvent, useCallback } from "react";

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

  showWhenEmpty?: boolean;
}

// eslint-disable-next-line react/display-name
export const Addon: FC<AddonProps> = memo(
  ({
    icon,
    rtlFlip,
    color,
    align = "start",
    showWhenEmpty,
    showSpinner,
    children,
    className,
    ...rest
  }: AddonProps) => {
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
        data-align={showWhenEmpty ? "end" : align}
        className={`ax-field__addon ${showWhenEmpty ? "empty-addon" : ""} ${
          className ?? ""
        }`}
        {...rest}
      >
        {showSpinner && (
          <AxAnimation.Spinner className="addon-child text-primary" />
        )}
        {!showSpinner && icon && (
          <AxIcon
            icon={icon}
            color={color}
            rtlFlip={rtlFlip}
            className="addon-child"
          />
        )}
        {!showSpinner && isString(children) ? (
          <span className="addon-child">{children}</span>
        ) : (
          children
        )}
      </div>
    );
  }
);
