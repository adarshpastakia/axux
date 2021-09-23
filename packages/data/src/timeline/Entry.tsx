// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxContent, AxPanel, AxText } from "@axux/core";
import { HeaderProps } from "@axux/core/dist/appbars/Header";
import { ElementProps } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxDateDisplay } from "@axux/date";
import { isString } from "@axux/utilities";
import { FC, Fragment, isValidElement, useEffect, useMemo, useState } from "react";
import { TimelineRecord } from "./types";

export interface TimelineEntryProps extends TimelineRecord {
  headerProps?: Omit<HeaderProps, "title" | "onClick" | "onBack">;
  reverse?: boolean;
  noline?: boolean;
  isCollapsed?: boolean;
  isCollapsable?: boolean;
}

export const TimelineEntry: FC<Partial<TimelineEntryProps> & ElementProps> = ({
  type = "comment",
  event,
  icon,
  image,
  noline,
  reverse,
  isCollapsed,
  isCollapsable,
  iconBg = "light",
  iconColor = "contrast",
  headerProps = { bg: "empty" },
  timestamp = new Date(),
  username,
  sidebar,
  actions,
  className,
  children
}) => {
  const [eventRef, setEventRef] = useState<HTMLElement | null>(null);
  const entryIcon = useMemo(
    () => icon ?? (type === "comment" ? AppIcons.iconFace : AppIcons.iconDot),
    [icon, type]
  );
  useEffect(() => {
    if (ResizeObserver) {
      if (eventRef && eventRef.parentElement) {
        const el = eventRef;
        const ph = eventRef.parentElement;
        const ob = new ResizeObserver(() => {
          ph.style.height = `${el.offsetHeight ?? 48}px`;
        });
        ob.observe(el);
        return () => ob.disconnect();
      }
    }
  }, [eventRef]);

  return (
    <section
      ref={setEventRef}
      className={`${className ?? ""}`}
      data-entry={type}
      data-reverse={reverse}
      data-noline={noline}
    >
      <div className="ax-timeline__entry--icon">
        <AxAvatar
          size={type === "comment" ? "md" : "sm"}
          title=""
          image={image}
          bg={iconBg as AnyObject}
          icon={entryIcon}
          color={iconColor as AnyObject}
        />
      </div>
      <AxPanel
        className="ax-timeline__entry--body"
        maxHeight="80vh"
        paper={type === "comment"}
        isCollapsable={isCollapsable}
        isCollapsed={isCollapsed}
      >
        <AxPanel.Header
          {...headerProps}
          className={`ax-timeline__entry--head ${headerProps.className ?? ""}`}
          title={
            <Fragment>
              <AxText weight="medium">{username}</AxText>
              <AxText>{event}</AxText>
              <AxDateDisplay date={timestamp} format="dd MMM yyyy HH:mm:ss" />
            </Fragment>
          }
        >
          {actions}
        </AxPanel.Header>
        {type === "comment" && (
          <AxContent>
            {isString(children) && (
              <AxText block clip={3}>
                {children}
              </AxText>
            )}
            {isValidElement(children) && children}
          </AxContent>
        )}
      </AxPanel>
      {sidebar && <div className="ax-timeline__entry--side">{sidebar}</div>}
    </section>
  );
};
