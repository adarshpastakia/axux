/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { type ElementProps, type IconProp } from "@axux/core/dist/types";
import {
  type ChangeEvent,
  type FC,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { type OptionProps } from "../types";
import { Icons } from "../types/icons";

export interface CheckboxProps
  extends ElementProps,
    IconProp,
    Omit<OptionProps<boolean>, "value"> {
  iconOff?: string;
}

// eslint-disable-next-line react/display-name
export const Checkbox: FC<CheckboxProps> = memo(
  ({
    isInvalid,
    isChecked,
    isDisabled,
    className,
    error,
    inputRef,
    label,
    icon,
    iconOff,
    rtlFlip,
    onChange,
    // @ts-expect-error ignore
    value,
    ...rest
  }: CheckboxProps) => {
    const [actualValue, setActualValue] = useState(value ?? isChecked ?? false);
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? isChecked ?? false);
    }, [value, isChecked]);
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        setActualValue(e?.target.checked ?? false);
        onChange != null &&
          startTransition(() => onChange(e?.target.checked ?? false));
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
          type="checkbox"
          checked={actualValue}
          disabled={isDisabled}
          className="ax-field__input"
          data-invalid={isInvalid}
          onChange={handleChange}
        />
        <AxIcon
          data-check="off"
          rtlFlip={rtlFlip}
          icon={iconOff ?? icon ?? Icons.iconCheckboxOff}
        />
        <AxIcon
          data-check="on"
          rtlFlip={rtlFlip}
          icon={icon ?? Icons.iconCheckboxOn}
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
