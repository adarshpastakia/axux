// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxContent, AxPanel } from "@axux/core";
import { AxField } from "@axux/form";
import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateParts, RelativeProps } from "../types";
import { I18nKey, makeSuperDate, parseDateLabel } from "../utils/dateMath";
import { RelativeInput } from "./RelativeInput";

const Presets: string[][] = [
  ["$day", "$week", "$month", "$quarter", "$year", "$decade"],
  ["$day-1", "$week-1", "$month-1", "$quarter-1", "$year-1", "$decade-1"],
  ["$day+1", "$week+1", "$month+1", "$quarter+1", "$year+1", "$decade+1"]
];

export const QuickSelect: FC<RelativeProps> = ({ date, onChange }) => {
  const { t } = useTranslation(I18nKey);
  const [quickDate, setQuickDate] = useState("$day-1");

  useEffect(() => {
    if (date && date.includes("|") && date.includes(DateParts.NOW)) {
      const [start, end] = date.split("|");
      if (start !== DateParts.NOW) {
        setQuickDate(start);
      }
      if (end !== DateParts.NOW) {
        setQuickDate(end);
      }
    }
  }, [date]);

  const applyRelative = useCallback(() => {
    if (quickDate) {
      onChange && onChange(makeSuperDate(quickDate));
    }
  }, [quickDate, onChange]);
  const selectPreset = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const { preset = DateParts.NOW } = e.currentTarget.dataset;
      onChange && onChange(`${preset}|${preset}`);
    },
    [onChange]
  );

  return (
    <AxPanel>
      <AxContent>
        <RelativeInput label={t("label.quick")} value={quickDate} onChange={setQuickDate}>
          <AxButton.Positive onClick={applyRelative}>{t("core:action.apply")}</AxButton.Positive>
        </RelativeInput>
        <AxField.Options label={t("label.preset")}>
          {Presets.map((p, i) => (
            <div key={i} className="ax-superdate__links">
              {p.map((key) => (
                <a
                  key={key}
                  data-preset={key}
                  className="ax-link ax-superdate--link"
                  onClick={selectPreset}
                >
                  {t(parseDateLabel(key))}
                </a>
              ))}
            </div>
          ))}
        </AxField.Options>
      </AxContent>
    </AxPanel>
  );
};
