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
    <AxButton
      color="accent"
      variant="outline"
      className="ax-filterButton"
      data-enabled={showFilters}
      badge={{
        value: filters.length,
        color: showFilters ? "accent" : undefined,
      }}
      onClick={() => setShowFilters(!showFilters)}
    >
      {t("label.filters")}
    </AxButton>
  );
};
