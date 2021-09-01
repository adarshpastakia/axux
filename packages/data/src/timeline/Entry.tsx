// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxContent, AxPanel, AxText } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxDateDisplay } from "@axux/date";
import { isString } from "@axux/utilities";
import { FC, Fragment, isValidElement, useLayoutEffect, useMemo, useRef } from "react";
import { TimelineRecord } from "./types";

export const TimelineEntry: FC<Partial<TimelineRecord>> = ({
  type = "comment",
  event,
  icon,
  iconBg = "light",
  iconColor = "contrast",
  timestamp = new Date(),
  username,
  actions,
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
    <section className="ax-timeline__entry" data-entry={type} ref={eventRef}>
      <div className="ax-timeline__entry--icon">
        <AxAvatar
          size={type === "comment" ? "md" : "sm"}
          title=""
          bg={iconBg as AnyObject}
          icon={entryIcon}
          color={iconColor as AnyObject}
        />
      </div>
      <AxPanel className="ax-timeline__entry--body" maxHeight="80vh" paper={type === "comment"}>
        <AxPanel.Header
          className="ax-timeline__entry--head"
          bg="lightest"
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
    </section>
  );
};
