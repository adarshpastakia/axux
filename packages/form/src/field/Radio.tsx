// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { memo, VFC } from "react";

/** @internal */
export interface RadioProps {
  /**
   * Field name
   */
  name?: string;
  /**
   * Radio label
   */
  label?: string | JSX.Element;
  /**
   * Checked
   */
  checked?: boolean;
  /**
   * Value
   */
  value: string | number;
  /**
   * Disabled
   */
  isDisabled?: boolean;
  /**
   * Change handler
   */
  onChange?: (value: string | number) => void;
}

/**
 * Checkbox input
 * @internal
 */
export const AxRadioField: VFC<RadioProps> = memo(
  ({ name, label, isDisabled, value, checked, onChange }) => {
    return (
      <label className="ax-field__option">
        <input
          name={name}
          type="radio"
          value={value}
          checked={checked}
          disabled={isDisabled}
          className="ax-field__input"
          onChange={(event) => event.target.checked && onChange && onChange(event.target.value)}
        />
        <AxIcon data-check="off" icon={AppIcons.iconRadioOff} />
        <AxIcon data-check="on" icon={AppIcons.iconRadioOn} />
        {label && <span>{label}</span>}
      </label>
    );
  }
);
