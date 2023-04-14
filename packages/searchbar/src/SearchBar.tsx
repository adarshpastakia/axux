/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC } from "react";
import { SearchContextProvider } from "./context";
import { FilterWrapper } from "./filterbar/FilterWrapper";
import { SearchWrapper } from "./searchbar/SearchWrapper";
import { type FilterProps, type SearchProps } from "./types";

export const AxSearchBar: FC<SearchProps & FilterProps> = ({
  append,
  prepend,
  actions,
  hideFilters,
  ...props
}) => {
  return (
    <SearchContextProvider {...props}>
      <SearchWrapper
        append={append}
        prepend={prepend}
        actions={actions}
        hideFilters={hideFilters}
      />
      {!hideFilters && <FilterWrapper />}
    </SearchContextProvider>
  );
};
