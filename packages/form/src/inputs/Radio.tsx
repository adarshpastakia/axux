/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { type ElementProps, type IconProp } from "@axux/core/dist/types";
import { type FC, type FormEvent, memo, useCallback } from "react";
import { type OptionProps } from "../types";
import { Icons } from "../types/icons";

export interface RadioProps
  extends ElementProps,
    IconProp,
    OptionProps<string | number> {
  /**
   * radio group name
   */
  name?: string;
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
    rtlFlip,
    ...rest
  }: RadioProps) => {
    const handleChange = useCallback(
      (e?: FormEvent<HTMLInputElement>) => {
        e?.currentTarget.checked &&
          onChange != null &&
          onChange(e?.currentTarget.value ?? "");
      },
      [onChange]
    );
    return (
      <label
        data-has-icon={!!icon}
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
          icon={icon ?? Icons.iconRadioOff}
        />
        <AxIcon
          data-check="on"
          rtlFlip={rtlFlip}
          icon={icon ?? Icons.iconRadioOn}
        />
        {error && (
          <AxIcon
            className="ax-field__error"
            icon={Icons.iconError}
            data-tooltip={error}
            data-tooltip-color="danger"
            data-tooltip-placement="bottom"
          />
        )}
        {label && <span className="ax-field__option--label">{label}</span>}
      </label>
    );
  }
);
