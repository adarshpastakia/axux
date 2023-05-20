/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type Color, type ElementProps } from "@axux/core/dist/types";
import {
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
  type ChangeEvent,
  type FC,
} from "react";
import { type OptionProps } from "../types";
import { Error } from "./Error";

export interface SwitchProps
  extends ElementProps,
    Omit<OptionProps<boolean>, "value"> {
  /**
   * switch on color
   */
  color?: Color;
  /**
   * on label
   */
  onLabel?: string;
  /**
   * off label
   */
  offLabel?: string;
}

// eslint-disable-next-line react/display-name
export const Switch: FC<SwitchProps> = memo(
  ({
    isInvalid,
    isChecked,
    isDisabled,
    isReadOnly,
    className,
    error,
    color,
    offLabel = "\u25CB",
    onLabel = "\u2758",
    inputRef,
    label,
    onChange,
    // @ts-expect-error ignore
    value,
    ...rest
  }: SwitchProps) => {
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
        className="ax-field__option"
      >
        <input
          {...rest}
          ref={inputRef}
          type="checkbox"
          checked={actualValue}
          disabled={isDisabled}
          readOnly={isReadOnly}
          className="ax-field__input"
          onChange={handleChange}
        />
        <div
          className={`ax-field__switch ${className ?? ""}`}
          data-color={color}
          data-on={onLabel || "\u2758"}
          data-off={offLabel || "\u25CB"}
        >
          <div className="ax-field__switch--handle" />
        </div>
        {error && <Error error={error} />}
        {label && <span className="ax-field__option--label">{label}</span>}
      </label>
    );
  }
);
