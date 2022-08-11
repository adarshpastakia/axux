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
  FC,
  FocusEvent,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { FieldWrapper } from "../inputs/Wrapper";
import { Options } from "./Option";
import { SelectProps } from "./utils";

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
    | "onChange"
    | "onSelect"
    | "onCreateOption"
  > {
  options?: SuggestItem[];
  defaultItems?: SuggestItem[];
  onClear?: () => void;
  onClick?: (item: SuggestItem) => void;
  onSelect?: (value: string) => void;
}

export const SuggestInput: FC<SuggestProps> = ({
  label,
  labelAppend,
  isRequired,
  placeholder,
  options = [],
  onClear,
  onSelect,
  onQuery,
  onClick,
  inputRef,
  isInvalid,
  className,
  value,
  // @ts-ignore
  name,
  info,
  error,
  width,
  isDisabled,
  isReadOnly,
  allowClear,
  children,
  defaultItems = [],
  ...rest
}) => {
  const { t } = useTranslation("form");
  const [actualValue, setActualValue] = useState(value);
  const [items, setItems] = useState<(SuggestItem | string)[]>([]);
  const [queryItems, setQueryItems] = useState<(SuggestItem | string)[]>([]);

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
        Promise.resolve(ret).then((resp) => resp && setQueryItems(resp));
      }),
    [onQuery]
  );

  const selectCallback = useMemo(
    () => debounce((query: string) => onSelect?.(query), 100),
    [onSelect]
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

  /******************* change actualValue *******************/
  const handleQueryChange = useCallback(
    (newValue = "") => {
      setActualValue(newValue);
      queryCallback(newValue);
    },
    [queryCallback]
  );
  const handleSelectChange = useCallback(
    (newValue = "") => {
      if (newValue.startsWith("default_")) {
        setActualValue("");
        selectCallback("");
      } else {
        setActualValue(newValue);
        selectCallback(newValue);
      }
    },
    [queryCallback]
  );

  return (
    <Combobox
      value={actualValue}
      onChange={(e: AnyObject) => handleSelectChange(e.value ?? e)}
      disabled={isDisabled}
      name={name}
      as={Fragment}
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
        onClear={() => (setActualValue(""), onClear?.())}
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
          disabled={isDisabled}
          data-invalid={isInvalid}
          className="ax-field__input"
          autoComplete="off"
          onKeyDown={handleEnter(() => selectCallback(actualValue))}
          onChange={(e) => handleQueryChange(e.target.value)}
          onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
          {...rest}
        />
        {children}
      </FieldWrapper>
      {createPortal(
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
          {defaultItems.length > 0 &&
            defaultItems.map((item: AnyObject, index) => (
              <Combobox.Option
                value={`default_${index}`}
                onClick={() => onClick?.(item)}
              >
                {({ active, selected }) => (
                  <div
                    className="ax-select__option"
                    data-selected={selected}
                    data-active={active}
                  >
                    {itemRenderer(item)}
                  </div>
                )}
              </Combobox.Option>
            ))}
        </Combobox.Options>,
        document.body
      )}
    </Combobox>
  );
};
SuggestInput.displayName = "AxField.Select";

const GenericMemo: <T>(c: T) => T = memo;

export const Suggest = GenericMemo(SuggestInput);
