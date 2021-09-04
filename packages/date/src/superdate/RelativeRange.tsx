// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxContent, AxPanel, AxToolbar } from "@axux/core";
import { isString } from "@axux/utilities";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateParts, RelativeProps } from "../types";
import { I18nKey, makeSuperDate } from "../utils/dateMath";
import { RelativeInput } from "./RelativeInput";

export const RelativeRange: FC<RelativeProps> = ({ date, onChange }) => {
  const { t } = useTranslation(I18nKey);
  const [startDate, setStartDate] = useState("$day-1");
  const [endDate, setEndDate] = useState("$day-1");

  useEffect(() => {
    if (isString(date) && date.includes("|")) {
      const [start, end] = date.split("|");
      if (start !== DateParts.NOW) {
        setStartDate(start);
      }
      if (end !== DateParts.NOW) {
        setEndDate(end);
      }
    }
  }, [date]);

  const applyRelative = useCallback(() => {
    if (startDate && endDate) {
      onChange && onChange(makeSuperDate(startDate, endDate));
    }
  }, [startDate, endDate, onChange]);

  return (
    <AxPanel>
      <AxContent>
        <RelativeInput label={t("label.from")} value={startDate} onChange={setStartDate} />
        <RelativeInput label={t("label.to")} value={endDate} onChange={setEndDate} />
      </AxContent>
      <AxPanel.Footer>
        <AxToolbar align="end">
          <AxButton.Positive size="sm" onClick={applyRelative}>
            {t("core:action.apply")}
          </AxButton.Positive>
        </AxToolbar>
      </AxPanel.Footer>
    </AxPanel>
  );
};
