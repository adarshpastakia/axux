/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useMemo } from "react";
import { type DateContext } from "../types";
import { DateUtil } from "../utils";
import { DateCell } from "./DateCell";

const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const MonthPage = (props: DateContext) => {
  const { pageDate, isHijri } = props;

  const startDate = useMemo(() => {
    return DateUtil.startOfYear(pageDate, isHijri);
  }, [isHijri, pageDate]);

  return (
    <div className="ax-date__page ax-date__page--parts">
      {cols.map((col) => (
        <DateCell
          key={col}
          date={DateUtil.addMonths(startDate, col, isHijri)}
          {...props}
        />
      ))}
    </div>
  );
};
