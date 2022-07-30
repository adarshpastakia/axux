/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxField } from "@axux/form";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";
import { Icons } from "../types/icons";

export const SearchInput = () => {
  const { t } = useTranslation("searchbar");
  const {
    defaultQueryList = [],
    query,
    history,
    updateQuery,
    onQuery,
  } = useSearchContext();

  return (
    <AxField.Suggest
      placeholder={t("placeholder")}
      onSearch={updateQuery}
      value={query ?? ""}
      options={history}
      onQuery={onQuery as AnyObject}
      defaultItems={defaultQueryList as AnyObject}
    >
      <AxField.Addon className="text-muted" icon={Icons.iconConsole} />
    </AxField.Suggest>
  );
};
