// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxPopover } from "@axux/core";
import { AxField, AxForm } from "@axux/form";
import { Fragment, memo } from "react";
import { BlockPicker } from "react-color";
import { useTranslation } from "react-i18next";
import { EnumTypes } from "../..";
import { iconColor } from "../../utils/icons";
import { usePageContext } from "../context";

const colors = [
  "#40407a",
  "#706fd3",
  "#f7f1e3",
  "#34ace0",
  "#33d9b2",
  "#2c2c54",
  "#474787",
  "#aaa69d",
  "#227093",
  "#218c74",
  "#ff5252",
  "#ff793f",
  "#d1ccc0",
  "#ffb142",
  "#ffda79",
  "#b33939",
  "#cd6133",
  "#84817a",
  "#cc8e35",
  "#ccae62",
];

export const Config = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext();

  const updateField = (key: string, value: AnyObject) => {
    selected && updateConfig(selected.id, key as AnyObject, value);
  };

  return selected ? (
    <div className="page-maker__aside--form">
      <AxForm>
        {[EnumTypes.TILE, EnumTypes.DIVIDER, EnumTypes.HEADING].includes(
          selected.type
        ) && (
          <Fragment>
            <AxField.Text
              label={t("config.title")}
              value={selected.title}
              onChange={(value) => updateField("title", value)}
            />
            <AxField.Container label={t("config.color")}>
              <AxField.Addon icon={iconColor} color={selected.color} />
              <AxPopover hideArrow placement="bottom-start">
                <div className="ax-field__container ">
                  <AxField.Text value={selected.color} isReadOnly />
                </div>
                <BlockPicker
                  colors={colors}
                  color={selected.color}
                  onChangeComplete={(c) => updateField("color", c.hex)}
                />
              </AxPopover>
            </AxField.Container>
            <AxField.Text
              label={t("config.icon")}
              value={selected.iconCls}
              onChange={(value) => updateField("iconCls", value)}
            >
              <AxField.Addon icon={selected.iconCls} />
            </AxField.Text>
          </Fragment>
        )}
        {[EnumTypes.DIVIDER, EnumTypes.HEADING].includes(selected.type) && (
          <AxField.Slider
            label={t("config.size")}
            min={8}
            max={42}
            showValue
            value={selected.size || 13}
            onChange={(value) => updateField("size", value)}
          />
        )}
        {selected.type === EnumTypes.COL && (
          <AxField.Slider
            label={t("config.colSpan")}
            min={1}
            max={12}
            showValue
            value={selected.colSpan}
            onChange={(value) => updateField("colSpan", value)}
          />
        )}
        {selected.type === EnumTypes.ROW && (
          <AxField.Container label={t("config.height")}>
            <AxField.Addon>
              <AxField.Checkbox
                isChecked={selected.height === "auto"}
                onChange={(e) => [updateField("height", e ? "auto" : 32)]}
              />
            </AxField.Addon>
            <AxField.Number
              min={32}
              max={800}
              isDisabled={selected.height === "auto"}
              value={selected.height}
              onChange={(value) => updateField("height", value)}
            />
          </AxField.Container>
        )}
        {selected.type === EnumTypes.TILE && (
          <Fragment>
            <AxField.Text
              label={t("config.info")}
              value={selected.info}
              onChange={(value) => updateField("info", value)}
            />
            <AxField.Switch
              label={t("config.expand")}
              isChecked={selected.expandable}
              onChange={(checked) => updateField("expandable", checked)}
            />
          </Fragment>
        )}
      </AxForm>
    </div>
  ) : null;
});
Config.displayName = "AxPageMaker.Config";
