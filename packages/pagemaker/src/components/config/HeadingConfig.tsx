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
  iconAlignStart,
  iconStyleBold,
  iconStyleItalic,
  iconStyleUnderline,
} from "../../utils/icons";
import { IHeadingConfig } from "../../utils/types";
import { usePageContext } from "../context";

export const HeadingConfig = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext<IHeadingConfig>();

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="page-maker__aside--form">
      <AxField.Text
        label={t("config.text")}
        value={selected.text}
        onChange={(value) => updateField("text", value)}
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
      <AxField.Options label={t("config.style")} className="align-options">
        <AxField.Checkbox
          icon={iconStyleBold}
          isChecked={selected.bold}
          onChange={(value) => updateField("bold", value)}
        />
        <AxField.Checkbox
          icon={iconStyleItalic}
          isChecked={selected.italic}
          onChange={(value) => updateField("italic", value)}
        />
        <AxField.Checkbox
          icon={iconStyleUnderline}
          isChecked={selected.underline}
          onChange={(value) => updateField("underline", value)}
        />
      </AxField.Options>
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
      </AxField.Options>
    </div>
  ) : null;
});
HeadingConfig.displayName = "AxPageMaker.Config";
