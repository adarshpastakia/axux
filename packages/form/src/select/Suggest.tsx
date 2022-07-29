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
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { FieldWrapper } from "../inputs/Wrapper";
import { Options } from "./Option";
import { SelectProps } from "./utils";

type SuggestItem = {
  value: string;
  info?: string;
};

export interface SuggestProps
  extends Omit<
    SelectProps<SuggestItem>,
    | "value"
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
  defaultItems?: SuggestItem[];
  onSearch: (value: string) => void;
}

export const SuggestInput: FC<SuggestProps> = ({
  label,
  labelAppend,
  isRequired,
  placeholder,
  options,
  autoFocus,
  onSearch,
  onQuery,
  inputRef,
  isInvalid,
  className,
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
  const [actualValue, setActualValue] = useState("");
  const [items, setItems] = useState<SuggestItem[]>([]);

  const { styles, setPopperElement, setReferenceElement } = usePopover({
    hideArrow: true,
    sameWidth: true,
    placement: "bottom-start",
  });

  const queryCallback = useMemo(
    () =>
      debounce((query: string) => {
        const ret = onQuery?.(query);
        Promise.resolve(ret).then((resp) => setItems(resp ?? []));
      }),
    [onQuery]
  );

  const searchCallback = useMemo(
    () => debounce((query: string) => onSearch(query), 100),
    [onSearch]
  );

  /******************* change actualValue *******************/
  const handleChange = useCallback(
    (newValue = "") => {
      setActualValue(newValue);
      queryCallback(newValue);
    },
    [queryCallback]
  );

  return (
    <Combobox
      value={actualValue}
      onChange={(e: AnyObject) => (
        setActualValue(e.value ?? e), searchCallback(e.value ?? e)
      )}
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
        onClear={() => (setActualValue(""), onSearch(""))}
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
          data-invalid={isInvalid}
          className="ax-field__input"
          autoComplete="off"
          onKeyDown={handleEnter(() => searchCallback(actualValue))}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={(e: FocusEvent<HTMLInputElement>) => e.target.select()}
          {...rest}
        />
        {children}
      </FieldWrapper>
      <Combobox.Options
        ref={setPopperElement as AnyObject}
        className="ax-select__dropdown"
        style={styles.popper}
      >
        {actualValue && (
          <Fragment>
            <Options hideEmpty options={[actualValue]} />
            <AxDivider size="xs" />
          </Fragment>
        )}
        {items.length > 0 && (
          <Options
            hideEmpty
            options={items}
            renderer={(item) => (
              <div>
                <label className="block">{item.value}</label>
                {item.info && <small>{item.info}</small>}
              </div>
            )}
          />
        )}
        {items.length > 0 && defaultItems.length > 0 && <AxDivider size="xs" />}
        {defaultItems.length > 0 && (
          <Options
            hideEmpty
            options={defaultItems}
            renderer={(item) => (
              <div>
                <label className="block">{item.value}</label>
                {item.info && <small>{item.info}</small>}
              </div>
            )}
          />
        )}
      </Combobox.Options>
    </Combobox>
  );
};
SuggestInput.displayName = "AxField.Select";

const GenericMemo: <T>(c: T) => T = memo;

export const Suggest = GenericMemo(SuggestInput);
