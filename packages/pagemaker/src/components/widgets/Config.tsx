// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { Fragment, memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { EnumTypes } from "../..";
import { DividerConfig } from "../config/DividerConfig";
import { HeadingConfig } from "../config/HeadingConfig";
import { ImageConfig } from "../config/ImageConfig";
import { ParagraphConfig } from "../config/ParagraphConfig";
import { usePageContext } from "../context";

export const Config = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { selected, updateConfig } = usePageContext();

  const form = useMemo(() => {
    switch (selected?.type) {
      case EnumTypes.DIVIDER:
        return <DividerConfig />;
      case EnumTypes.HEADING:
        return <HeadingConfig />;
      case EnumTypes.PARAGRAPH:
        return <ParagraphConfig />;
      case EnumTypes.IMAGE:
        return <ImageConfig />;
      default:
        return null;
    }
  }, [selected]);

  return (
    <div className="page-maker__aside--form">
      {selected && (
        <Fragment>
          {![EnumTypes.DIVIDER, EnumTypes.VDIVIDER, EnumTypes.BREAK].includes(
            selected.type
          ) && (
            <AxField.Slider
              label={t("config.colSpan")}
              min={1}
              max={12}
              showValue
              value={selected.colSpan}
              onSlide={(value) => updateConfig(selected.id, "colSpan", value)}
              onChange={(value) => updateConfig(selected.id, "colSpan", value)}
            />
          )}
          {[EnumTypes.IMAGE, EnumTypes.TILE].includes(selected.type) && (
            <AxField.Options
              name="aspect"
              className="align-options"
              label={t("config.aspect")}
              value={(selected as AnyObject).aspect ?? "0"}
              onChange={(value) =>
                updateConfig(selected.id, "aspect" as AnyObject, value)
              }
            >
              <AxField.Radio value="0" label="None" />
              <AxField.Radio value="1 / 1" label="1:1" />
              <AxField.Radio value="4 / 3" label="4:3" />
              <AxField.Radio value="16 / 9" label="16:9" />
            </AxField.Options>
          )}
        </Fragment>
      )}
      {form}
    </div>
  );
});
Config.displayName = "AxPageMaker.Config";
