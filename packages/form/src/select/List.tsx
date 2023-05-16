/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isArray, isEmpty } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import { Combobox } from "@headlessui/react";
import {
  Fragment,
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
  type FocusEvent,
} from "react";
import { FieldWrapper } from "../inputs/Wrapper";
import { EMPTY_ARRAY } from "../types";
import { Options } from "./Option";
import { useSelect } from "./useSelect";
import { defaultMatcher, getValue, type TagProps } from "./utils";

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
  minHeight,
  maxHeight,
  ...rest
}: Omit<TagProps<T>, "makeLabel"> & {
  multiple?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
}) => {
  const [_actualValue, setActualValue] = useState<T[]>(EMPTY_ARRAY);
  const [, startTransition] = useTransition();
  const actualValue = useDeferredValue(_actualValue);
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
          onChange != null &&
            startTransition(() =>
              onChange(
                options.map((value: AnyObject) =>
                  getValue(value, valueProperty)
                )
              )
            );
          setActualValue(options);
          onQueryChange("");
        }
      });
    },
    [onChange, valueProperty, query]
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
          value={query}
          placeholder={placeholder}
          readOnly={!allowCreate}
          data-invalid={isInvalid}
          className="ax-field__input rounded-b-none"
          autoComplete="off"
          onKeyDown={handleEnter(onEnterPressed)}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
          {...rest}
        />
        {children}
      </FieldWrapper>
      <Combobox.Options
        className="ax-select__dropdown relative min-h-[12rem] max-h-[24rem] shadow-none rounded-t-none mx-px"
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
    </Combobox>
  );
};
ListInput.displayName = "AxField.List";

const GenericMemo: <T>(c: T) => T = memo;

export const List = GenericMemo(ListInput);
