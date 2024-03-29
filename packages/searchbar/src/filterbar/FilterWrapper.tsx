/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC } from "react";
import { useSearchContext } from "../context";
import { type FilterProps } from "../types";
import { AddFilter } from "./AddFilter";
import { FilterTag } from "./FilterTag";
import { GlobalMenu } from "./GlobalMenu";

export const FilterWrapper: FC<Partial<FilterProps>> = () => {
  const { showFilters, filters, fields, isEditable } = useSearchContext();

  if (!showFilters) return null;

  return (
    <div className="ax-filterbar">
      <GlobalMenu />

      <div className="ax-filter__wrapper">
        {filters.map((filter, index) => (
          <FilterTag {...filter} index={index} key={index} />
        ))}
        {isEditable && fields.length > 0 && <AddFilter />}
      </div>
    </div>
  );
};
