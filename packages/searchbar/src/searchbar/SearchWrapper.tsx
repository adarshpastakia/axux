/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { AxField } from "@axux/form";
import { FC } from "react";
import { SearchProps } from "../types";
import { Icons } from "../types/icons";
import { FilterButton } from "./FilterButton";
import { SearchButton } from "./SearchButton";
import { SearchInput } from "./SearchInput";

export const SearchWrapper: FC<Partial<SearchProps>> = ({
  append,
  prepend,
  actions,
  hideFilters,
}) => {
  return (
    <AxField.Container className="ax-searchbar">
      {!hideFilters && <FilterButton />}
      {prepend}
      <SearchInput />
      <SearchButton />
      {append}
      {actions && (
        <AxButton.Dropdown style="link" showCaret={false} icon={Icons.iconMenu}>
          {actions}
        </AxButton.Dropdown>
      )}
    </AxField.Container>
  );
};
