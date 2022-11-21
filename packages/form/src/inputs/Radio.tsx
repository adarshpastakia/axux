/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { ElementProps } from "@axux/core/dist/types";
import { FC, FormEvent, memo, useCallback } from "react";
import { OptionProps } from "../types";
import { Icons } from "../types/icons";

export interface RadioProps extends ElementProps, OptionProps<string | number> {
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
    className,
    error,
    inputRef,
    label,
    onChange,
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
        data-disabled={isDisabled}
        data-invalid={!isDisabled && isInvalid}
        className={`ax-field__option ${className ?? ""}`}
      >
        <input
          {...rest}
          ref={inputRef}
          type="radio"
          disabled={isDisabled}
          defaultChecked={isChecked}
          className="ax-field__input"
          onChange={handleChange}
        />
        <AxIcon data-check="off" icon={Icons.iconRadioOff} />
        <AxIcon data-check="on" icon={Icons.iconRadioOn} />
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
