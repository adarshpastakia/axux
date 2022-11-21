/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxContent, AxFooter, AxPopover } from "@axux/core";
import { isString } from "@axux/utilities";
import { FC, Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateParts, RelativeProps } from "../types";
import { makeSuperDate } from "../utils/dateMath";
import { RelativeInput } from "./RelativeInput";

export const RelativeRange: FC<RelativeProps> = ({ date, onChange }) => {
  const { t } = useTranslation("superdate");
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
      onChange?.(makeSuperDate(startDate, endDate));
    }
  }, [startDate, endDate, onChange]);

  return (
    <Fragment>
      <AxContent className="justify-self-center">
        <RelativeInput
          label={t("label.from")}
          value={startDate}
          onChange={setStartDate}
        />
        <RelativeInput
          label={t("label.to")}
          value={endDate}
          onChange={setEndDate}
        />
      </AxContent>
      <AxFooter className="flex justify-end">
        <AxPopover.Dismiss>
          <AxButton variant="solid" size="sm" onClick={applyRelative}>
            {t("core:action.apply")}
          </AxButton>
        </AxPopover.Dismiss>
      </AxFooter>
    </Fragment>
  );
};
