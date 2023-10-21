// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxContent, AxIcon, AxPopover } from "@axux/core";
import { type FC, useCallback, useMemo, useState } from "react";
import { DateHeader } from "../components/DateHeader";
import { PageType, type RelativeProps } from "../types";
import { DateMath, DateUtil } from "../utils";

export const EventCalendar: FC<Pick<RelativeProps, "events" | "onChange">> = ({
  events,
  onChange,
}) => {
  const [pageDate, setPageDate] = useState(new Date());

  const list = useMemo(() => {
    const year = pageDate.getFullYear();
    const list = events?.[`${year}`] ?? [];
    return list
      .sort(
        (a, b) =>
          new Date(a.dates[0]).getTime() - new Date(b.dates[0]).getTime()
      )
      .map((d) => ({
        ...d,
        start: DateMath.toISOString(d.dates[0])?.toString(),
        end: DateMath.toISOString(d.dates[1])?.toString(),
      }));
  }, [events, pageDate]);

  const dateLabel = useCallback(
    (dt: AnyObject) =>
      DateMath.toString(
        dt,
        pageDate.getFullYear() !== new Date(dt).getFullYear()
          ? "dd/MM, yy"
          : "dd/MM"
      ),
    [pageDate]
  );

  return (
    <div
      className="grid-area-[content] grid overflow-hidden"
      style={{ maxHeight: "24rem", gridTemplateRows: "auto 1fr" }}
    >
      <DateHeader
        page={PageType.MONTH}
        pageDate={pageDate}
        changePageDate={(diff) =>
          setPageDate(DateUtil.addYears(pageDate, diff, false))
        }
      />
      <div className="p-2 overflow-auto">
        {list.length === 0 && (
          <AxContent.Empty
            className="text-sm"
            message="No events available for selected year"
          />
        )}
        {list.map(
          ({ icon, label, dates: [start = "$now", end = "$now"] }, idx) => (
            <AxPopover.Dismiss key={`${idx}-${label}`}>
              <div
                className="flex items-center hover:bg-primary-500/20 mb-1 px-2 cursor-pointer select-none"
                onClick={() =>
                  onChange?.(`${start}|${end}`, [
                    DateMath.parse(start),
                    DateMath.parse(end),
                  ])
                }
              >
                {icon && <AxIcon icon={icon} size="md" />}
                <div className="flex-auto">&nbsp;{label}&nbsp;</div>
                <div className="text-sm text-muted">
                  {dateLabel(start)} - {dateLabel(end)}
                </div>
              </div>
            </AxPopover.Dismiss>
          )
        )}
      </div>
    </div>
  );
};
