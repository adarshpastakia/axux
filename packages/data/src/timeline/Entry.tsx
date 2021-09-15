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
import { FC, Fragment, isValidElement, useLayoutEffect, useMemo, useRef } from "react";
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
  const eventRef = useRef<HTMLDivElement>(null);
  const entryIcon = useMemo(
    () => icon ?? (type === "comment" ? AppIcons.iconFace : AppIcons.iconDot),
    [icon, type]
  );
  useLayoutEffect(() => {
    if (ResizeObserver) {
      if (eventRef.current) {
        const el = eventRef.current;
        const ob = new ResizeObserver(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          () => (el.style.containIntrinsicSize = `3rem ${el.offsetHeight ?? 48}px`)
        );
        ob.observe(el);
        return () => ob.disconnect();
      }
    }
  }, []);
  return (
    <section
      className={`ax-timeline__entry ${className ?? ""}`}
      data-entry={type}
      ref={eventRef}
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
