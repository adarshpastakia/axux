/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxDivider, AxMenu } from "@axux/core";
import { Fragment, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSearchContext } from "../context";
import { EnumFieldType, type FilterObject } from "../types";
import { Icons } from "../types/icons";

export const FilterMenu = memo(
  ({ index, ...filter }: FilterObject & { index: number }) => {
    const { t } = useTranslation("searchbar");
    const { updateFilter, removeFilter, fields, isEditable } =
      useSearchContext();

    const canEdit = useMemo(() => {
      if (fields.length === 0 || !!filter.isScope || !isEditable) return false;
      const field = fields.find(
        (f) => (filter.type === "filter" && f.field === filter.field) ?? ""
      );
      return field?.type !== EnumFieldType.GEO;
    }, [filter, isEditable]);
    const canView = useMemo(() => {
      return !filter.isScope && (!canEdit || filter.type === "query");
    }, [filter, canEdit]);

    return (
      <AxMenu className="ax-filter__menu">
        {canEdit && (
          <Fragment>
            <AxMenu.Item
              data-panel="edit"
              icon={Icons.iconPencil}
              label={t("label.edit")}
            />
            <AxDivider size="xs" />
          </Fragment>
        )}
        {canView && (
          <Fragment>
            <AxMenu.Item
              data-panel="view"
              icon={Icons.iconPencil}
              label={t("label.view")}
            />
            <AxDivider size="xs" />
          </Fragment>
        )}
        <AxMenu.Item
          icon={Icons.iconEnable}
          label={t("label.enable")}
          isDisabled={!filter.isDisabled}
          onClick={() => updateFilter(index, { isDisabled: false })}
        />
        <AxMenu.Item
          icon={Icons.iconDisable}
          label={t("label.disable")}
          isDisabled={filter.isDisabled}
          onClick={() => updateFilter(index, { isDisabled: true })}
        />
        <AxMenu.Item
          icon={Icons.iconInvert}
          label={t("label.invert")}
          onClick={() =>
            updateFilter(index, { isNegative: !filter.isNegative })
          }
        />
        <AxDivider size="xs" />
        <AxMenu.Item
          icon={Icons.iconDelete}
          onClick={() => removeFilter(index)}
          label={t("label.remove")}
          className="ax-filter__deleteButton"
        />
      </AxMenu>
    );
  }
);
FilterMenu.displayName = "FilterMenu";
