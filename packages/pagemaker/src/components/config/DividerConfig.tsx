// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { Fragment, memo } from "react";
import { useTranslation } from "react-i18next";
import {
  iconAlignCenter,
  iconAlignEnd,
  iconAlignStart,
} from "../../utils/icons";
import { type IDividerConfig } from "../../utils/types";
import { usePageContext } from "../context";

export const DividerConfig = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext<IDividerConfig>();

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="page-maker__aside--form">
      <AxField.Slider
        label={t("config.width")}
        min={1}
        max={16}
        showValue
        value={selected.width ?? 1}
        onSlide={(value) => updateField("width", value)}
        onChange={(value) => updateField("width", value)}
      />
      <AxField.Color
        showInput
        allowClear
        label={t("config.color")}
        value={selected.color}
        onChange={(c) => updateField("color", c)}
      />
      {!!selected.text && (
        <AxField.Switch
          label={t("config.applyBg")}
          isChecked={selected.applyBg}
          onChange={(value) => updateField("applyBg", value)}
        />
      )}
      <AxField.Text
        label={t("config.text")}
        value={selected.text}
        allowClear
        onChange={(value) => updateField("text", value)}
      />
      {!!selected.text && (
        <Fragment>
          <AxField.Text
            label={t("config.icon")}
            value={selected.icon}
            onChange={(value) => updateField("iconCls", value)}
          >
            <AxField.Addon icon={selected.icon} />
          </AxField.Text>
          <AxField.Slider
            label={t("config.size")}
            min={0.75}
            max={4}
            step={0.25}
            showValue
            value={selected.size ?? 1}
            onSlide={(value) => updateField("size", value)}
            onChange={(value) => updateField("size", value)}
          />
          <AxField.Options
            name="align"
            label={t("config.align")}
            value={selected.align}
            className="align-options"
            onChange={(value) => updateField("align", value)}
          >
            <AxField.Radio icon={iconAlignStart} value="start" />
            <AxField.Radio icon={iconAlignCenter} value="center" />
            <AxField.Radio icon={iconAlignEnd} value="end" />
          </AxField.Options>
        </Fragment>
      )}
    </div>
  ) : null;
});
DividerConfig.displayName = "AxPageMaker.Config";
