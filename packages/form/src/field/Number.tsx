// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, memo } from "react";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldWrapper } from "../internals/FieldWrapper";
import { ControllerProps, FieldStateProps, WrapperProps } from "../types";

/** @internal */
export interface NumberFieldProps extends ControllerProps<number>, WrapperProps, FieldStateProps {
  /**
   * Step value
   */
  step?: number;
  /**
   * Minimum value
   */
  minValue?: number;
  /**
   * Maximum value
   */
  maxValue?: number;
}

/**
 * Number input field
 * @internal
 */
export const AxNumberField: FC<NumberFieldProps> = memo(
  ({
    children,
    step = 1,
    minValue = Number.MIN_SAFE_INTEGER,
    maxValue = Number.MAX_SAFE_INTEGER,
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
        {({ ref, refInput, onChange, value, error, onBlur, onEnter, onClear, canClear }) => {
          const stepChange = (up: boolean) => {
            if (refInput.current) {
              const el = refInput.current;
              up ? el.stepUp() : el.stepDown();
              onChange && onChange(el.valueAsNumber);
            }
          };
          return (
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
                step={step}
                min={minValue}
                max={maxValue}
                type="number"
                formNoValidate
                disabled={isDisabled}
                readOnly={isReadonly}
                placeholder={placeholder}
                value={value}
                onBlur={onBlur}
                onKeyUp={onEnter}
                onChange={(event) => onChange && onChange(event.target.value)}
              />
              <div className="ax-field__handle">
                <div className="ax-field__step--up" onClick={() => stepChange(true)}>
                  ▾
                </div>
                <div className="ax-field__step--down" onClick={() => stepChange(false)}>
                  ▾
                </div>
              </div>
            </AxFieldWrapper>
          );
        }}
      </AxFieldController>
    );
  }
);
