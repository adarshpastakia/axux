/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxTag } from "@axux/core";
import { isArray, isEmpty } from "@axux/utilities";
import { Combobox } from "@headlessui/react";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useState,
  type FocusEvent,
  type KeyboardEvent,
} from "react";
import { Container } from "../inputs/Container";
import { FieldWrapper } from "../inputs/Wrapper";
import { EMPTY_ARRAY } from "../types";
import { Options } from "./Option";
import { useSelect } from "./useSelect";
import { defaultMatcher, getLabel, getValue, type TagProps } from "./utils";

export const ListInput = <T extends AnyObject>({
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
  onChange,
  onSelect,
  onQuery,
  makeLabel,
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
  multiple = true,
  minHeight = "12rem",
  maxHeight = "24rem",
  ...rest
}: TagProps<T> & {
  multiple?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
}) => {
  const [actualValue, setActualValue] = useState<T[]>(EMPTY_ARRAY);
  const { list, query, onQueryChange } = useSelect({
    options,
    labelProperty,
    onQuery,
    onCreateOption,
  });

  /** ***************** set actualValue when value changes *******************/
  useEffect(() => {
    if (!isArray(value)) return setActualValue([]);
    const flatList = options.map((o: AnyObject) => o.items ?? o).flat(2);
    setActualValue(
      (value ?? [])
        .map((val) => {
          const ret =
            matcher != null
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

  /** ***************** change actualValue *******************/
  const handleChange = useCallback(
    (options: T[] = []) => {
      void Promise.resolve(onSelect?.(options)).then((b) => {
        if (b !== false) {
          onChange?.(
            options.map((value: AnyObject) => getValue(value, valueProperty))
          );
          setActualValue(options);
          onQueryChange("");
        }
      });
    },
    [onChange, valueProperty, query]
  );

  /** ***************** display label *******************/
  const displayLabel = useCallback(
    (option: T) => {
      if (makeLabel != null) return makeLabel(option);
      return getLabel(option, labelProperty);
    },
    [makeLabel, labelProperty]
  );

  const handleRemove = useCallback(
    (index = -1) => {
      const newValue = [...actualValue];
      newValue.splice(index, 1);
      setActualValue(newValue);
      onChange?.(
        newValue.map((value: AnyObject) => getValue(value, valueProperty))
      );
    },
    [actualValue]
  );

  const handleKeyPress = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (!e.currentTarget.value && e.key === "Backspace") {
        handleRemove();
      }
      if (!e.currentTarget.value && e.key === "Enter") {
        onEnterPressed?.(e);
      }
      if (e.currentTarget.value && e.key === "Enter") {
        (e.target as HTMLInputElement).value = "";
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
      multiple={multiple as AnyObject}
      nullable
    >
      <Container
        isVertical
        label={label}
        inline={inline}
        labelWidth={labelWidth}
        labelAppend={labelAppend}
        isRequired={isRequired}
        info={info}
        width={width}
        className="ax-field__list"
      >
        <FieldWrapper
          error={error}
          className={className}
          isInvalid={isInvalid}
          disabled={isDisabled}
          onClear={() => handleChange()}
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
              value={query}
              placeholder={placeholder}
              readOnly={!isEditable && !allowCreate}
              data-invalid={isInvalid}
              className="ax-field__input rounded-b-none"
              autoComplete="off"
              onKeyDown={handleKeyPress}
              onChange={(e) => onQueryChange(e.target.value)}
              onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
              {...rest}
            />
          </div>
          {children}
        </FieldWrapper>
        <Combobox.Options
          className="ax-select__dropdown relative shadow-none rounded-t-none mx-px"
          static
          hold
          style={{
            minHeight,
            maxHeight,
          }}
        >
          <Options
            query={query}
            options={list ?? EMPTY_ARRAY}
            renderer={renderer}
            allowCreate={allowCreate}
            labelProperty={labelProperty}
          />
        </Combobox.Options>
      </Container>
    </Combobox>
  );
};
ListInput.displayName = "AxField.List";

const GenericMemo: <T>(c: T) => T = memo;

export const List = GenericMemo(ListInput);
