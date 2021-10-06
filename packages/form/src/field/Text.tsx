// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, memo } from "react";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldWrapper } from "../internals/FieldWrapper";
import { ControllerProps, FieldStateProps, WrapperProps } from "../types";

/** @internal */
export interface TextFieldProps extends ControllerProps, WrapperProps, FieldStateProps {
  /**
   * Allow browser auto-complete
   */
  autoComplete?: boolean;
  /**
   * Input type
   */
  type?: "text" | "password" | "url" | "email" | "search";
}

/**
 * Text input field
 * @internal
 */
export const AxTextField: FC<TextFieldProps> = memo(
  ({
    children,
    type,
    placeholder,
    isDisabled,
    isReadonly,
    autoComplete,
    value,
    onClear,
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
        onClear={onClear}
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
            <input
              className="ax-field__input"
              ref={ref}
              name={name}
              size={1}
              type={type}
              formNoValidate
              disabled={isDisabled}
              readOnly={isReadonly}
              placeholder={placeholder}
              autoComplete={autoComplete ? "on" : "off"}
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
