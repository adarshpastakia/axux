// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxPopover } from "@axux/core";
import { EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxFieldController } from "@axux/form/dist/internals/FieldController";
import { AxFieldWrapper } from "@axux/form/dist/internals/FieldWrapper";
import { ControllerProps, FieldStateProps, WrapperProps } from "@axux/form/dist/types";
import {
  FC,
  FocusEventHandler,
  Fragment,
  KeyboardEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { useLocale } from "../hooks/useLocale";
import { AxDatePanel } from "../panels/DatePanel";
import { DateProps } from "../types";
import { dateFormat } from "../utils";

export interface DateInputProps
  extends Omit<ControllerProps<Date>, "value">,
    WrapperProps,
    FieldStateProps,
    DateProps {
  /**
   * Use portal for dropdown
   */
  usePortal?: boolean;
}

interface InnerProps {
  value: AnyObject;
  error?: string;
  canClear?: boolean;
  inputRef: (instance: AnyObject) => void;
  onBlur?: FocusEventHandler;
  onClear?: EmptyCallback;
  onChange?: (v: AnyObject) => void;
  onEnter?: KeyboardEventHandler;
  usePortal?: boolean;
}

const DateField: FC<DateProps & WrapperProps & FieldStateProps & InnerProps> = ({
  children,
  placeholder,
  isDisabled,
  isReadonly,
  usePortal,
  canClear,
  onClear,
  inputRef,
  format = "dd MMM yyyy",
  date,
  onChange,
  onBlur,
  onEnter,
  min,
  max,
  hijriCalendar,
  showHijriToggle,
  dateDisabled,
  ...props
}) => {
  const { dateLocale, isHijri, setHijri } = useLocale(hijriCalendar);

  const [isOpen, setOpen] = useState(false);
  const [value, setValue] = useState<DateProps["date"]>();

  useEffect(() => {
    setValue(date);
  }, [date]);

  /**
   * Get input label
   */
  const inputLabel = useMemo(() => {
    return value ? dateFormat(value, format, dateLocale, isHijri) : "";
  }, [dateLocale, format, isHijri, value]);

  const isEditable = useMemo(() => !(isDisabled || isReadonly), [isDisabled, isReadonly]);

  const afterChange = useCallback(
    (v: DateProps["date"]) => {
      onChange && onChange(v);
      setValue(v);
      setOpen(false);
    },
    [onChange]
  );

  return (
    <AxPopover
      closeOnClick
      isOpen={isOpen}
      resize={false}
      autoTrigger={false}
      usePortal={usePortal}
      className="ax-date__popover"
      onOpen={() => setOpen(isEditable)}
      onClose={() => setOpen(false)}
    >
      <AxFieldWrapper
        {...props}
        isDisabled={isDisabled}
        isReadonly={isReadonly}
        onClear={onClear}
        className="ax-date__input"
        canClear={canClear}
      >
        {children}
        <input
          size={1}
          ref={inputRef}
          className="ax-field__input"
          formNoValidate
          defaultValue={inputLabel}
          disabled={isDisabled}
          readOnly={true}
          placeholder={placeholder}
          onFocus={(e) => e.target.select()}
          onClick={() => setOpen(isEditable)}
          onKeyUp={onEnter}
          onBlur={onBlur}
          autoComplete={"off"}
        />
        <div className="ax-field__handle">
          <AxButton
            type="link"
            tabIndex={-1}
            icon={AppIcons.iconCalendar}
            isDisabled={isDisabled || isReadonly}
            onClick={() => setOpen(isEditable)}
          />
        </div>
      </AxFieldWrapper>
      <AxDatePanel
        max={max}
        min={min}
        date={value}
        dateDisabled={dateDisabled}
        onChange={afterChange}
        hijriCalendar={isHijri}
        showHijriToggle={showHijriToggle}
        onHijriChange={setHijri}
      />
    </AxPopover>
  );
};
DateField.displayName = "AxDateField";

export const AxDateInput: FC<DateInputProps> = ({
  children,
  date,
  onChange,
  onEnterPressed,
  allowClear,
  name,
  error,
  autoFocus,
  ...props
}) => {
  return (
    <AxFieldController
      value={date}
      onChange={onChange}
      error={error}
      allowClear={allowClear}
      name={name}
      autoFocus={autoFocus}
      onEnterPressed={onEnterPressed}
    >
      {({ ref, onChange, value, error, onBlur, onEnter, onClear, canClear }) => (
        <Fragment>
          {children}
          <DateField
            {...props}
            canClear={canClear}
            onClear={onClear}
            error={error}
            inputRef={ref}
            value={value}
            onBlur={onBlur}
            onEnter={onEnter}
            onChange={onChange}
          />
        </Fragment>
      )}
    </AxFieldController>
  );
};
