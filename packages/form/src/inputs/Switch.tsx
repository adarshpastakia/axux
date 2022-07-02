/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon, AxTooltip } from "@axux/core";
import { Color, ElementProps } from "@axux/core/dist/types";
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

export const Switch: FC<SwitchProps> = memo(
  ({
    isInvalid,
    isChecked,
    isDisabled,
    className,
    error,
    color,
    offLabel = "\u25CB",
    onLabel = "\u2758",
    inputRef,
    label,
    onChange,
    ...rest
  }) => {
    const [actualValue, setActualValue] = useState(isChecked ?? false);
    const [pending, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(isChecked ?? false);
    }, [isChecked]);
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        setActualValue(e?.target.checked ?? false);
        onChange && startTransition(() => onChange(e?.target.checked ?? false));
      },
      [onChange]
    );
    return (
      <label
        data-disabled={isDisabled}
        data-invalid={isInvalid}
        className="ax-field__option"
      >
        <input
          {...rest}
          ref={inputRef}
          type="checkbox"
          checked={actualValue}
          disabled={isDisabled}
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
        {error && (
          <AxTooltip color="danger" content={error} placement="bottom">
            <AxIcon className="ax-field__error" icon={Icons.iconError} />
          </AxTooltip>
        )}
        {label && <span className="ax-field__option--label">{label}</span>}
      </label>
    );
  }
);
