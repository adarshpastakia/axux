/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxContent, AxHeader, AxPanel, AxPopover, AxTitle } from "@axux/core";
import { AxField } from "@axux/form";
import { Fragment, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";
import { type FilterObject } from "../types";
import { FilterForm } from "./FilterForm";
import { FilterMenu } from "./FilterMenu";
import { QueryView } from "./QueryView";

export const FilterTag = memo(
  ({ index, ...filter }: FilterObject & { index: number }) => {
    const { t } = useTranslation("searchbar");
    const { updateFilter, removeFilter } = useSearchContext();

    const label = useMemo(() => {
      if (filter.type === "query")
        return (
          <Fragment>
            <span>{filter.label}</span>
          </Fragment>
        );
      if (filter.label) return filter.label;

      return (
        <Fragment>
          <span>{filter.field}</span>
          <b>&nbsp;{t(`operator.${filter.operator}`)}&nbsp;</b>
          <span>{filter.value?.toString()}</span>
        </Fragment>
      );
    }, [filter]);

    return (
      <AxPopover placement="bottom-start" isDisabled={filter.isScope}>
        <div
          className="ax-filter__tag"
          data-disabled={filter.isDisabled}
          data-global={filter.isGlobal}
          data-scope={filter.isScope}
          data-type={filter.isNegative ? "exclude" : "include"}
        >
          {!filter.isScope && (
            <AxField.Checkbox
              isInvalid={filter.isNegative}
              isChecked={!filter.isDisabled}
              // @ts-expect-error ignore
              onClick={(e) => e.stopPropagation()}
              onChange={(e) => updateFilter(index, { isDisabled: !e })}
            />
          )}
          <div>{label}</div>
          {!filter.isRequired && (
            <span
              className="ax-filter__tag--close"
              onClick={(e) => (removeFilter(index), e.preventDefault())}
            >
              &times;
            </span>
          )}
        </div>
        <AxPanel.Stack>
          <AxPopover.Dismiss>
            <AxPanel panelId="menu">
              <FilterMenu index={index} {...filter} />
            </AxPanel>
          </AxPopover.Dismiss>
          <AxPanel panelId="edit" width="32rem">
            <AxHeader>
              <AxTitle>{t("label.edit")}</AxTitle>
            </AxHeader>
            <AxContent padding="none">
              <FilterForm index={index} {...(filter as AnyObject)} />
            </AxContent>
          </AxPanel>
          <AxPanel panelId="view" width="32rem">
            <AxHeader>
              <AxTitle>{t("label.view")}</AxTitle>
            </AxHeader>
            <AxContent padding="none">
              <QueryView index={index} {...(filter as AnyObject)} />
            </AxContent>
          </AxPanel>
        </AxPanel.Stack>
      </AxPopover>
    );
  }
);
FilterTag.displayName = "FilterTag";
