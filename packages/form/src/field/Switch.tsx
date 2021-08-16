// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Color, ColorPalette } from "@axux/core/dist/types";
import { FC, memo } from "react";
import { AxFieldController } from "../internals/FieldController";

/** @internal */
export interface SwitchProps {
  /**
   * Field name
   */
  name?: string;
  /**
   * Checkbox label
   */
  label?: string | JSX.Element;
  /**
   * Checked
   */
  checked?: boolean;
  /**
   * Disabled
   */
  isDisabled?: boolean;
  /**
   * Change handler
   */
  onChange?: (checked: boolean) => void;
  /**
   * Checked theme color
   */
  color?: Color | ColorPalette;
  /**
   * Custom checked label
   */
  onLabel?: string;
  /**
   * Custom unchecked label
   */
  offLabel?: string;
}

/**
 * Toggle switch
 * @internal
 */
export const AxSwitchField: FC<SwitchProps> = memo(
  ({ name, label, isDisabled, checked, onChange, color, onLabel = "I", offLabel = "O" }) => {
    return (
      <AxFieldController value={checked} onChange={onChange} name={name}>
        {({ ref, onChange, value, onBlur }) => (
          <label className="ax-field__option">
            <input
              ref={ref}
              name={name}
              type="checkbox"
              checked={value}
              disabled={isDisabled}
              className="ax-field__input"
              onBlur={onBlur}
              onChange={(event) => onChange && onChange(event.target.checked)}
            />
            <div
              className="ax-field__switch"
              data-color={color}
              data-on-label={onLabel}
              data-off-label={offLabel}
            >
              <div className="ax-field__switch--handle" />
            </div>
            <span>{label}</span>
          </label>
        )}
      </AxFieldController>
    );
  }
);
