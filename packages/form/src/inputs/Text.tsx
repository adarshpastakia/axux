/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp, ElementProps } from "@axux/core/dist/types";
import { isEmpty } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import { ChangeEvent, FC, memo, useCallback, useTransition } from "react";
import { InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface TextProps extends ElementProps, InputProps, ChildrenProp {
  /**
   * input type
   */
  type?: "text" | "password" | "email" | "url" | "search";
}

export const Text: FC<TextProps> = memo(
  ({
    label,
    labelAppend,
    isRequired,
    value,
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
    ...rest
  }) => {
    const [pending, startTransition] = useTransition();
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        onChange &&
          startTransition(() => onChange(e?.target.value ?? undefined));
      },
      [onChange]
    );
    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
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
