/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { type ElementProps, type IconProp } from "@axux/core/dist/types";
import { memo, useCallback, type FC, type FormEvent } from "react";
import { type OptionProps } from "../types";
import { Icons } from "../types/icons";
import { Error } from "./Error";

export interface RadioProps
  extends ElementProps,
    IconProp,
    OptionProps<string | number> {
  /**
   * radio group name
   */
  name?: string;
  iconOff?: string;
}

// eslint-disable-next-line react/display-name
export const Radio: FC<RadioProps> = memo(
  ({
    isInvalid,
    isChecked,
    isDisabled,
    isReadOnly,
    className,
    error,
    inputRef,
    label,
    onChange,
    icon,
    iconOff,
    rtlFlip,
    ...rest
  }: RadioProps) => {
    const handleChange = useCallback(
      (e?: FormEvent<HTMLInputElement>) => {
        e?.currentTarget.checked && onChange?.(e?.currentTarget.value ?? "");
      },
      [onChange]
    );
    return (
      <label
        data-has-icon={!!icon && !iconOff}
        data-disabled={isDisabled}
        data-invalid={!isDisabled && isInvalid}
        className={`ax-field__option ${className ?? ""}`}
      >
        <input
          {...rest}
          ref={inputRef}
          type="radio"
          disabled={isDisabled}
          readOnly={isReadOnly}
          defaultChecked={isChecked}
          className="ax-field__input"
          onChange={handleChange}
        />
        <AxIcon
          data-check="off"
          rtlFlip={rtlFlip}
          className="!rounded-full"
          icon={iconOff ?? icon ?? Icons.iconRadioOff}
        />
        <AxIcon
          data-check="on"
          rtlFlip={rtlFlip}
          className="!rounded-full"
          icon={icon ?? Icons.iconRadioOn}
        />
        {error && <Error error={error} />}
        {label && <span className="ax-field__option--label">{label}</span>}
      </label>
    );
  }
);
