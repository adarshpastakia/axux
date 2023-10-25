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

export const SearchButton = () => {
  const { t } = useTranslation("searchbar");
  const { query, isDirty, handleSearch } = useSearchContext();

  return (
    <AxButton
      color={isDirty ? "warning" : "primary"}
      variant="solid"
      className="z-20"
      onClick={() => handleSearch(query)}
    >
      {t(isDirty ? "label.update" : "label.refresh")}
    </AxButton>
  );
};
