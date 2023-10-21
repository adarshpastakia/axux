/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  type FC,
} from "react";
import { Addon } from "./Addon";
import { Text, type TextProps } from "./Text";

export interface SearchProps
  extends Omit<TextProps, "type" | "allowClear" | "onEnterPressed"> {
  icon?: string;
  defaultValue?: string;
  isSearching?: boolean;
  /**
   * search callback
   */
  onSearch?: (query?: string) => void;
}

// eslint-disable-next-line react/display-name
export const Search: FC<SearchProps> = memo(
  ({
    children,
    icon,
    isSearching,
    onChange,
    onSearch,
    value: _value,
    defaultValue,
    ...props
  }: SearchProps) => {
    const [query, setQuery] = useState(defaultValue);
    const value = useDeferredValue(query);

    useEffect(() => {
      setQuery(_value ?? "");
    }, [_value]);

    const handleChange = useCallback(
      (value?: string) => {
        setQuery(value);
        onChange?.(value);
      },
      [onChange]
    );

    const handleQuery = useCallback(() => {
      onSearch?.(value);
    }, [value]);

    return (
      <Text
        {...props}
        allowClear
        type="search"
        value={value}
        onChange={handleChange}
        onEnterPressed={handleQuery}
      >
        <Addon
          showSpinner={isSearching}
          icon={icon ?? AppIcons.iconFilter}
          className="text-muted"
        />
        {children}
        <Addon align="end">
          <AxButton
            variant="link"
            noTabFocus
            icon={AppIcons.iconSearch}
            onClick={handleQuery}
          />
        </Addon>
      </Text>
    );
  }
);
