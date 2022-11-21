/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxPopover, AxText } from "@axux/core";
import { isArray } from "@axux/utilities";
import { Fragment, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";
import { EnumOperator, FilterObject } from "../types";

export const QueryView = ({
  index,
  ...filter
}: FilterObject & { index: number }) => {
  const { removeFilter } = useSearchContext();
  const { t } = useTranslation("searchbar");

  const view = useMemo(() => {
    if (filter.type === "query") return JSON.stringify(filter.query, null, 2);

    if (filter.type === "filter") {
      let value = filter.value?.toString();

      if (filter.operator === EnumOperator.BETWEEN && isArray(filter.value)) {
        value = `[${filter.value?.join(" - ")}]`;
      }

      if (filter.operator === EnumOperator.IN && isArray(filter.value)) {
        value = `[${filter.value?.join(", ")}]`;
      }

      return (
        <Fragment>
          {filter.isNegative && <b>NOT&nbsp;</b>}
          <span>{filter.field}</span>
          <b>&nbsp;{t(`operator.${filter.operator}`)}&nbsp;</b>
          <div>{value}</div>
        </Fragment>
      );
    }
    return "";
  }, [filter]);

  return (
    <div className="p-2 bg-component relative">
      {filter.type === "query" && (
        <AxText.Copy
          size="sm"
          text={view as AnyObject}
          className="absolute top-2 ltr:right-2 rtl:left-2 z-10"
        />
      )}
      <pre className="overflow-auto bg-base border border-bw-500/50 shadow-inner text-sm p-2 max-h-[24rem] max-w-[48rem] min-w-[24rem]">
        {view}
      </pre>
      <AxPopover.Dismiss>
        <AxButton
          size="sm"
          variant="link"
          color="danger"
          onClick={() => removeFilter(index)}
        >
          {t("label.remove")}
        </AxButton>
      </AxPopover.Dismiss>
    </div>
  );
};
