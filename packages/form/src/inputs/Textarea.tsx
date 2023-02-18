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
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface TextareaProps extends ElementProps, InputProps, ChildrenProp {
  /**
   * textarea rows
   */
  rows?: number;
}

// eslint-disable-next-line react/display-name
export const Textarea: FC<TextareaProps> = memo(
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
    rows = 5,
    info,
    error,
    width,
    isPlain,
    isDisabled,
    isReadOnly,
    allowClear,
    children,
    inline,
    labelWidth,
    onEnterPressed,
    ...rest
  }: TextareaProps) => {
    const [actualValue, setActualValue] = useState("");
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? "");
    }, [value]);
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLTextAreaElement>) => {
        setActualValue(e?.target.value ?? "");
        onChange != null &&
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
        inline={inline}
        labelWidth={labelWidth}
        className={className}
        disabled={isDisabled}
        labelAppend={labelAppend}
        isInvalid={isInvalid}
        isRequired={isRequired}
        onClear={handleChange}
        canClear={allowClear && !isEmpty(actualValue)}
      >
        <textarea
          ref={inputRef as any}
          aria-label={label}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          aria-required={isRequired}
          aria-errormessage={error}
          value={actualValue}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          data-invalid={isInvalid}
          className="ax-field__input"
          onChange={handleChange}
          autoComplete="off"
          rows={rows}
          onKeyDown={handleEnter(onEnterPressed)}
          {...rest}
        />
        {children}
      </FieldWrapper>
    );
  }
);
