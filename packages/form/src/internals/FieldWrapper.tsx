// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon, AxTooltip } from "@axux/core";
import { ElementProps, RefProp } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, forwardRef } from "react";
import { FieldStateProps, WrapperProps } from "../types";
import { AxFieldLabel } from "./FieldLabel";

/** @internal */
export interface FieldWrapperProps extends WrapperProps, FieldStateProps, ElementProps {
  error?: string;
  canClear?: boolean;
  onClear?: () => void;
}

/** @internal */
export const AxFieldWrapper: FC<FieldWrapperProps & RefProp<HTMLDivElement>> = forwardRef<
  HTMLDivElement,
  FieldWrapperProps
>(
  (
    {
      children,
      label,
      hint,
      className,
      required,
      appendLabel,
      span = 1,
      error,
      canClear,
      onClear,
      isReadonly,
      isDisabled,
      isLoading,
      width,
      minWidth,
      maxWidth
    },
    ref
  ) => {
    return (
      <div
        className={`ax-field ${className ?? ""}`}
        data-invalid={!!error}
        data-disabled={isDisabled}
        data-readonly={isReadonly}
        style={{
          width,
          minWidth,
          maxWidth,
          gridColumnEnd: `span ${Math.min(4, Math.max(1, span))}`
        }}
      >
        {label && (
          <AxFieldLabel required={required} appendLabel={appendLabel}>
            {label}
          </AxFieldLabel>
        )}
        <div className="ax-field__wrapper" ref={ref}>
          {children}
          {!isDisabled && !isReadonly && !isLoading && canClear && (
            <div className="ax-field__clear">
              <AxIcon
                color="medium"
                className="ax-hover--dark"
                icon={AppIcons.iconClose}
                onClick={onClear}
                data-clickable="true"
              />
            </div>
          )}
          {error && (
            <AxTooltip color="danger" content={error} placement="bottom">
              <div className="ax-field__error">
                <AxIcon icon="!" color="danger" />
              </div>
            </AxTooltip>
          )}
          {isLoading && (
            <div className="ax-field__clear">
              <AxIcon icon={AppIcons.iconLoader} spin />
            </div>
          )}
        </div>
        {hint && <div className="ax-field__hint">{hint}</div>}
      </div>
    );
  }
);
AxFieldWrapper.displayName = "AxFieldWrapper";
