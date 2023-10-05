/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import {
  memo,
  useCallback,
  useEffect,
  useMemo,
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
    value,
    defaultValue,
    ...props
  }: SearchProps) => {
    const [query, setQuery] = useState(defaultValue);

    useEffect(() => {
      setQuery(value ?? "");
    }, [value]);

    const debounceChange = useMemo(
      () => debounce((q) => onChange?.(q), 100),
      [onChange]
    );

    const handleChange = useCallback(
      (value?: string) => {
        setQuery(value);
        debounceChange(value);
      },
      [debounceChange]
    );

    const handleQuery = useCallback(() => {
      onSearch?.(query);
    }, [query]);

    return (
      <Text
        {...props}
        allowClear
        type="search"
        value={query}
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
