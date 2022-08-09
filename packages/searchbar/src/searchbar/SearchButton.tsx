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
  const { isDirty, handleSearch } = useSearchContext();

  return (
    <AxButton
      color={isDirty ? "warning" : "primary"}
      style="solid"
      onClick={handleSearch}
    >
      {t(isDirty ? "label.update" : "label.refresh")}
    </AxButton>
  );
};
