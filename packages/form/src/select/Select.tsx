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
import { Listbox } from "@headlessui/react";
import {
  Fragment,
  memo,
  type ReactNode,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FieldWrapper } from "../inputs/Wrapper";
import { Icons } from "../types/icons";
import { defaultMatcher, getLabel, getValue, type SelectProps } from "./utils";

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
  usePortal,
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
  ...rest
}: Omit<SelectProps<T>, "makeLabel" | "allowCreate"> & {
  makeLabel?: (item: T) => ReactNode;
}) => {
  const { t } = useTranslation("form");
  const [_actualValue, setActualValue] = useState<T>("" as AnyObject);
  const [, startTransition] = useTransition();
  const actualValue = useDeferredValue(_actualValue);

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
    if (value && !val) val = value;
    setActualValue(val ?? "");
  }, [value, valueProperty, options]);

  /** ***************** change actualValue *******************/
  const handleChange = useCallback(
    (option?: T) => {
      void Promise.resolve(option && onSelect?.(option)).then((b) => {
        if (b !== false) {
          onChange != null &&
            startTransition(() => onChange(getValue(option, valueProperty)));
          setActualValue(option ?? ("" as AnyObject));
        }
      });
    },
    [onChange, valueProperty]
  );

  /** ***************** display label *******************/
  const displayLabel = useMemo(() => {
    if (makeLabel != null && !isEmpty(actualValue))
      return makeLabel(actualValue);
    return getLabel(actualValue, labelProperty);
  }, [makeLabel, labelProperty, actualValue]);

  /** ***************** make select option *******************/
  const makeOption = useCallback(
    (option: AnyObject, index: number) => (
      <Listbox.Option value={option} key={index}>
        {({ active, selected }) => (
          <div
            className="ax-select__option"
            data-selected={selected}
            data-active={active}
          >
            {renderer != null
              ? renderer(option)
              : getLabel(option, labelProperty)}
          </div>
        )}
      </Listbox.Option>
    ),
    [renderer, labelProperty]
  );

  const optionDropdown = useMemo(
    () => (
      <Listbox.Options
        ref={setPopperElement as AnyObject}
        className="ax-select__dropdown"
        style={styles.popper}
      >
        {options.map((option: AnyObject, index) =>
          option.items ? (
            <Fragment key={index}>
              <div className="ax-select__group">{option.label}</div>
              {option.items.map(makeOption)}
            </Fragment>
          ) : (
            makeOption(option, index)
          )
        )}
        {options.length === 0 && (
          <div className="ax-select__empty">{t("select.emptyList")}</div>
        )}
      </Listbox.Options>
    ),
    [options, makeOption, styles]
  );

  return (
    <Listbox
      value={actualValue}
      onChange={handleChange}
      disabled={isDisabled}
      name={name}
      as={Fragment}
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
            <div
              data-align="end"
              className="ax-field__addon ax-select__handle pointer-events-none"
            >
              <AxIcon icon={Icons.iconDropdown} />
            </div>
            <Listbox.Button className="absolute inset-0 opacity-0" />
            <span ref={inputRef} className="ax-field__input truncate">
              {displayLabel}
              {!displayLabel && (
                <span className="text-muted">{placeholder}&nbsp;</span>
              )}
            </span>
            {children}
          </FieldWrapper>
          {open && <div className="fixed inset-0" />}
          {usePortal && createPortal(optionDropdown, document.body)}
          {!usePortal && optionDropdown}
        </Fragment>
      )}
    </Listbox>
  );
};
SelectInput.displayName = "AxField.Select";

const GenericMemo: <T>(c: T) => T = memo;

export const Select = GenericMemo(SelectInput);
