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
  }) => {
    const [pending, startTransition] = useTransition();
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        onChange &&
          startTransition(() =>
            onChange(e?.target.valueAsNumber ?? ("" as AnyObject))
          );
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
        canClear={allowClear && !isEmpty(value)}
      >
        <input
          ref={inputRef}
          type="number"
          size={0}
          aria-disabled={isDisabled}
          aria-readonly={isReadOnly}
          aria-required={isRequired}
          aria-errormessage={error}
          value={value}
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
