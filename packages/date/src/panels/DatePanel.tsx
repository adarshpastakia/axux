// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton } from "@axux/core";
import { isAfter, isBefore } from "date-fns";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateHeader } from "../components/DateHeader";
import { DatePage } from "../components/DatePage";
import { DecadePage } from "../components/DecadePage";
import { MonthPage } from "../components/MonthPage";
import { YearPage } from "../components/YearPage";
import { useLocale } from "../hooks/useLocale";
import { DateProps, PageType } from "../types";
import {
  addMonths,
  addYears,
  endOfDecade,
  endOfMonth,
  endOfYear,
  isDateDisabled,
  startOfDecade,
  startOfMonth,
  startOfYear
} from "../utils";

export const AxDatePanel: FC<DateProps> = ({
  date,
  min,
  max,
  hijriCalendar,
  showHijriToggle,
  onChange,
  onHijriChange,
  dateDisabled: isDisabled
}) => {
  const { t } = useTranslation("date");
  const { isHijri, setHijri } = useLocale(hijriCalendar);
  const [selected, setSelected] = useState<Date | undefined>(date);
  const [pageDate, setPageDate] = useState(date || new Date());

  const [page, setPage] = useState<number>(PageType.DATE);
  const [canSelectToday, setCanSelectToday] = useState(true);

  useEffect(() => {
    let current = selected ?? new Date();
    if (date) {
      setSelected(date);
      current = date;
    }
    if (min && isBefore(current, min)) {
      setPageDate(startOfMonth(min, isHijri));
    } else if (max && isAfter(current, max)) {
      setPageDate(startOfMonth(max, isHijri));
    } else {
      setPageDate(startOfMonth(current, isHijri));
    }
    let canSelect = true;
    if (min && canSelect) {
      canSelect = isAfter(new Date(), min);
    }
    if (max && canSelect) {
      canSelect = isBefore(new Date(), max);
    }
    setCanSelectToday(canSelect);
  }, [date, min, max, isHijri, selected]);

  const changePage = useCallback(() => {
    setPage(page + 1);
  }, [page]);

  const changePageDate = useCallback(
    (diff: number) => {
      switch (page) {
        case PageType.DATE:
          return setPageDate(addMonths(pageDate, diff, isHijri));
        case PageType.MONTH:
          return setPageDate(addYears(pageDate, diff, isHijri));
        case PageType.YEAR:
          return setPageDate(addYears(pageDate, diff * 10, isHijri));
        case PageType.DECADE:
          return setPageDate(addYears(pageDate, diff * 100, isHijri));
      }
    },
    [isHijri, page, pageDate]
  );

  const selectDate = useCallback(
    (dt: Date) => {
      setSelected(dt);
      setPageDate(dt);
      setPage(PageType.DATE);
      onChange && onChange(dt);
    },
    [onChange]
  );

  const selectPage = useCallback(
    (dt: Date) => {
      setPageDate(dt);
      setPage(page - 1);
    },
    [page]
  );

  const dateDisabled = useCallback(
    (dt: Date) => {
      if (page === PageType.DATE) {
        if (isDisabled && isDisabled(dt)) {
          return true;
        }
      }

      return isDateDisabled(dt, page, min, max);
    },
    [page, min, max, isDisabled]
  );

  const headDisabled = useCallback(
    (diff: number) => {
      if (page === PageType.DATE) {
        const dt = addMonths(pageDate, diff, isHijri);
        return (
          (!!min && isBefore(startOfMonth(dt, isHijri), startOfMonth(min, isHijri))) ||
          (!!max && isAfter(endOfMonth(dt, isHijri), endOfMonth(max, isHijri)))
        );
      }
      if (page === PageType.MONTH) {
        const dt = addYears(pageDate, diff, isHijri);
        return (
          (!!min && isBefore(startOfYear(dt, isHijri), startOfYear(min, isHijri))) ||
          (!!max && isAfter(endOfYear(dt, isHijri), endOfYear(max, isHijri)))
        );
      }
      if (page === PageType.YEAR) {
        const dt = addYears(pageDate, diff * 10, isHijri);
        return (
          (!!min && isBefore(startOfDecade(dt, isHijri), startOfDecade(min, isHijri))) ||
          (!!max && isAfter(endOfDecade(dt, isHijri), endOfDecade(max, isHijri)))
        );
      }
      if (page === PageType.DECADE) {
        const dt = addYears(pageDate, diff * 100, isHijri);
        return (
          (!!min && isBefore(startOfDecade(dt, isHijri), startOfDecade(min, isHijri))) ||
          (!!max && isAfter(endOfDecade(dt, isHijri), endOfDecade(max, isHijri)))
        );
      }

      return false;
    },
    [page, pageDate, min, isHijri, max]
  );

  const props = {
    page,
    selected,
    pageDate,
    changePage,
    changePageDate,
    selectDate,
    selectPage,
    dateDisabled,
    headDisabled,
    isHijri
  };

  return (
    <div className="ax-date">
      <DateHeader {...props} />
      {page === PageType.DATE && <DatePage {...props} />}
      {page === PageType.MONTH && <MonthPage {...props} />}
      {page === PageType.YEAR && <YearPage {...props} />}
      {page === PageType.DECADE && <DecadePage {...props} />}
      <div className="ax-date__footer ax-border--t">
        <span>
          {showHijriToggle && (
            <AxButton
              type="link"
              color="primary"
              onClick={() => {
                onHijriChange && onHijriChange(!isHijri);
                setHijri(!isHijri);
              }}
            >
              {t(isHijri ? "label.gregorian" : "label.hijri")}
            </AxButton>
          )}
        </span>
        {page === PageType.DATE && canSelectToday && (
          <AxButton type="link" color="primary" onClick={() => selectDate(new Date())}>
            {t("label.today")}
          </AxButton>
        )}
        {page !== PageType.DATE && (
          <AxButton type="link" color="primary" onClick={() => setPage(PageType.DATE)}>
            {t("core:action.cancel")}
          </AxButton>
        )}
      </div>
    </div>
  );
};
