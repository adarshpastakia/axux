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
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FC,
} from "react";
import InputMask, { type Props } from "react-input-mask";
import { type InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface MaskedProps
  extends ElementProps,
    InputProps,
    ChildrenProp,
    Pick<Props, "mask"> {
  uppercase?: boolean;
  maskPlaceholder?: string | null;
}

// eslint-disable-next-line react/display-name
export const Masked: FC<MaskedProps> = memo(
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
    maskPlaceholder,
    inline,
    labelWidth,
    uppercase,
    ...rest
  }: MaskedProps) => {
    const [actualValue, setActualValue] = useState("");
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? "");
    }, [value]);
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        let val = e?.target.value ?? "";
        if (uppercase) val = val.toUpperCase();
        setActualValue(val);
        onChange != null && startTransition(() => onChange(val));
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
        canClear={allowClear && !isEmpty(actualValue)}
      >
        <InputMask
          ref={inputRef}
          aria-label={label}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          aria-required={isRequired}
          aria-errormessage={error}
          value={actualValue}
          size={1}
          maskPlaceholder={maskPlaceholder}
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
