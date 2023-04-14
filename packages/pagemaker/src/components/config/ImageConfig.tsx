// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { type IImageConfig } from "../../utils/types";
import { usePageContext } from "../context";

export const ImageConfig = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext<IImageConfig>();

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="page-maker__aside--form">
      <AxField.Textarea
        label={t("config.src")}
        value={selected.src}
        rows={5}
        onChange={(value) => updateField("src", value)}
      />
    </div>
  ) : null;
});
ImageConfig.displayName = "AxPageMaker.Config";
