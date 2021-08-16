// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon, AxTooltip } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Children, cloneElement, FC, memo } from "react";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldLabel } from "../internals/FieldLabel";
import { WrapperProps } from "../types";

/** @internal */
export interface OptionProps extends WrapperProps {
  /**
   * Vertical layout
   */
  vertical?: boolean;
  /**
   * Field name, applicable to radio options only
   */
  name?: string;
  /**
   * Field value, applicable to radio options only
   */
  value?: string;
  /**
   * Change handler, applicable to radio options only
   */
  onChange?: (value: string) => void;
  /**
   * Error message
   */
  error?: string;
}

/**
 * Options group field
 * @internal
 */
export const AxOptions: FC<OptionProps> = memo(
  ({ vertical, name, children, value, onChange, label, appendLabel, required, hint, error }) => {
    return (
      <AxFieldController value={value} onChange={onChange} name={name} error={error}>
        {({ onChange, value: checkedValue, error }) => (
          <div className="ax-field" data-invalid={!!error}>
            {label && (
              <AxFieldLabel required={required} appendLabel={appendLabel}>
                {label}
                {error && (
                  <AxTooltip color="danger" content={error} placement="bottom">
                    <span className="ax-field__error">
                      <AxIcon icon={AppIcons.iconExclaim} color="danger" />
                    </span>
                  </AxTooltip>
                )}
              </AxFieldLabel>
            )}
            <div className="ax-field__options" data-vertical={vertical}>
              {Children.toArray(children).map((child: AnyObject) => {
                const newProps = { ...child.props, checked: false, onChange };
                if (name) {
                  newProps.name = name;
                }
                if (checkedValue) {
                  newProps.checked = newProps.value === checkedValue;
                }
                return cloneElement(child, newProps);
              })}
            </div>
            {hint && <div className="ax-field__hint">{hint}</div>}
          </div>
        )}
      </AxFieldController>
    );
  }
);
