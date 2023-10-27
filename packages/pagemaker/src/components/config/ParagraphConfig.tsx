// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { type IParagraphConfig } from "../../utils/types";
import { usePageContext } from "../context";

export const ParagraphConfig = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext<IParagraphConfig>();

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="page-maker__aside--form">
      <AxField.Options
        name="height"
        label={t("config.height")}
        value={selected.height ?? "auto"}
        onChange={(value) => updateField("height", value)}
      >
        <AxField.Radio value="auto" label="Auto" />
        <AxField.Radio value="small" label="Small" />
        <AxField.Radio value="medium" label="Medium" />
        <AxField.Radio value="large" label="Large" />
      </AxField.Options>
    </div>
  ) : null;
});
ParagraphConfig.displayName = "AxPageMaker.Config";
