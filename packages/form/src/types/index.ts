/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { KeyboardEventHandler } from "react";

export interface InputProps<K = string> {
  /**
   * info text
   */
  info?: string;
  /**
   * field label
   */
  label?: string;
  /**
   * field error message
   */
  error?: string;
  /**
   * label extra
   */
  labelAppend?: JSX.Element;

  /**
   * input element ref
   */
  inputRef?: React.Ref<AnyObject>;
  /**
   * field placeholder text
   */
  placeholder?: string;
  /**
   * field value
   */
  value?: K;
  /**
   * default field value
   */
  defaultValue?: K;
  /**
   * show clear button
   */
  allowClear?: boolean;
  /**
   * field invalid
   */
  isInvalid?: boolean;
  /**
   * field required
   */
  isRequired?: boolean;
  /**
   * field disabled
   */
  isDisabled?: boolean;
  /**
   *
   */
  autoFocus?: boolean;
  /**
   * field readonly
   */
  isReadOnly?: boolean;
  /**
   * field width
   */
  width?: number | string;

  /**
   * on value changed
   */
  onChange?: (value?: K) => void;
  /**
   * on enter press callback
   */
  onEnterPressed?: KeyboardEventHandler;
}

export interface OptionProps<K> {
  /**
   * option label
   */
  label?: string;
  /**
   * field error message
   */
  error?: string;

  /**
   * input element ref
   */
  inputRef?: React.Ref<HTMLInputElement>;
  /**
   * field checked
   */
  isChecked?: boolean;
  /**
   * field value for radio options
   */
  value?: string | number;
  /**
   * field invalid
   */
  isInvalid?: boolean;
  /**
   * field disabled
   */
  isDisabled?: boolean;

  /**
   * on value changed
   */
  onChange?: (checked?: K) => void;
}
