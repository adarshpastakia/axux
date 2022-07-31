/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxPopover } from "@axux/core";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";
import { FilterByQuery } from "../types";

export const QueryView = ({
  query,
  index,
}: FilterByQuery & { index: number }) => {
  const { removeFilter } = useSearchContext();
  const { t } = useTranslation("searchbar");

  const view = useMemo(() => JSON.stringify(query, null, 2), [query]);

  return (
    <div className="p-2">
      <pre className="overflow-auto border border-bw-500/50 shadow-inner text-sm p-4 max-h-[24rem] max-w-[48rem] min-w-[24rem]">
        {view}
      </pre>
      <AxPopover.Dismiss>
        <AxButton
          size="sm"
          style="link"
          color="danger"
          onClick={() => removeFilter(index)}
        >
          {t("label.remove")}
        </AxButton>
      </AxPopover.Dismiss>
    </div>
  );
};