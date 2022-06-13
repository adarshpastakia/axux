// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxPopover } from "@axux/core";
import { EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import {
  FC,
  FocusEventHandler,
  Fragment,
  KeyboardEventHandler,
  PropsWithChildren,
  useImperativeHandle,
  useMemo
} from "react";
import { RefCallBack } from "react-hook-form";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldWrapper } from "../internals/FieldWrapper";
import { useSelect } from "../internals/useSelect";
import { ControllerProps, FieldStateProps, SelectCommonProps, WrapperProps } from "../types";
import { AxSelectOption } from "./Option";

/** @internal */
export interface SelectProps<T = KeyValue>
  extends ControllerProps,
    WrapperProps,
    FieldStateProps,
    SelectCommonProps<T> {
  /**
   * Select handler
   */
  onSelect?: (value?: T) => void;
}

interface InnerProps {
  value: AnyObject;
  error?: string;
  canClear?: boolean;
  selectRef: RefCallBack;
  onBlur?: FocusEventHandler;
  onClear?: EmptyCallback;
  onChange?: (v: AnyObject) => void;
  onEnter?: KeyboardEventHandler;
}

const SelectField: FC<
  SelectCommonProps<AnyObject> & WrapperProps & FieldStateProps & InnerProps
> = ({
  children,
  placeholder,
  allowSearch,
  isDisabled,
  isReadonly,
  label,
  hint,
  appendLabel,
  required,
  maxWidth,
  minWidth,
  width,
  span,
  canClear,
  onClear,
  error,
  selectRef,
  usePortal = true,
  ...props
}) => {
  const {
    isOpen,
    setOpen,
    listRef,
    inputRef,
    inputLabel,
    innerOptions,
    handleKey,
    handleClick,
    isQuerying,
    queryHandler,
    isSelected,
    resetList
  } = useSelect({
    ...props
  });

  const isEditable = useMemo(() => !(isDisabled || isReadonly), [isDisabled, isReadonly]);

  useImperativeHandle(selectRef, () => ({
    focus: () => inputRef.current && inputRef.current.focus()
  }));

  return (
    <AxPopover
      usePortal={usePortal}
      closeOnClick
      isOpen={isOpen}
      autoTrigger={false}
      onOpen={() => setOpen(isEditable)}
      onClose={() => {
        setOpen(false);
        resetList();
      }}
    >
      <AxFieldWrapper
        label={label}
        hint={hint}
        appendLabel={appendLabel}
        required={required}
        maxWidth={maxWidth}
        minWidth={minWidth}
        width={width}
        span={span}
        isLoading={isQuerying}
        isDisabled={isDisabled}
        isReadonly={isReadonly}
        canClear={canClear}
        onClear={onClear}
        error={error}
      >
        {children}
        <input
          size={1}
          ref={inputRef}
          className="ax-field__input"
          formNoValidate
          disabled={isDisabled}
          placeholder={placeholder}
          defaultValue={inputLabel}
          readOnly={!allowSearch || isReadonly}
          onFocus={(e) => e.target.select()}
          onClick={() => setOpen(isEditable)}
          onChange={queryHandler}
          onKeyDown={handleKey}
          autoComplete={"off"}
        />
        <div className="ax-field__handle">
          <AxButton
            type="link"
            tabIndex={-1}
            icon={AppIcons.iconCaretDown}
            isDisabled={isDisabled || isReadonly}
            onClick={() => [inputRef.current?.focus(), setOpen(true)]}
          />
        </div>
      </AxFieldWrapper>
      <div onClickCapture={handleClick} className="ax-select__popover" ref={listRef}>
        {innerOptions.map((opt, index) => (
          <AxSelectOption key={opt.value} {...opt} value={`${index}`} selected={isSelected(opt)} />
        ))}
      </div>
    </AxPopover>
  );
};
SelectField.displayName = "AxSelectField";

/**
 * Select input
 * @internal
 */
export const AxSelectField = <T extends AnyObject>({
  children,
  value,
  onChange,
  onEnterPressed,
  allowClear,
  name,
  error,
  autoFocus,
  ...props
}: PropsWithChildren<SelectProps<T>>) => {
  return (
    <AxFieldController
      value={value}
      onChange={onChange}
      error={error}
      allowClear={allowClear}
      name={name}
      autoFocus={autoFocus}
      onEnterPressed={onEnterPressed}
    >
      {({ ref, onChange, value, error, onBlur, onEnter, onClear, canClear }) => (
        <Fragment>
          <SelectField
            {...props}
            canClear={canClear}
            onClear={onClear}
            error={error}
            selectRef={ref}
            value={value}
            onBlur={onBlur}
            onEnter={onEnter}
            onChange={onChange}
          >
            {children}
          </SelectField>
        </Fragment>
      )}
    </AxFieldController>
  );
};
