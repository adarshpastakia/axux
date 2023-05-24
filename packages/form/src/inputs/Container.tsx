/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ChildProp, type ElementProps } from "@axux/core/dist/types";
import {
  Fragment,
  memo,
  useCallback,
  type FC,
  type MouseEvent,
  type ReactNode,
} from "react";

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
  /**
   * inline label and input
   */
  inline?: boolean;
  /**
   * label width for inline
   */
  labelWidth?: string;
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
    inline,
    labelWidth,
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
        data-plain={true}
        {...rest}
        className={`ax-field__container ${className ?? ""}`}
        style={{
          width,
          minWidth,
          maxWidth,
          flex: width ? `0 0 ${width}` : "",
        }}
        data-inline={inline}
      >
        <div className="ax-field__label" style={{ flexBasis: labelWidth }}>
          {label && (
            <Fragment>
              <label data-required={isRequired} onClick={onClick}>
                {label}
              </label>
              <div className="leading-[1]">{labelAppend}</div>
            </Fragment>
          )}
        </div>
        <div className="ax-field__container--row" data-vertical={isVertical}>
          {children}
          {info && (
            <small
              className="text-muted px-2"
              style={{ marginInlineStart: labelWidth }}
            >
              {info}
            </small>
          )}
        </div>
      </div>
    );
  }
);
