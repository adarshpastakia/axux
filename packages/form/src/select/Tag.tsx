// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxPopover, AxTag } from "@axux/core";
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
export interface TagProps<T = KeyValue>
  extends ControllerProps<string[] | T[]>,
    WrapperProps,
    FieldStateProps,
    SelectCommonProps {
  /**
   * Select handler
   */
  onSelect?: (value?: T[]) => void;
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

const TagField: FC<SelectCommonProps & WrapperProps & FieldStateProps & InnerProps> = ({
  children,
  placeholder,
  allowSearch,
  isDisabled,
  isReadonly,
  usePortal,
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
  ...props
}) => {
  const {
    isOpen,
    setOpen,
    inputRef,
    inputLabel,
    innerOptions,
    handleKey,
    handleClick,
    isQuerying,
    handleRemove,
    queryHandler,
    isSelected,
    resetList
  } = useSelect({
    ...props,
    multiple: true
  });

  const isEditable = useMemo(() => !(isDisabled || isReadonly), [isDisabled, isReadonly]);

  useImperativeHandle(selectRef, () => ({
    focus: () => inputRef.current && inputRef.current.focus()
  }));

  return (
    <AxPopover
      isOpen={isOpen}
      usePortal={usePortal}
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
        <div className="ax-select__tagContainer">
          {inputLabel.map((o: KeyValue, index: number) => (
            <AxTag
              key={o.value}
              icon={o.icon}
              tabIndex={-1}
              onRemove={isEditable ? () => handleRemove(index) : undefined}
            >
              {o.label}
            </AxTag>
          ))}
          {isEditable && (
            <input
              size={1}
              ref={inputRef}
              className="ax-field__input"
              formNoValidate
              disabled={isDisabled}
              placeholder={placeholder}
              readOnly={!allowSearch || isReadonly}
              onFocus={(e) => e.target.select()}
              onClick={() => setOpen(isEditable)}
              onChange={queryHandler}
              onKeyDown={handleKey}
              autoComplete={"off"}
            />
          )}
        </div>
        <div className="ax-field__handle">
          <AxButton
            type="link"
            tabIndex={-1}
            icon={AppIcons.iconCaretDown}
            isDisabled={isDisabled || isReadonly}
            onClick={() => setOpen(isEditable)}
          />
        </div>
      </AxFieldWrapper>
      <div onClickCapture={handleClick} className="ax-select__popover">
        {innerOptions.map((opt, index) => (
          <AxSelectOption key={opt.value} {...opt} value={`${index}`} selected={isSelected(opt)} />
        ))}
      </div>
    </AxPopover>
  );
};
TagField.displayName = "AxTagField";

/**
 * Select input
 * @internal
 */
export const AxTagField = <T extends KeyValue>({
  children,
  value,
  onChange,
  onEnterPressed,
  allowClear,
  name,
  error,
  autoFocus,
  ...props
}: PropsWithChildren<TagProps<T>>) => {
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
          {children}
          <TagField
            {...props}
            canClear={canClear}
            onClear={onClear}
            error={error}
            selectRef={ref}
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
