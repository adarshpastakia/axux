/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useGlobals } from "@axux/core/dist/context/Global";
import { isAfter } from "date-fns";
import { type FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateHeader } from "../components/DateHeader";
import { DatePage } from "../components/DatePage";
import { DecadePage } from "../components/DecadePage";
import { MonthPage } from "../components/MonthPage";
import { YearPage } from "../components/YearPage";
import { PageType, type RangeProps } from "../types";
import { DateUtil } from "../utils";

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
        <span />
        {props.page !== PageType.DATE && (
          <AxButton
            variant="link"
            size="sm"
            color="primary"
            onClick={props.setPage}
          >
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
  showHijriToggle,
}) => {
  const { t } = useTranslation("date");
  const { currentCalendar } = useGlobals();
  const [isHijri, setHijri] = useState(currentCalendar === "hijri");
  const [hilight, setHilight] = useState<[Date, Date] | undefined>();
  const [selected, setSelected] = useState<[Date, Date] | undefined>();
  const [pageDate, setPageDate] = useState({
    start: new Date(),
    end: DateUtil.addMonths(new Date(), 1, isHijri),
  });

  const [page, setPage] = useState({
    start: PageType.DATE,
    end: PageType.DATE,
  });

  useEffect(() => {
    if (date != null) {
      setSelected(date);
      const [start, end] = date;
      setPageDate({
        start,
        end: DateUtil.isSameMonth(start, end, isHijri)
          ? DateUtil.addMonths(start, 1, isHijri)
          : end,
      });
      setPage({ start: PageType.DATE, end: PageType.DATE });
    }
  }, [date, isHijri]);

  const changePage = useCallback(
    (key: "start" | "end") => {
      setPage({ ...page, [key]: page[key] + 1 });
    },
    [page]
  );

  const changePageDate = useCallback(
    (key: "start" | "end", diff: number) => {
      const dt = DateUtil.addMonths(pageDate[key], diff, isHijri);
      switch (page[key]) {
        case PageType.DATE:
          if (key === "start") {
            setPageDate({ end: DateUtil.addMonths(dt, 1, isHijri), [key]: dt });
          } else if (key === "end") {
            setPageDate({
              start: DateUtil.addMonths(dt, -1, isHijri),
              [key]: dt,
            });
          }
          break;
        case PageType.MONTH:
          return setPageDate({
            ...pageDate,
            [key]: DateUtil.addYears(pageDate[key], diff, isHijri),
          });
        case PageType.YEAR:
          return setPageDate({
            ...pageDate,
            [key]: DateUtil.addYears(pageDate[key], diff * 10, isHijri),
          });
        case PageType.DECADE:
          return setPageDate({
            ...pageDate,
            [key]: DateUtil.addYears(pageDate[key], diff * 100, isHijri),
          });
      }
    },
    [isHijri, page, pageDate]
  );

  const selectPage = useCallback(
    (key: "start" | "end", dt: Date) => {
      if (key === "start") {
        setPageDate({ end: DateUtil.addMonths(dt, 1, isHijri), [key]: dt });
      } else if (key === "end") {
        setPageDate({ start: DateUtil.addMonths(dt, -1, isHijri), [key]: dt });
      }
      setPage({ ...page, [key]: page[key] - 1 });
    },
    [isHijri, page]
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
        if (!Array.isArray(dt) && hilight != null) {
          [start, end] = [hilight[0], dt];
        }
        if (start != null && end != null) {
          if (isAfter(start, end)) {
            [start, end] = [end, start];
          }
          end = DateUtil.endOfDay(end);
          setPageDate({
            start,
            end: DateUtil.isSameMonth(start, end, isHijri)
              ? DateUtil.addMonths(start, 1, isHijri)
              : end,
          });
          setPage({ start: PageType.DATE, end: PageType.DATE });
          setSelected([start, end]);
          onChange?.([start, end]);
          setHilight(undefined);
        }
      }
    },
    [hilight, isHijri, onChange]
  );

  const propsStart = {
    page: page.start,
    pageDate: pageDate.start,
    changePage: () => changePage("start"),
    setPage: () => setPage({ ...page, start: PageType.DATE }),
    changePageDate: (i: number) => changePageDate("start", i),
    dateDisabled: (dt: Date) => DateUtil.isDisabled(dt, page.start, min, max),
    selectPage: (d: Date) => selectPage("start", d),
    mouseOver: (d: Date) => hilight != null && setHilight([hilight[0], d]),
    selectDate,
    selected,
    hilight,
    isHijri,
  };
  const propsEnd = {
    page: page.end,
    pageDate: pageDate.end,
    changePage: () => changePage("end"),
    setPage: () => setPage({ ...page, end: PageType.DATE }),
    changePageDate: (i: number) => changePageDate("end", i),
    dateDisabled: (dt: Date) => DateUtil.isDisabled(dt, page.end, min, max),
    selectPage: (d: Date) => selectPage("end", d),
    mouseOver: (d: Date) => hilight != null && setHilight([hilight[0], d]),
    selectDate,
    selected,
    hilight,
    isHijri,
  };

  return (
    <div className="ax-date__range">
      <DatePanel {...propsStart} />
      <DatePanel {...propsEnd} />

      <div className="ax-date__presets">
        {presets != null &&
          Object.entries(presets).map(([key, value]) => (
            <AxButton
              key={key}
              size="sm"
              variant="link"
              color="primary"
              onClick={() => selectDate(value)}
            >
              {key}
            </AxButton>
          ))}
      </div>

      <div className="ax-date__footer">
        <span>
          {showHijriToggle && (
            <AxButton
              size="sm"
              variant="link"
              color="primary"
              onClick={() => {
                setHijri(!isHijri);
              }}
            >
              {t(isHijri ? "label.gregorian" : "label.hijri")}
            </AxButton>
          )}
        </span>
        {hilight != null && (
          <AxButton
            size="sm"
            variant="link"
            color="primary"
            onClick={() => setHilight(undefined)}
          >
            {t("core:action.cancel")}
          </AxButton>
        )}
      </div>
    </div>
  );
};
