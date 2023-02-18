/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { ElementProps, IconProp } from "@axux/core/dist/types";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { OptionProps } from "../types";
import { Icons } from "../types/icons";

export interface CheckboxProps
  extends ElementProps,
    IconProp,
    Omit<OptionProps<boolean>, "value"> {
  //
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
    rtlFlip,
    onChange,
    // @ts-expect-error
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
        <AxIcon data-check="off" icon={Icons.iconCheckboxOff} />
        <AxIcon data-check="on" icon={Icons.iconCheckboxOn} />
        {error && (
          <AxIcon
            className="ax-field__error"
            icon={Icons.iconError}
            data-tooltip={error}
            data-tooltip-color="danger"
            data-tooltip-placement="bottom"
          />
        )}
        {icon && <AxIcon icon={icon} rtlFlip={rtlFlip} />}
        {label && <span className="ax-field__option--label">{label}</span>}
      </label>
    );
  }
);
