/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildProp, ElementProps } from "@axux/core/dist/types";
import { FC, memo, MouseEvent, ReactNode, useCallback } from "react";

export interface ContainerProps extends ElementProps, ChildProp {
  /**
   * field label
   */
  label?: string;
  /**
   * info text
   */
  info?: string;
  /**
   * container width
   */
  width?: string | number;
  /**
   * container min width
   */
  minWidth?: string | number;
  /**
   * container max width
   */
  maxWidth?: string | number;
  /**
   * field required
   */
  isRequired?: boolean;
  /**
   * vertical align inputs
   */
  isVertical?: boolean;
  /**
   * label extra
   */
  labelAppend?: ReactNode;
}

// eslint-disable-next-line react/display-name
export const Container: FC<ContainerProps> = memo(
  ({
    children,
    label,
    info,
    width,
    minWidth,
    maxWidth,
    isVertical,
    isRequired,
    labelAppend,
    className,
    ...rest
  }: ContainerProps) => {
    const onClick = useCallback((e: MouseEvent<HTMLLabelElement>) => {
      (
        e.currentTarget.parentElement?.parentElement?.querySelector(
          ".ax-field__input"
        ) as HTMLInputElement
      )?.focus();
    }, []);
    return (
      <div
        {...rest}
        className={`ax-field__container ${className ?? ""}`}
        style={{ width, minWidth, maxWidth }}
      >
        {label && (
          <div className="ax-field__label">
            <label data-required={isRequired} onClick={onClick}>
              {label}
            </label>
            <div className="leading-[1]">{labelAppend}</div>
          </div>
        )}
        <div className="ax-field__container--row" data-vertical={isVertical}>
          {children}
        </div>
        {info && <small className="text-muted px-2">{info}</small>}
      </div>
    );
  }
);
