// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { CSSProperties, FC, isValidElement, memo, useEffect, useMemo, useState } from "react";

export interface TimelineEntryProps {
  noline?: boolean;
  reverse?: boolean;
  avatar?: string | JSX.Element;
  index?: number;
  style?: CSSProperties;
  isScrolling?: boolean;
  measure: () => void;
}

export const TimelineEntry: FC<TimelineEntryProps> = memo(
  ({ children, isScrolling, measure, avatar, index, style, noline, reverse }) => {
    const [eventRef, setEventRef] = useState<HTMLElement | null>(null);
    const entryIcon = useMemo(
      () =>
        isValidElement(avatar) ? (
          avatar
        ) : (
          <AxAvatar bg="lightest" color="medium" title="" icon={avatar ?? AppIcons.iconFace} />
        ),
      [avatar]
    );

    useEffect(() => {
      if (ResizeObserver && !isScrolling) {
        if (eventRef) {
          const el = eventRef;
          const ob = new ResizeObserver(() => {
            measure && measure();
          });
          ob.observe(el);
          return () => ob.disconnect();
        }
      }
    }, [eventRef, isScrolling, measure, index]);

    return (
      <div
        className={`ax-timeline__entry`}
        data-reverse={reverse}
        data-noline={noline}
        style={style}
      >
        <div className="ax-timeline__entry--icon">{entryIcon}</div>
        <section ref={setEventRef} className="ax-timeline__entry--body">
          {children}
        </section>
      </div>
    );
  }
);
