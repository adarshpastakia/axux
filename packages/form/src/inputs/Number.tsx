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

export interface NumberProps
  extends ElementProps,
    InputProps<number>,
    ChildrenProp {
  /**
   * min value
   */
  min?: number;
  /**
   * max value
   */
  max?: number;
  /**
   * increment step
   */
  step?: number;
}

// eslint-disable-next-line react/display-name
export const Number: FC<NumberProps> = memo(
  ({
    label,
    labelAppend,
    isRequired,
    className,
    value,
    placeholder,
    onChange,
    inputRef,
    isInvalid,
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
  }: NumberProps) => {
    const [actualValue, setActualValue] = useState<number>("" as AnyObject);
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? ("" as AnyObject));
    }, [value]);
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        let val: AnyObject = e?.target.valueAsNumber;
        if (isNaN(val)) val = undefined;
        setActualValue(val ?? "");
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
        isPlain={isPlain}
        labelAppend={labelAppend}
        className={className}
        disabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        onClear={handleChange}
        canClear={allowClear && !isEmpty(actualValue)}
      >
        <input
          ref={inputRef}
          type="number"
          size={0}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          aria-required={isRequired}
          aria-errormessage={error}
          value={actualValue}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={isReadOnly}
          className="ax-field__input"
          onChange={handleChange}
          onWheel={(e) => e.currentTarget.blur()}
          onKeyDown={handleEnter(onEnterPressed)}
          {...rest}
        />
        {children}
      </FieldWrapper>
    );
  }
);
