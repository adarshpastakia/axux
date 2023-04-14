// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
  iconAlignCenter,
  iconAlignEnd,
  iconAlignJustify,
  iconAlignStart,
} from "../../utils/icons";
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
        name="align"
        label={t("config.align")}
        value={selected.align ?? "start"}
        className="align-options"
        onChange={(value) => updateField("align", value)}
      >
        <AxField.Radio icon={iconAlignStart} value="start" />
        <AxField.Radio icon={iconAlignCenter} value="center" />
        <AxField.Radio icon={iconAlignEnd} value="end" />
        <AxField.Radio icon={iconAlignJustify} value="justify" />
      </AxField.Options>
    </div>
  ) : null;
});
ParagraphConfig.displayName = "AxPageMaker.Config";
