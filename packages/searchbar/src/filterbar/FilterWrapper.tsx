/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useSearchContext } from "../context";
import { AddFilter } from "./AddFilter";
import { FilterTag } from "./FilterTag";
import { GlobalMenu } from "./GlobalMenu";

export const FilterWrapper = () => {
  const { showFilters, filters, fields, isEditable } = useSearchContext();

  if (!showFilters) return null;

  return (
    <div className="ax-filterbar">
      <GlobalMenu />

      <div className="ax-filter__wrapper">
        {filters
          .sort((a) => (a.isGlobal === true ? -1 : 1))
          .map((filter, index) => (
            <FilterTag {...filter} index={index} key={index} />
          ))}
        {isEditable && fields.length > 0 && <AddFilter />}
      </div>
    </div>
  );
};
