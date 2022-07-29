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
import { BaseSelectProps, CreatePlaceholder, getLabel } from "./utils";

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
            data-active={active}
            data-selected={selected}
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
      {!hideEmpty && options.length === 0 && (
        <Combobox.Option value={CreatePlaceholder}>
          <div className="ax-select__group">
            {t(allowCreate ? "select.createOption" : "select.notFound")}
            <b>{query}</b>
          </div>
        </Combobox.Option>
      )}
    </Fragment>
  );
};