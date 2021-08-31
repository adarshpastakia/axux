// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxIcon } from "@axux/core";
import { IconProps } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, memo, useEffect, useState } from "react";
import { AxAddon } from "./Addon";
import { AxTextField, TextFieldProps } from "./Text";

/** @internal */
export interface SearchFieldProps
  extends IconProps,
    Omit<TextFieldProps, "type" | "onChange" | "onEnterPressed"> {
  /**
   * Search button icon
   */
  searchIcon?: IconProps["icon"];
  /**
   * Search handler
   */
  onSearch?: (value: string) => void;
}

/**
 * Search box input field
 * @internal
 */
export const AxSearchField: FC<SearchFieldProps> = memo(
  ({
    children,
    icon = AppIcons.iconConsole,
    searchIcon = AppIcons.iconSearch,
    onSearch,
    value: _value,
    ...props
  }) => {
    const [value, setValue] = useState(_value ?? "");
    useEffect(() => {
      setValue(_value ?? "");
    }, [_value]);

    return (
      <AxTextField
        {...props}
        value={value}
        type="search"
        onChange={(v) => setValue(v ?? "")}
        onEnterPressed={() => value && onSearch && onSearch(value)}
      >
        {icon !== "blank" && (
          <AxAddon>
            <AxIcon icon={icon} color="muted" className="flippable" />
          </AxAddon>
        )}
        {children}
        <div className="ax-field__handle">
          <AxButton
            color="primary"
            type="link"
            isDisabled={!value || props.isDisabled}
            icon={searchIcon}
            onClick={() => onSearch && onSearch(value)}
          />
        </div>
      </AxTextField>
    );
  }
);
