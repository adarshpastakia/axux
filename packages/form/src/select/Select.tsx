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
  FocusEvent,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import { FieldWrapper } from "../inputs/Wrapper";
import { Icons } from "../types/icons";
import { Options } from "./Option";
import { useSelect } from "./useSelect";
import { defaultMatcher, getLabel, getValue, SelectProps } from "./utils";

export const SelectInput = <T extends AnyObject>({
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
  allowCreate,
  inputRef,
  isInvalid,
  className,
  isEditable,
  // @ts-ignore
  name,
  info,
  error,
  width,
  isDisabled,
  isReadOnly,
  allowClear,
  children,
  onEnterPressed,
  ...rest
}: SelectProps<T>) => {
  const [actualValue, setActualValue] = useState<T>();
  const [pending, startTransition] = useTransition();
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

  /******************* set actualValue when value changes *******************/
  useEffect(() => {
    let val = options
      .map((o: AnyObject) => o.items ?? o)
      .flat(2)
      .find((option) => {
        if (matcher) return matcher(option, value ?? "");
        return defaultMatcher(option, value, valueProperty);
      });
    if (value && !val && allowCreate) val = value;
    setActualValue(val);
  }, [value, valueProperty, options, allowCreate]);

  /******************* change actualValue *******************/
  const handleChange = useCallback(
    (option?: T) => {
      onQueryChange("");
      setActualValue(option);
      onSelect && option && startTransition(() => onSelect(option));
      onChange &&
        startTransition(() => onChange(getValue(option, valueProperty)));
    },
    [onChange, valueProperty, query]
  );

  /******************* display label *******************/
  const displayLabel = useMemo(() => {
    if (makeLabel && actualValue) return makeLabel(actualValue);
    return getLabel(actualValue, labelProperty);
  }, [makeLabel, labelProperty, actualValue]);

  return (
    <Combobox
      value={actualValue}
      onChange={handleChange}
      disabled={isDisabled}
      name={name}
      as={Fragment}
      nullable
    >
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
          disabled={isDisabled}
          readOnly={!isEditable && !allowCreate}
          data-invalid={isInvalid}
          className="ax-field__input"
          autoComplete="off"
          onKeyDown={handleEnter(onEnterPressed)}
          displayValue={() => displayLabel}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
          {...rest}
        />
        {children}
        <Combobox.Button
          as="div"
          className="ax-field__addon ax-select__handle"
          data-align="end"
        >
          <AxIcon icon={Icons.iconDropdown} />
        </Combobox.Button>
      </FieldWrapper>
      {createPortal(
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
        </Combobox.Options>,
        document.body
      )}
    </Combobox>
  );
};
SelectInput.displayName = "AxField.Select";

const GenericMemo: <T>(c: T) => T = memo;

export const Select = GenericMemo(SelectInput);
