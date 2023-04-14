/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { getDay } from "date-fns";
import i18next from "i18next";
import { useMemo } from "react";
import { type DateContext } from "../types";
import { DateUtil } from "../utils";
import { DateCell } from "./DateCell";

const rows = [0, 1, 2, 3, 4, 5];
const cols = [0, 1, 2, 3, 4, 5, 6];

export const DatePage = (props: DateContext) => {
  const { pageDate, isHijri } = props;

  const startDate = useMemo(() => {
    const first = DateUtil.startOfMonth(pageDate, isHijri);
    const current = getDay(first);
    return DateUtil.addDays(
      first,
      (current < 3 ? -7 : 0) + current * -1,
      isHijri
    );
  }, [isHijri, pageDate]);

  return (
    <div className="ax-date__page ax-date__page--date">
      <div className="ax-date__wkhead">
        {rows.map((row) => (
          <div key={row}>
            {DateUtil.getWeek(
              DateUtil.addDays(startDate, row * 7, isHijri),
              i18next.language,
              isHijri
            )}
          </div>
        ))}
      </div>
      <div className="ax-date__head">
        <div>#</div>
        {cols.map((col) => {
          const dt = DateUtil.addDays(startDate, col, isHijri);
          return (
            <div key={dt.toISOString()}>
              {DateUtil.format(dt, "eeeeee", i18next.language, isHijri)}
            </div>
          );
        })}
      </div>
      <div className="ax-date__days">
        {rows.map((row) =>
          cols.map((col) => {
            const dt = DateUtil.addDays(startDate, row * 7 + col, isHijri);
            return (
              <DateCell
                key={dt.toISOString()}
                date={dt}
                isMuted={!DateUtil.isSameMonth(dt, pageDate, isHijri)}
                {...props}
              />
            );
          })
        )}
      </div>
    </div>
  );
};
