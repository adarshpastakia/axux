/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxContent, AxDivider, AxPanel, AxPopover } from "@axux/core";
import { AxField } from "@axux/form";
import { isString } from "@axux/utilities";
import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateParts, RelativeProps } from "../types";
import { makeSuperDate, parseDateLabel } from "../utils/dateMath";
import { RelativeInput } from "./RelativeInput";

const Presets: string[][] = [
  ["$day", "$week", "$month", "$quarter", "$year", "$decade"],
  ["$day-1", "$week-1", "$month-1", "$quarter-1", "$year-1", "$decade-1"],
  ["$day+1", "$week+1", "$month+1", "$quarter+1", "$year+1", "$decade+1"],
];

export const QuickSelect: FC<RelativeProps> = ({ date, onChange, presets }) => {
  const { t } = useTranslation("superdate");
  const [quickDate, setQuickDate] = useState("$day-1");

  useEffect(() => {
    if (isString(date) && date.includes("|") && date.includes(DateParts.NOW)) {
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
  const selectCustomPreset = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      const { preset } = e.currentTarget.dataset;
      onChange && onChange(`${preset}`);
    },
    [onChange]
  );

  return (
    <AxContent>
      <RelativeInput
        label={t("label.quick")}
        value={quickDate}
        onChange={setQuickDate}
      >
        <AxPopover.Dismiss>
          <AxButton style="solid" onClick={applyRelative}>
            {t("core:action.apply")}
          </AxButton>
        </AxPopover.Dismiss>
      </RelativeInput>
      <AxDivider />
      <AxField.Container
        label={t("label.preset")}
        className="ax-field--plain"
        isVertical
      >
        {!presets &&
          Presets.map((p, i) => (
            <div key={i} className="ax-superdate__links">
              {p.map((key) => (
                <AxPopover.Dismiss key={key}>
                  <a
                    data-preset={key}
                    className="ax-link ax-superdate--link"
                    onClick={selectPreset}
                  >
                    {t(parseDateLabel(key))}
                  </a>
                </AxPopover.Dismiss>
              ))}
            </div>
          ))}
        {presets && (
          <div className="ax-superdate__links">
            {Object.entries(presets).map(([key, preset]) => (
              <AxPopover.Dismiss key={key}>
                <a
                  data-preset={preset}
                  className="ax-link ax-superdate--link"
                  onClick={selectCustomPreset}
                >
                  {key}
                </a>
              </AxPopover.Dismiss>
            ))}
          </div>
        )}
      </AxField.Container>
    </AxContent>
  );
};
