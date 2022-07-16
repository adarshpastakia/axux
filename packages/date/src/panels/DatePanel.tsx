/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useGlobals } from "@axux/core/dist/context/Global";
import { isAfter, isBefore } from "date-fns";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateHeader } from "../components/DateHeader";
import { DatePage } from "../components/DatePage";
import { DecadePage } from "../components/DecadePage";
import { MonthPage } from "../components/MonthPage";
import { YearPage } from "../components/YearPage";
import { DateProps, PageType } from "../types";
import { DateUtil } from "../utils";

export const AxDatePanel: FC<DateProps> = ({
  date,
  min,
  max,
  onChange,
  showHijriToggle,
  dateDisabled: isDisabled,
}) => {
  const { t } = useTranslation("date");
  const { currentCalendar } = useGlobals();
  const [isHijri, setHijri] = useState(currentCalendar === "hijri");
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
      setPageDate(DateUtil.startOfMonth(min, isHijri));
    } else if (max && isAfter(current, max)) {
      setPageDate(DateUtil.startOfMonth(max, isHijri));
    } else {
      setPageDate(DateUtil.startOfMonth(current, isHijri));
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
          return setPageDate(DateUtil.addMonths(pageDate, diff, isHijri));
        case PageType.MONTH:
          return setPageDate(DateUtil.addYears(pageDate, diff, isHijri));
        case PageType.YEAR:
          return setPageDate(DateUtil.addYears(pageDate, diff * 10, isHijri));
        case PageType.DECADE:
          return setPageDate(DateUtil.addYears(pageDate, diff * 100, isHijri));
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

      return DateUtil.isDisabled(dt, page, min, max);
    },
    [page, min, max, isDisabled]
  );

  const headDisabled = useCallback(
    (diff: number) => {
      if (page === PageType.DATE) {
        const dt = DateUtil.addMonths(pageDate, diff, isHijri);
        return (
          (!!min &&
            isBefore(
              DateUtil.startOfMonth(dt, isHijri),
              DateUtil.startOfMonth(min, isHijri)
            )) ||
          (!!max &&
            isAfter(
              DateUtil.endOfMonth(dt, isHijri),
              DateUtil.endOfMonth(max, isHijri)
            ))
        );
      }
      if (page === PageType.MONTH) {
        const dt = DateUtil.addYears(pageDate, diff, isHijri);
        return (
          (!!min &&
            isBefore(
              DateUtil.startOfYear(dt, isHijri),
              DateUtil.startOfYear(min, isHijri)
            )) ||
          (!!max &&
            isAfter(
              DateUtil.endOfYear(dt, isHijri),
              DateUtil.endOfYear(max, isHijri)
            ))
        );
      }
      if (page === PageType.YEAR) {
        const dt = DateUtil.addYears(pageDate, diff * 10, isHijri);
        return (
          (!!min &&
            isBefore(
              DateUtil.startOfDecade(dt, isHijri),
              DateUtil.startOfDecade(min, isHijri)
            )) ||
          (!!max &&
            isAfter(
              DateUtil.endOfDecade(dt, isHijri),
              DateUtil.endOfDecade(max, isHijri)
            ))
        );
      }
      if (page === PageType.DECADE) {
        const dt = DateUtil.addYears(pageDate, diff * 100, isHijri);
        return (
          (!!min &&
            isBefore(
              DateUtil.startOfDecade(dt, isHijri),
              DateUtil.startOfDecade(min, isHijri)
            )) ||
          (!!max &&
            isAfter(
              DateUtil.endOfDecade(dt, isHijri),
              DateUtil.endOfDecade(max, isHijri)
            ))
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
    isHijri,
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
              size="sm"
              style="link"
              color="primary"
              onClick={() => {
                setHijri(!isHijri);
              }}
            >
              {t(isHijri ? "label.gregorian" : "label.hijri")}
            </AxButton>
          )}
        </span>
        {page === PageType.DATE && canSelectToday && (
          <AxButton
            size="sm"
            style="link"
            color="primary"
            onClick={() => selectDate(new Date())}
          >
            {t("label.today")}
          </AxButton>
        )}
        {page !== PageType.DATE && (
          <AxButton
            size="sm"
            style="link"
            color="primary"
            onClick={() => setPage(PageType.DATE)}
          >
            {t("core:action.cancel")}
          </AxButton>
        )}
      </div>
    </div>
  );
};
