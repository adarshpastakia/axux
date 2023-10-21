/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ChildrenProp, type ElementProps } from "@axux/core/dist/types";
import { isEmpty } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  type ChangeEvent,
  type FC,
} from "react";
import { type InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface TextProps extends ElementProps, InputProps, ChildrenProp {
  /**
   * input type
   */
  type?: "text" | "password" | "email" | "url" | "search";
}

// eslint-disable-next-line react/display-name
export const Text: FC<TextProps> = memo(
  ({
    label,
    labelAppend,
    isRequired,
    value: _value,
    placeholder,
    onChange,
    inputRef,
    isInvalid,
    className,
    info,
    error,
    width,
    isPlain,
    isDisabled,
    isReadOnly,
    allowClear,
    children,
    onEnterPressed,
    inline,
    labelWidth,
    ...rest
  }: TextProps) => {
    const [actualValue, setActualValue] = useState("");
    const value = useDeferredValue(actualValue);
    useEffect(() => {
      setActualValue(_value ?? "");
    }, [_value]);

    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        setActualValue(e?.target.value ?? "");
        onChange?.(e?.target.value ?? "");
      },
      [onChange]
    );
    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
        inline={inline}
        labelWidth={labelWidth}
        isPlain={isPlain}
        className={className}
        labelAppend={labelAppend}
        isInvalid={isInvalid}
        isRequired={isRequired}
        disabled={isDisabled}
        onClear={handleChange}
        canClear={allowClear && !isEmpty(value)}
      >
        <input
          ref={inputRef}
          aria-label={label}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          aria-required={isRequired}
          aria-errormessage={error}
          value={value}
          size={1}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-invalid={isInvalid}
          className="ax-field__input"
          onChange={handleChange}
          autoComplete="off"
          onKeyDown={handleEnter(onEnterPressed)}
          {...rest}
        />
        {children}
      </FieldWrapper>
    );
  }
);
