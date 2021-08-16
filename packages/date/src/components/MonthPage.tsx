// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useMemo } from "react";
import { DateContext } from "../types";
import { addMonths, startOfYear } from "../utils";
import { DateCell } from "./DateCell";

const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const MonthPage = (props: DateContext) => {
  const { pageDate, isHijri } = props;

  const startDate = useMemo(() => {
    return startOfYear(pageDate, isHijri);
  }, [isHijri, pageDate]);

  return (
    <div className="ax-date__page ax-date__page--parts">
      {cols.map((col) => (
        <DateCell key={col} date={addMonths(startDate, col, isHijri)} {...props} />
      ))}
    </div>
  );
};
