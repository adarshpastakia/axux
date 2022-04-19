// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon, AxTooltip } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { memo } from "react";
import { AxFieldController } from "../internals/FieldController";

/** @internal */
export interface CheckboxProps {
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
}

/**
 * Checkbox input
 * @internal
 */
export const AxCheckboxField: VFC<CheckboxProps> = memo(
  ({ name, label, isDisabled, checked, onChange }) => {
    return (
      <AxFieldController value={checked} onChange={onChange} name={name}>
        {({ ref, onChange, value, error, onBlur }) => (
          <label className="ax-field__option" data-invalid={!!error} onClick={(e) => e.stopPropagation()}>
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
            <AxIcon data-check="off" icon={AppIcons.iconCheckboxOff} />
            <AxIcon data-check="on" icon={AppIcons.iconCheckboxOn} />
            {error && (
              <AxTooltip color="danger" content={error} placement="bottom">
                <span className="ax-field__error">!</span>
              </AxTooltip>
            )}
            {label && <span>{label}</span>}
          </label>
        )}
      </AxFieldController>
    );
  }
);
