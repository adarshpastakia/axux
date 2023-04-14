/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDivider } from "@axux/core";
import { usePopover } from "@axux/core/dist/hooks/usePopover";
import { debounce, isEmpty } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import { Combobox } from "@headlessui/react";
import {
  type FC,
  type FocusEvent,
  Fragment,
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { FieldWrapper } from "../inputs/Wrapper";
import { Options } from "./Option";
import { type SelectProps } from "./utils";

export type SuggestItem =
  | {
      value: string;
      label: string;
      info?: string;
    }
  | string;

export interface SuggestProps
  extends Omit<
    SelectProps<SuggestItem>,
    | "options"
    | "allowCreate"
    | "isEditable"
    | "labelProperty"
    | "valueProperty"
    | "matcher"
    | "renderer"
    | "makeLabel"
    | "onCreateOption"
  > {
  options?: SuggestItem[];
  defaultItems?: SuggestItem[];
}

export const SuggestInput: FC<SuggestProps> = ({
  label,
  labelAppend,
  isRequired,
  placeholder,
  options = [],
  onSelect,
  onChange,
  onQuery,
  onEnterPressed,
  usePortal,
  inputRef,
  isInvalid,
  className,
  value,
  // @ts-expect-error ignore
  name,
  info,
  error,
  width,
  isDisabled,
  isReadOnly,
  allowClear,
  inline,
  labelWidth,
  children,
  defaultItems = [],
  ...rest
}) => {
  const [_actualValue, setActualValue] = useState(value);
  const [items, setItems] = useState<Array<SuggestItem | string>>([]);
  const [queryItems, setQueryItems] = useState<Array<SuggestItem | string>>([]);
  const actualValue = useDeferredValue(_actualValue);

  useEffect(() => {
    setActualValue(value);
  }, [value]);
  useEffect(() => {
    setItems(options);
  }, [options]);

  const { styles, setPopperElement, setReferenceElement } = usePopover({
    hideArrow: true,
    sameWidth: true,
    placement: "bottom-start",
  });

  const queryCallback = useMemo(
    () =>
      debounce((query: string) => {
        const ret = onQuery?.(query);
        void Promise.resolve(ret).then(
          (resp) => resp != null && setQueryItems(resp)
        );
      }),
    [onQuery]
  );

  const itemRenderer = useCallback(
    (item: AnyObject) => (
      <div>
        <label className="block">{item.label ?? item.value ?? item}</label>
        {item.info && <small>{item.info}</small>}
      </div>
    ),
    []
  );

  const itemList = useMemo(() => {
    const list = [];
    actualValue && list.push(actualValue);
    list.push(
      ...items.filter((it: AnyObject) => (it.value ?? it) !== actualValue)
    );
    return list;
  }, [items, actualValue]);

  /** ***************** change actualValue *******************/
  const handleQueryChange = useCallback(
    (newValue = "") => {
      setActualValue(newValue);
      queryCallback(newValue);
    },
    [queryCallback]
  );
  const handleSelectChange = useCallback(
    (newValue: AnyObject = "") => {
      void Promise.resolve(onSelect?.(newValue)).then((b) => {
        if (b !== false) {
          onChange?.(newValue.value ?? newValue);
          setActualValue(newValue.value ?? newValue);
        }
      });
    },
    [queryCallback]
  );

  const optionDropdown = useMemo(
    () => (
      <Combobox.Options
        ref={setPopperElement as AnyObject}
        className="ax-select__dropdown"
        style={styles.popper}
      >
        <Options options={itemList} renderer={itemRenderer} />
        {queryItems.length > 0 && (
          <Fragment>
            <AxDivider size="xs" />
            <Options hideEmpty options={queryItems} renderer={itemRenderer} />
          </Fragment>
        )}
        {defaultItems.length > 0 && <AxDivider size="xs" />}
        {defaultItems.length > 0 && (
          <Options hideEmpty options={defaultItems} renderer={itemRenderer} />
        )}
      </Combobox.Options>
    ),
    [styles, itemList, itemRenderer, queryItems, defaultItems]
  );

  return (
    <Combobox
      value={actualValue}
      onChange={(e: AnyObject) => handleSelectChange(e)}
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
            onClear={() => handleSelectChange("")}
            wrapperRef={setReferenceElement as AnyObject}
            canClear={!isEmpty(actualValue)}
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
              data-invalid={isInvalid}
              className="ax-field__input"
              autoComplete="off"
              onChange={(e) => handleQueryChange(e.target.value)}
              onKeyDown={!open ? handleEnter(onEnterPressed) : undefined}
              onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
              {...rest}
            />
            {children}
          </FieldWrapper>
          {open && <div className="fixed inset-0" />}
          {usePortal && createPortal(optionDropdown, document.body)}
          {!usePortal && optionDropdown}
        </Fragment>
      )}
    </Combobox>
  );
};
SuggestInput.displayName = "AxField.Suggest";

const GenericMemo: <T>(c: T) => T = memo;

export const Suggest = GenericMemo(SuggestInput);
