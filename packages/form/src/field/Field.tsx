// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, memo } from "react";
import { AxFieldLabel } from "../internals/FieldLabel";
import { AxSelectField } from "../select/Select";
import { AxTagField } from "../select/Tag";
import { WrapperProps } from "../types";
import { AxAddon } from "./Addon";
import { AxCheckboxField } from "./Checkbox";
import { AxNumberField } from "./Number";
import { AxOptions } from "./Options";
import { AxPasswordField } from "./Password";
import { AxRadioField } from "./Radio";
import { AxSliderRange } from "./Range";
import { AxSearchField } from "./Search";
import { AxSliderField } from "./Slider";
import { AxSwitchField } from "./Switch";
import { AxTextField } from "./Text";
import { AxTextareaField } from "./Textarea";

/** @internal */
export interface FieldWrapperProps extends WrapperProps {
  onClear?: () => void;
}

interface ExtendedFC<T> extends FC<T> {
  Addon: typeof AxAddon;
  Text: typeof AxTextField;
  Number: typeof AxNumberField;
  Slider: typeof AxSliderField;
  Range: typeof AxSliderRange;
  Password: typeof AxPasswordField;
  Textarea: typeof AxTextareaField;
  Search: typeof AxSearchField;
  Options: typeof AxOptions;
  Radio: typeof AxRadioField;
  Switch: typeof AxSwitchField;
  Checkbox: typeof AxCheckboxField;
  Select: typeof AxSelectField;
  Tag: typeof AxTagField;
}

/**
 * Field row container
 * @internal
 */
export const AxField: ExtendedFC<FieldWrapperProps> = memo<FieldWrapperProps>(
  ({ children, label, required, appendLabel, span = 1 }) => {
    return (
      <div className="ax-field" style={{ gridColumnEnd: `span ${Math.min(4, Math.max(1, span))}` }}>
        {label && (
          <AxFieldLabel required={required} appendLabel={appendLabel}>
            {label}
          </AxFieldLabel>
        )}
        <div className="ax-field__container">{children}</div>
      </div>
    );
  }
) as AnyObject;
AxField.Addon = AxAddon;
AxField.Text = AxTextField;
AxField.Number = AxNumberField;
AxField.Slider = AxSliderField;
AxField.Range = AxSliderRange;
AxField.Password = AxPasswordField;
AxField.Textarea = AxTextareaField;
AxField.Search = AxSearchField;
AxField.Options = AxOptions;
AxField.Radio = AxRadioField;
AxField.Switch = AxSwitchField;
AxField.Checkbox = AxCheckboxField;
AxField.Select = AxSelectField;
AxField.Tag = AxTagField;

AxField.displayName = "AxField";
AxField.Addon.displayName = "AxField.Addon";
AxField.Text.displayName = "AxField.Text";
AxField.Number.displayName = "AxField.Number";
AxField.Slider.displayName = "AxField.Slider";
AxField.Range.displayName = "AxField.Range";
AxField.Password.displayName = "AxField.Password";
AxField.Textarea.displayName = "AxField.Textarea";
AxField.Search.displayName = "AxField.Search";
AxField.Options.displayName = "AxField.Options";
AxField.Radio.displayName = "AxField.Radio";
AxField.Switch.displayName = "AxField.Switch";
AxField.Checkbox.displayName = "AxField.Checkbox";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AxField.Select.displayName = "AxField.Select";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
AxField.Tag.displayName = "AxField.Tag";
