// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { BadgeType } from "@axux/core/dist/internals/useBadge";
import { EmptyCallback } from "@axux/core/dist/types";

/** @internal */
export interface ControllerProps<T = string> {
  /**
   * Form property name
   */
  name?: string;
  /**
   * Field value
   */
  value?: T;
  /**
   * Error message
   */
  error?: string;
  /**
   * Can clear field value
   */
  allowClear?: boolean;
  /**
   * Change handler
   */
  onChange?: (value?: T) => void;
  /**
   * Auto focus on render
   */
  autoFocus?: boolean;
  /**
   * Callback handler for enter key press
   */
  onEnterPressed?: EmptyCallback;
}

/** @internal */
export interface FieldStateProps {
  /**
   * Disabled
   */
  isDisabled?: boolean;
  /**
   * Read only
   */
  isReadonly?: boolean;
}

/** @internal */
export interface WrapperProps {
  /**
   * Field label
   */
  label?: string | JSX.Element;
  /**
   * Append label
   */
  appendLabel?: string | JSX.Element;
  /**
   * Input placeholder
   */
  placeholder?: string;
  /**
   * Required field
   */
  required?: boolean;
  /**
   * Hint/help text for field
   */
  hint?: string | JSX.Element;
  /**
   * Column span within form layout,
   */
  span?: number;
  /**
   * Fixed width
   */
  width?: string | number;
  /**
   * Maximum width
   */
  maxWidth?: string | number;
  /**
   * Minimum width
   */
  minWidth?: string | number;
  /**
   * Loading indicator
   */
  isLoading?: boolean;
}

/** @internal */
export interface OptionProps<T> {
  /**
   * Icon
   */
  icon?: string | JSX.Element;
  /**
   * Label
   */
  label: string;
  /**
   * Value
   */
  value: string | T;
  /**
   * Badge
   */
  badge?: BadgeType;
  /**
   * Disabled
   */
  isDisabled?: boolean;
  /**
   * Raw option
   * @internal
   */
  raw?: T;
}

/** @internal */
export interface SelectCommonProps<T = KeyValue> {
  /**
   * Select handler
   */
  onSelect?: (value?: AnyObject) => void;
  /**
   * Callback handler for enter key press
   */
  onEnterPressed?: EmptyCallback;

  /**
   * Empty list display
   */
  emptyMessage?: string | JSX.Element;

  /**
   * Options list
   */
  options?: KeyValue[];
  /**
   * Options query callback
   */
  onQuery?: (query: string) => Promise<KeyValue[]> | KeyValue[];

  /**
   * Selected value as object
   */
  asObject?: boolean;
  /**
   * Enable search
   */
  allowSearch?: boolean;
  /**
   * Match selected value against option
   */
  matcher?: (value: T, match: T) => boolean;

  /**
   * Object property for icon
   */
  iconProperty?: string;
  /**
   * Object property for badge
   */
  badgeProperty?: string;
  /**
   * Object property for label
   */
  labelProperty?: string;
  /**
   * Object property for value
   */
  valueProperty?: string;
  /**
   * Convert object into option
   */
  makeOption?: (option: T) => OptionProps<T>;

  /**
   * Use portal for dropdown
   */
  usePortal?: boolean;
}
