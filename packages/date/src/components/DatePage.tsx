// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useAxGlobals } from "@axux/core";
import { getDay } from "date-fns";
import { useMemo } from "react";
import { DateContext } from "../types";
import { addDays, dateFormat, getWeek, isSameMonth, startOfMonth } from "../utils";
import { DateCell } from "./DateCell";

const rows = [0, 1, 2, 3, 4, 5];
const cols = [0, 1, 2, 3, 4, 5, 6];

export const DatePage = (props: DateContext) => {
  const { pageDate, isHijri } = props;
  const { dateLocale } = useAxGlobals();

  const startDate = useMemo(() => {
    const first = startOfMonth(pageDate, isHijri);
    const current = getDay(first);
    return addDays(first, (current < 3 ? -7 : 0) + current * -1, isHijri);
  }, [isHijri, pageDate]);

  return (
    <div className="ax-date__page ax-date__page--date">
      <div className="ax-date__wkhead">
        <div>#</div>
        {rows.map((row) => (
          <div key={row}>{getWeek(addDays(startDate, row * 7, isHijri), isHijri)}</div>
        ))}
      </div>
      <div className="ax-date__head">
        {cols.map((col) => {
          const dt = addDays(startDate, col, isHijri);
          return <div key={dt.toISOString()}>{dateFormat(dt, "eeeeee", dateLocale, isHijri)}</div>;
        })}
      </div>
      <div className="ax-date__days">
        {rows.map((row) =>
          cols.map((col) => {
            const dt = addDays(startDate, row * 7 + col, isHijri);
            return (
              <DateCell
                key={dt.toISOString()}
                date={dt}
                isMuted={!isSameMonth(dt, pageDate, isHijri)}
                {...props}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
