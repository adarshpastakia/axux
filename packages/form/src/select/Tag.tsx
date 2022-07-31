/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon, AxTag } from "@axux/core";
import { usePopover } from "@axux/core/dist/hooks/usePopover";
import { isArray, isEmpty } from "@axux/utilities";
import { Combobox } from "@headlessui/react";
import {
  FocusEvent,
  Fragment,
  KeyboardEvent,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { FieldWrapper } from "../inputs/Wrapper";
import { Icons } from "../types/icons";
import { Options } from "./Option";
import { useSelect } from "./useSelect";
import { defaultMatcher, getLabel, getValue, TagProps } from "./utils";

export const TagInput = <T extends AnyObject>({
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
}: TagProps<T>) => {
  const [actualValue, setActualValue] = useState<T[]>([]);
  const [pending, startTransition] = useTransition();
  const { list, query, onQueryChange } = useSelect({
    options,
    labelProperty,
    onQuery,
    onCreateOption,
  });

  const { styles, forceUpdate, setPopperElement, setReferenceElement } =
    usePopover({
      hideArrow: true,
      sameWidth: true,
      placement: "bottom-start",
    });

  /******************* set actualValue when value changes *******************/
  useEffect(() => {
    if (!isArray(value)) return setActualValue([]);
    const flatList = options.map((o: AnyObject) => o.items ?? o).flat(2);
    setActualValue(
      (value ?? [])
        .map((val) => {
          const ret = matcher
            ? flatList.find((option) => matcher(option, val))
            : flatList.find((option) =>
                defaultMatcher(option, val, valueProperty)
              );
          if (ret) return ret;
          if (allowCreate) return val;
          return null;
        })
        .filter(Boolean)
    );
  }, [value, valueProperty, options, allowCreate]);

  /******************* change actualValue *******************/
  const handleChange = useCallback(
    (options: T[] = []) => {
      onQueryChange("");
      setActualValue(options);
      onSelect && options && startTransition(() => onSelect(options));
      onChange &&
        startTransition(() =>
          onChange(
            options.map((value: AnyObject) => getValue(value, valueProperty))
          )
        );
      setTimeout(() => forceUpdate?.(), 100);
    },
    [onChange, forceUpdate, valueProperty, query]
  );

  /******************* display label *******************/
  const displayLabel = useCallback(
    (option: T) => {
      if (makeLabel && actualValue) return makeLabel(option);
      return getLabel(option, labelProperty);
    },
    [makeLabel, labelProperty]
  );

  const handleRemove = useCallback(
    (index = -1) => {
      const newValue = [...actualValue];
      newValue.splice(index, 1);
      setActualValue(newValue);
      onChange &&
        startTransition(() =>
          onChange(
            newValue.map((value: AnyObject) => getValue(value, valueProperty))
          )
        );
      setTimeout(() => forceUpdate?.(), 100);
    },
    [actualValue]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!e.target.value && e.key === "Backspace") {
        handleRemove();
      }
      if (!e.target.value && e.key === "Enter") {
        onEnterPressed?.(e);
      }
    },
    [handleRemove, onEnterPressed]
  );

  return (
    <Combobox
      value={actualValue}
      onChange={handleChange}
      disabled={isDisabled}
      name={name}
      as={Fragment}
      nullable
      multiple
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
        <div className="flex flex-wrap flex-auto items-center order-3">
          {actualValue.map((option, i) => (
            <AxTag
              key={i}
              className="ax-select__tag"
              onRemove={() => handleRemove(i)}
            >
              {displayLabel(option)}
            </AxTag>
          ))}
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
            className="ax-field__input flex-auto min-w-fit"
            autoComplete="off"
            onKeyDown={handleKeyPress}
            onChange={(e) => onQueryChange(e.target.value)}
            onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
            {...rest}
          />
        </div>
        {children}
        <Combobox.Button
          as="div"
          className="ax-field__addon ax-select__handle"
          data-align="end"
        >
          <AxIcon icon={Icons.iconDropdown} />
        </Combobox.Button>
      </FieldWrapper>
      <Combobox.Options
        ref={setPopperElement as AnyObject}
        onMouseUp={(e: AnyObject) =>
          e.currentTarget.parentElement
            .querySelector(".ax-field__input")
            ?.focus()
        }
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
    </Combobox>
  );
};
TagInput.displayName = "AxField.Tag";

const GenericMemo: <T>(c: T) => T = memo;

export const Tag = GenericMemo(TagInput);
