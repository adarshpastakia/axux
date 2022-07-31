/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Combobox } from "@headlessui/react";
import { Fragment, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { BaseSelectProps, getLabel } from "./utils";

export const Options = ({
  options,
  renderer,
  labelProperty,
  allowCreate,
  query,
  hideEmpty = false,
}: BaseSelectProps<AnyObject> & { query?: string; hideEmpty?: boolean }) => {
  const { t } = useTranslation("form");
  const makeOption = useCallback(
    (option: AnyObject, index: number) => (
      <Combobox.Option value={option} key={index}>
        {({ active, selected }) => (
          <div
            className="ax-select__option"
            data-selected={selected}
            data-active={active}
          >
            {renderer ? renderer(option) : getLabel(option, labelProperty)}
          </div>
        )}
      </Combobox.Option>
    ),
    [renderer, labelProperty]
  );
  return (
    <Fragment>
      {allowCreate && query && (
        <Combobox.Option value={query}>
          {({ active }) => (
            <div className="ax-select__option" data-active={active}>
              {t("select.createOption")}
              <b>{query}</b>
            </div>
          )}
        </Combobox.Option>
      )}
      {options.map((option, index) =>
        option.items ? (
          <Fragment key={index}>
            <div className="ax-select__group">{option.label}</div>
            {option.items.map(makeOption)}
          </Fragment>
        ) : (
          makeOption(option, index)
        )
      )}
      {!hideEmpty && !allowCreate && options.length === 0 && (
        <div className="ax-select__empty">{t("select.emptyList")}</div>
      )}
    </Fragment>
  );
};
