/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";

export const FilterButton = () => {
  const { t } = useTranslation("searchbar");
  const { showFilters, setShowFilters, filters } = useSearchContext();
  return (
    // @ts-ignore
    <AxButton
      color="accent"
      style="outline"
      className="ax-filterButton"
      data-enabled={showFilters}
      onClick={() => setShowFilters(!showFilters)}
    >
      <span>{t("label.filters")}&nbsp;</span>
      <span className="ax-filterButton__count" data-active={showFilters}>
        {filters.length}
      </span>
    </AxButton>
  );
};
