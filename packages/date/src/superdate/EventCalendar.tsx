// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { AxContent, AxIcon, AxPanel } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { useCallback, useMemo, useState } from "react";
import { DateHeader } from "../components/DateHeader";
import { PageType, RelativeProps } from "../types";
import { addYears } from "../utils";
import { DateUtils } from "../utils/dateMath";

export const EventCalendar: VFC<Pick<RelativeProps, "events" | "onChange">> = ({
  events,
  onChange
}) => {
  const [pageDate, setPageDate] = useState(new Date());

  const list = useMemo(() => {
    const year = pageDate.getFullYear();
    const list = events?.[`${year}`] ?? [];
    return list
      .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
      .map((d) => ({
        ...d,
        start: DateUtils.toISOString(d.start)?.toString(),
        end: DateUtils.toISOString(d.end)?.toString()
      }));
  }, [events, pageDate]);

  const dateLabel = useCallback(
    (dt: AnyObject) =>
      DateUtils.toString(
        dt,
        pageDate.getFullYear() !== new Date(dt).getFullYear() ? "dd/MM, yy" : "dd/MM"
      ),
    [pageDate]
  );

  return (
    <AxPanel maxHeight="20rem">
      <DateHeader
        page={PageType.MONTH}
        pageDate={pageDate}
        changePageDate={(diff) => setPageDate(addYears(pageDate, diff, false))}
      />
      <AxContent padding="sm">
        {list.length === 0 && <AxContent.Empty message="No events available for selected year" />}
        {list.map(({ icon, label, start, end }, idx) => (
          <div
            key={`${idx}-${label}`}
            className="ax-row ax-row--middle ax-hover--secondary ax-margin--b--xs ax-clickable ax-no-select"
            onClick={() =>
              onChange?.(`${start}|${end}`, [DateUtils.parse(start), DateUtils.parse(end)])
            }
          >
            {icon && <AxIcon icon={icon} size="md" />}
            <div className="ax-col--fill">&nbsp;{label}&nbsp;</div>
            <div>
              {dateLabel(start)} - {dateLabel(end)}
            </div>
          </div>
        ))}
      </AxContent>
    </AxPanel>
  );
};
