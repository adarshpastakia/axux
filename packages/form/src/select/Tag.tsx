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
import { handleEnter } from "@axux/utilities/dist/handlers";
import { Combobox } from "@headlessui/react";
import {
  FocusEvent,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";
import { FieldWrapper } from "../inputs/Wrapper";
import { Icons } from "../types/icons";
import { Options } from "./Option";
import { useSelect } from "./useSelect";
import {
  CreatePlaceholder,
  defaultMatcher,
  getLabel,
  getValue,
  TagProps,
} from "./utils";

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
  const { flatList, list, query, createOption, onQueryChange } = useSelect({
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
    setActualValue(
      (value ?? [])
        .map((val) => {
          const ret = matcher
            ? flatList.find((option) => matcher(option, val))
            : flatList.find((option) =>
                defaultMatcher(option, val, valueProperty)
              );
          if (ret) return ret;
          if (allowCreate) return createOption(val);
          return null;
        })
        .filter(Boolean)
    );
  }, [value, valueProperty, flatList, allowCreate]);

  /******************* change actualValue *******************/
  const handleChange = useCallback(
    (options: T[] = []) => {
      onQueryChange("");
      const newValue = options.map((option) =>
        option === CreatePlaceholder ? createOption(query) : option
      );
      setActualValue(newValue);
      onSelect && newValue && startTransition(() => onSelect(newValue));
      onChange &&
        startTransition(() =>
          onChange(newValue.map((value) => getValue(value, valueProperty)))
        );
      setTimeout(() => forceUpdate?.(), 100);
    },
    [onChange, createOption, forceUpdate, valueProperty, query]
  );

  /******************* display label *******************/
  const displayLabel = useCallback(
    (option: T) => {
      if (makeLabel && actualValue) return makeLabel(option);
      return getLabel(option, labelProperty);
    },
    [makeLabel, labelProperty]
  );

  return (
    <Combobox
      value={actualValue}
      onChange={handleChange}
      disabled={isDisabled}
      name={name}
      as={Fragment}
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
              onRemove={() => undefined}
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
            onKeyDown={handleEnter(onEnterPressed)}
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
