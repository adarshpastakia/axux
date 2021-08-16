// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, memo } from "react";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldWrapper } from "../internals/FieldWrapper";
import { ControllerProps, FieldStateProps, WrapperProps } from "../types";

/** @internal */
export interface TextareaFieldProps extends ControllerProps, WrapperProps, FieldStateProps {
  /**
   * Initial rows
   */
  rows?: number;
}

/**
 * Multi row text input field
 * @internal
 */
export const AxTextareaField: FC<TextareaFieldProps> = memo(
  ({
    children,
    rows = 5,
    placeholder,
    isDisabled,
    isReadonly,
    value,
    onChange,
    onEnterPressed,
    allowClear,
    name,
    error,
    autoFocus,
    ...props
  }) => {
    return (
      <AxFieldController
        value={value}
        onChange={onChange}
        error={error}
        allowClear={allowClear}
        name={name}
        autoFocus={autoFocus}
        onEnterPressed={onEnterPressed}
      >
        {({ ref, onChange, value, error, onBlur, onEnter, onClear, canClear }) => (
          <AxFieldWrapper
            isDisabled={isDisabled}
            isReadonly={isReadonly}
            canClear={canClear}
            onClear={onClear}
            error={error}
            {...props}
          >
            {children}
            <textarea
              className="ax-field__input"
              ref={ref}
              name={name}
              rows={rows}
              disabled={isDisabled}
              readOnly={isReadonly}
              placeholder={placeholder}
              value={value}
              onBlur={onBlur}
              onKeyUp={onEnter}
              onChange={(event) => onChange && onChange(event.target.value)}
            />
          </AxFieldWrapper>
        )}
      </AxFieldController>
    );
  }
);
