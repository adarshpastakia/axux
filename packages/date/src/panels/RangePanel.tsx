// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton } from "@axux/core";
import { addMonths, addYears, isAfter, isSameMonth } from "date-fns";
import { FC, useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateHeader } from "../components/DateHeader";
import { DatePage } from "../components/DatePage";
import { DecadePage } from "../components/DecadePage";
import { MonthPage } from "../components/MonthPage";
import { YearPage } from "../components/YearPage";
import { PageType, RangeProps } from "../types";
import { isDateDisabled } from "../utils";

const DatePanel = (props: AnyObject) => {
  const { t } = useTranslation("date");
  return (
    <div className="ax-date">
      <DateHeader {...props} />
      {props.page === PageType.DATE && <DatePage {...props} />}
      {props.page === PageType.MONTH && <MonthPage {...props} />}
      {props.page === PageType.YEAR && <YearPage {...props} />}
      {props.page === PageType.DECADE && <DecadePage {...props} />}
      <div className="ax-date__footer">
        {props.page !== PageType.DATE && (
          <AxButton type="link" color="primary" onClick={props.setPage}>
            {t("core:action.cancel")}
          </AxButton>
        )}
      </div>
    </div>
  );
};

export const AxRangePanel: FC<RangeProps> = ({
  date,
  onChange,
  presets,
  min,
  max,
  hijriCalendar,
  showHijriToggle,
  onHijriChange
}) => {
  const { t } = useTranslation("date");
  const [isHijri, setHijri] = useState(hijriCalendar ?? false);
  const [hilight, setHilight] = useState<[Date, Date] | undefined>();
  const [selected, setSelected] = useState<[Date, Date] | undefined>();
  const [pageDate, setPageDate] = useState({ start: new Date(), end: addMonths(new Date(), 1) });

  const [page, setPage] = useState({ start: PageType.DATE, end: PageType.DATE });

  useEffect(() => {
    if (date) {
      setSelected(date);
      const [start, end] = date;
      setPageDate({ start, end: isSameMonth(start, end) ? addMonths(start, 1) : end });
      setPage({ start: PageType.DATE, end: PageType.DATE });
    }
  }, [date]);

  const changePage = useCallback(
    (key: "start" | "end") => {
      setPage({ ...page, [key]: page[key] + 1 });
    },
    [page]
  );

  const changePageDate = useCallback(
    (key: "start" | "end", diff: number) => {
      const dt = addMonths(pageDate[key], diff);
      switch (page[key]) {
        case PageType.DATE:
          if (key === "start") {
            setPageDate({ end: addMonths(dt, 1), [key]: dt });
          } else if (key === "end") {
            setPageDate({ start: addMonths(dt, -1), [key]: dt });
          }
          break;
        case PageType.MONTH:
          return setPageDate({ ...pageDate, [key]: addYears(pageDate[key], diff) });
        case PageType.YEAR:
          return setPageDate({ ...pageDate, [key]: addYears(pageDate[key], diff * 10) });
        case PageType.DECADE:
          return setPageDate({ ...pageDate, [key]: addYears(pageDate[key], diff * 100) });
      }
    },
    [page, pageDate]
  );

  const selectPage = useCallback(
    (key: "start" | "end", dt: Date) => {
      if (key === "start") {
        setPageDate({ end: addMonths(dt, 1), [key]: dt });
      } else if (key === "end") {
        setPageDate({ start: addMonths(dt, -1), [key]: dt });
      }
      setPage({ ...page, [key]: page[key] - 1 });
    },
    [page]
  );

  const selectDate = useCallback(
    (dt: Date | [Date, Date]) => {
      if (!Array.isArray(dt) && hilight === undefined) {
        setHilight([dt, dt]);
      } else {
        let start, end;
        if (Array.isArray(dt)) {
          [start, end] = dt;
        }
        if (!Array.isArray(dt) && hilight) {
          [start, end] = [hilight[0], dt];
        }
        if (start && end) {
          if (isAfter(start, end)) {
            [start, end] = [end, start];
          }
          setPageDate({ start, end: isSameMonth(start, end) ? addMonths(start, 1) : end });
          setPage({ start: PageType.DATE, end: PageType.DATE });
          setSelected([start, end]);
          onChange && onChange([start, end]);
          setHilight(undefined);
        }
      }
    },
    [onChange, hilight]
  );

  useLayoutEffect(() => {
    setHijri(hijriCalendar ?? false);
  }, [hijriCalendar]);

  const propsStart = {
    page: page.start,
    pageDate: pageDate.start,
    changePage: () => changePage("start"),
    setPage: () => setPage({ ...page, start: PageType.DATE }),
    changePageDate: (i: number) => changePageDate("start", i),
    dateDisabled: (dt: Date) => isDateDisabled(dt, page.start, min, max),
    selectPage: (d: Date) => selectPage("start", d),
    mouseOver: (d: Date) => hilight && setHilight([hilight[0], d]),
    selectDate,
    selected,
    hilight,
    isHijri
  };
  const propsEnd = {
    page: page.end,
    pageDate: pageDate.end,
    changePage: () => changePage("end"),
    setPage: () => setPage({ ...page, end: PageType.DATE }),
    changePageDate: (i: number) => changePageDate("end", i),
    dateDisabled: (dt: Date) => isDateDisabled(dt, page.end, min, max),
    selectPage: (d: Date) => selectPage("end", d),
    mouseOver: (d: Date) => hilight && setHilight([hilight[0], d]),
    selectDate,
    selected,
    hilight,
    isHijri
  };

  return (
    <div className="ax-date__range">
      <DatePanel {...propsStart} />
      <DatePanel {...propsEnd} />

      <div className="ax-date__preset">
        {presets &&
          Object.entries(presets).map(([key, value]) => (
            <AxButton key={key} type="link" color="primary" onClick={() => selectDate(value)}>
              {key}
            </AxButton>
          ))}
      </div>

      <div className="ax-date__footer">
        <span>
          {showHijriToggle && (
            <AxButton
              type="link"
              onClick={() => {
                onHijriChange && onHijriChange(!isHijri);
                setHijri(!isHijri);
              }}
            >
              {t(isHijri ? "label.gregorian" : "label.hijri")}
            </AxButton>
          )}
        </span>
        {hilight && (
          <AxButton type="link" color="primary" onClick={() => setHilight(undefined)}>
            {t("core:action.cancel")}
          </AxButton>
        )}
      </div>
    </div>
  );
};
