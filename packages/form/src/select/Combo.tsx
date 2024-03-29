/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { usePopover } from "@axux/core/dist/hooks/usePopover";
import { isEmpty } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import { Combobox } from "@headlessui/react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FocusEvent,
} from "react";
import { createPortal } from "react-dom";
import { FieldWrapper } from "../inputs/Wrapper";
import { Icons } from "../types/icons";
import { Options } from "./Option";
import { useSelect } from "./useSelect";
import { defaultMatcher, getLabel, getValue, type SelectProps } from "./utils";

export const ComboInput = <T extends AnyObject>({
  label,
  labelAppend,
  isRequired,
  value,
  placeholder,
  options,
  labelProperty = "label",
  valueProperty = "value",
  matcher,
  renderer,
  makeLabel,
  onChange,
  onSelect,
  onQuery,
  onCreateOption,
  usePortal,
  allowCreate,
  inputRef,
  isInvalid,
  className,
  isEditable,
  // @ts-expect-error ignore
  name,
  info,
  error,
  width,
  isDisabled,
  isReadOnly,
  allowClear,
  children,
  inline,
  labelWidth,
  onEnterPressed,
  autoFocus,
  ...rest
}: SelectProps<T>) => {
  const [actualValue, setActualValue] = useState<T>({} as AnyObject);
  const { list, query, onQueryChange } = useSelect({
    options,
    labelProperty,
    onQuery,
    onCreateOption,
  });

  const { styles, setPopperElement, setReferenceElement } = usePopover({
    hideArrow: true,
    sameWidth: true,
    placement: "bottom-start",
  });

  /** ***************** set actualValue when value changes *******************/
  useEffect(() => {
    let val = options
      .map((o: AnyObject) => o.items ?? o)
      .flat(2)
      .find((option) => {
        if (matcher != null) return matcher(option, value ?? "");
        return defaultMatcher(option, value, valueProperty);
      });
    if (value && !val && allowCreate) val = value;
    setActualValue(val ?? {});
  }, [value, valueProperty, options, allowCreate]);

  /** ***************** change actualValue *******************/
  const handleChange = useCallback(
    (option?: T) => {
      void Promise.resolve(option && onSelect?.(option)).then((b) => {
        if (b !== false) {
          onChange?.(getValue(option, valueProperty));
          setActualValue(option ?? ({} as T));
          onQueryChange("");
        }
      });
    },
    [onChange, valueProperty, query]
  );

  /** ***************** display label *******************/
  const displayLabel = useMemo(() => {
    if (makeLabel != null && !isEmpty(actualValue))
      return makeLabel(actualValue);
    return getLabel(actualValue, labelProperty);
  }, [makeLabel, labelProperty, actualValue]);

  const optionDropdown = useMemo(
    () => (
      <Combobox.Options
        ref={setPopperElement as AnyObject}
        className="ax-select__dropdown"
        style={styles.popper}
      >
        <Options
          query={query}
          options={list}
          renderer={renderer}
          allowCreate={allowCreate}
          labelProperty={labelProperty}
        />
      </Combobox.Options>
    ),
    [query, list, styles, renderer, allowCreate, labelProperty]
  );

  return (
    <Combobox
      value={actualValue}
      onChange={handleChange}
      disabled={isDisabled}
      name={name}
      as={Fragment}
      nullable
    >
      {({ open }) => (
        <Fragment>
          <FieldWrapper
            info={info}
            error={error}
            label={label}
            width={width}
            className={className}
            labelAppend={labelAppend}
            isInvalid={isInvalid}
            isRequired={isRequired}
            disabled={isDisabled}
            inline={inline}
            labelWidth={labelWidth}
            onClear={() => handleChange()}
            wrapperRef={setReferenceElement as AnyObject}
            canClear={allowClear && !isEmpty(actualValue)}
          >
            <Combobox.Input
              ref={inputRef}
              aria-label={label}
              aria-disabled={isDisabled}
              aria-readonly={isReadOnly}
              aria-required={isRequired}
              aria-errormessage={error}
              size={1}
              placeholder={placeholder}
              readOnly={!isEditable && !allowCreate}
              data-invalid={isInvalid}
              className="ax-field__input z-20"
              autoComplete="off"
              onKeyDownCapture={(e) =>
                ["Home", "End"].includes(e.key)
                  ? e.stopPropagation()
                  : handleEnter(onEnterPressed)(e)
              }
              displayValue={() => displayLabel}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
              {...rest}
            />
            {children}
            <Combobox.Button
              as="div"
              autoFocus={autoFocus}
              className="ax-field__addon ax-select__handle"
              data-align="end"
            >
              <AxIcon icon={Icons.iconDropdown} />
            </Combobox.Button>
          </FieldWrapper>
          {open && <div className="fixed inset-0 z-10" />}
          {usePortal && createPortal(optionDropdown, document.body)}
          {!usePortal && optionDropdown}
        </Fragment>
      )}
    </Combobox>
  );
};
ComboInput.displayName = "AxField.Combo";

const GenericMemo: <T>(c: T) => T = memo;

export const Combo = GenericMemo(ComboInput);
