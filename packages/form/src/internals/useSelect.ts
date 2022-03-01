// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { ascii, debounce, isEqual, isNil, isObject } from "@axux/utilities";
import {
  ChangeEvent,
  KeyboardEvent,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { OptionProps, SelectCommonProps } from "../types";

/** TODO
 * Badly implemented, rethink refactoring and maintaining copy of options list
 * match multiple tags by value order and not option list order
 * implement arrow keys
 */

/** @internal */
export const useSelect = <T = KeyValue>(
  props: SelectCommonProps<T> & {
    value: AnyObject;
    allowCustom?: boolean;
    onChange?: (value?: AnyObject) => void;
    multiple?: boolean;
    autoFocus?: boolean;
  }
) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    options = [],
    onQuery,
    makeOption,
    value,
    allowCustom,
    matcher,
    asObject,
    onChange,
    onSelect,
    multiple,
    onEnterPressed,
    iconProperty = "icon",
    badgeProperty = "badge",
    labelProperty = "label",
    valueProperty = "value"
  } = props;

  const [isQuerying, setQuerying] = useState(false);

  /**
   * Default option prop maker
   */
  const refactorOption = useCallback(
    (option: KeyValue | string): OptionProps<T> => {
      if (!isNil(option)) {
        if (makeOption) {
          return {
            ...makeOption(option as T),
            raw: option as T
          };
        }
        return {
          raw: option as T,
          value: isObject(option) ? option[valueProperty] : option,
          color: isObject(option) ? option.color : undefined,
          label: isObject(option) ? option[labelProperty] ?? option[valueProperty] : option,
          icon: isObject(option) ? option[iconProperty] : undefined,
          badge: isObject(option) ? option[badgeProperty] : undefined
        };
      }
      return { label: "", value: "" };
    },
    [iconProperty, badgeProperty, labelProperty, valueProperty, makeOption]
  );

  /**
   * Default value matcher
   */
  const matchOption = useCallback(
    (option, value) => {
      if (matcher) {
        return matcher(value as T, option.raw);
      } else {
        const _value = isObject(value) ? (value as KeyValue)[valueProperty] : value;
        return option.value === _value;
      }
    },
    [matcher, valueProperty]
  );

  const [originalList, setOriginalList] = useState<AnyObject[]>([]);
  const [defaultOptions, setDefaultOptions] = useState<AnyObject[]>([]);

  useEffect(() => {
    if (!isEqual(options, originalList)) setOriginalList(options);
  }, [options, originalList]);
  /**
   * Default list of select options
   */
  useEffect(() => {
    setDefaultOptions(
      [...originalList.map(refactorOption)].sort((a, b) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase())
      )
    );
  }, [originalList, refactorOption]);

  /**
   * Stateful list of select options
   */
  const [innerOptions, setOptions] = useState<AnyObject[]>([]);
  /**
   * Initialize options list state
   */
  useEffect(() => {
    setOptions(defaultOptions);
  }, [defaultOptions]);

  /**
   * Perform search query
   */
  const performQuery = useCallback(
    (query: string) => {
      setQuerying(true);
      if (onQuery) {
        const response = onQuery(query);
        if (response instanceof Promise) {
          response.then((resp) => {
            setOptions(resp.map(refactorOption));
            setQuerying(false);
          });
        } else if (Array.isArray(response)) {
          setOptions(response.map(refactorOption));
          setQuerying(false);
        }
      } else {
        setOptions(
          !!query
            ? defaultOptions.filter((opt) =>
                ascii(opt.label).toLowerCase().includes(ascii(query).toLowerCase())
              )
            : defaultOptions
        );
        setQuerying(false);
      }
    },
    [defaultOptions, refactorOption, onQuery]
  );

  const queryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setOpen(true);
    debounce(() => performQuery(query), 250);
  };

  /**
   * Match wrapper for single/multiple values
   */
  const tryMatchValue = useCallback(
    (val) => {
      if (defaultOptions.length === 0) return multiple ? [] : "";
      return multiple
        ? ((val || []) as AnyObject).map(
            (v: T) => defaultOptions.find((opt) => matchOption(opt, v)) ?? refactorOption(v)
          ) ?? []
        : defaultOptions.find((opt) => matchOption(opt, val));
    },
    [multiple, defaultOptions, matchOption]
  );

  /**
   * Get input label
   */
  const inputLabel = useMemo(() => {
    if (multiple) {
      return tryMatchValue(value);
    } else {
      let _value;
      if (isObject(value)) {
        _value = refactorOption(value as T);
      } else {
        _value = tryMatchValue(value);
      }
      inputRef.current && (inputRef.current.value = _value ? _value.label : "");
      return _value ? _value.label : "";
    }
  }, [multiple, refactorOption, tryMatchValue, value]);

  const resetList = useCallback(
    (_options?: AnyObject) => {
      setOptions(_options ?? defaultOptions);
      if (inputRef.current) {
        inputRef.current.value = multiple ? "" : inputRef.current.defaultValue;
      }
    },
    [defaultOptions, multiple]
  );

  const createOption = useCallback(
    (newValue: string) => {
      const _options = [...defaultOptions, refactorOption(newValue)].sort((a, b) =>
        a.label.toLowerCase().localeCompare(b.label.toLowerCase())
      );
      setDefaultOptions(_options);
      onChange && onChange([...((value as AnyObject) ?? []), newValue]);
      if (inputRef.current) {
        resetList(_options);
        inputRef.current.focus();
      }
    },
    [defaultOptions, onChange, refactorOption, resetList, value]
  );

  /**
   * Handle item click
   */
  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const target = e.target as HTMLElement;
      if (target.dataset.value) {
        const _value = innerOptions[parseInt(target.dataset.value)];
        if (_value) {
          onSelect && onSelect(_value.raw);
          if (multiple) {
            onChange &&
              onChange([...((value as AnyObject) ?? []), asObject ? _value.raw : _value.value]);
          } else {
            onChange && onChange(asObject ? _value.raw : _value.value);
          }
          if (inputRef.current) {
            resetList();
            inputRef.current.focus();
          }
        }
      }
    },
    [innerOptions, onSelect, multiple, onChange, value, asObject, resetList]
  );

  /**
   * Handler remove tag item
   */
  const handleRemove = useCallback(
    (index: number) => {
      const _values: AnyObject[] = [...((value as AnyObject) ?? [])];
      _values.splice(index, 1);
      onChange && onChange(_values);
      inputRef.current && inputRef.current.focus();
    },
    [onChange, value]
  );

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const code = e.key;
      const target = e.target as HTMLInputElement;
      if (multiple && code === "Backspace" && target.value === "") {
        const _values: AnyObject[] = [...((value as AnyObject) ?? [])];
        _values.splice(-1);
        onChange && onChange(_values);
      } else if (code === "Enter") {
        if (multiple && !!target.value) {
          allowCustom && createOption(target.value);
        } else {
          onEnterPressed && onEnterPressed();
        }
      }
    },
    [multiple, value, onChange, onEnterPressed]
  );

  const [isOpen, setOpen] = useState(false);

  const isSelected = useCallback(
    (opt) => {
      return multiple
        ? !!(value as AnyObject[]).find((val) => matchOption(opt, val))
        : matchOption(opt, value);
    },
    [matchOption, multiple, value]
  );

  return {
    isOpen,
    setOpen,
    inputRef,
    inputLabel,
    isQuerying,
    innerOptions,
    queryHandler,
    handleClick,
    handleRemove,
    handleKey,
    resetList,
    createOption,
    isSelected
  };
};
