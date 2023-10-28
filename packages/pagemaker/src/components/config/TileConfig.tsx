// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { type ITileConfig } from "../../utils/types";
import { usePageContext } from "../context";

export const TileConfig = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext<ITileConfig>();

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="page-maker__aside--form">
      <AxField.Text
        label={t("config.title")}
        value={selected.title}
        onChange={(value) => updateField("title", value)}
      />
      <AxField.Color
        showInput
        allowClear
        label={t("config.headBg")}
        value={selected.bg}
        defaultColor="#00000000"
        onChange={(c) => updateField("bg", c)}
      />
      <AxField.Color
        showInput
        allowClear
        label={t("config.color")}
        value={selected.color}
        onChange={(c) => updateField("color", c)}
      />
      <AxField.Text
        label={t("config.icon")}
        value={selected.icon}
        onChange={(value) => updateField("icon", value)}
      >
        <AxField.Addon icon={selected.icon} />
      </AxField.Text>
      <AxField.Textarea
        label={t("config.info")}
        value={selected.info}
        rows={12}
        onChange={(value) => updateField("info", value)}
      />
    </div>
  ) : null;
});
TileConfig.displayName = "AxPageMaker.Config";
