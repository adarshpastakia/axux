// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxContent, AxPanel, AxText } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxDateDisplay } from "@axux/date";
import { isString } from "@axux/utilities";
import {
  CSSProperties,
  FC,
  Fragment,
  isValidElement,
  memo,
  useEffect,
  useMemo,
  useState
} from "react";
import { TimelineRecord } from "./types";

export interface TimelineEntryProps {
  record: TimelineRecord;
  // Virtualized props
  index?: number;
  style?: CSSProperties;
  isScrolling?: boolean;
  measure: () => void;
}

export const TimelineEntry: FC<TimelineEntryProps> = memo(
  ({
    record: {
      type = "comment",
      event,
      icon,
      image,
      iconBg = "light",
      iconColor = "contrast",
      timestamp = new Date(),
      username,
      footer,
      sidebar,
      actions,
      isCollapsed,
      isCollapsable,
      noline,
      reverse,
      headerProps = { bg: "empty" },
      headerAppend,
      className
    },
    children,
    isScrolling,
    measure,
    index,
    style
  }) => {
    const [eventRef, setEventRef] = useState<HTMLElement | null>(null);
    const entryIcon = useMemo(
      () => icon ?? (type === "comment" ? AppIcons.iconFace : AppIcons.iconDot),
      [icon, type]
    );

    useEffect(() => {
      if (ResizeObserver && !isScrolling) {
        if (eventRef) {
          const el = eventRef;
          const ob = new ResizeObserver(() => {
            const { offsetWidth: width, offsetHeight: height } = el;
            console.log("======>", index, { width, height });
            measure && measure();
          });
          ob.observe(el);
          return () => ob.disconnect();
        }
      }
    }, [eventRef, isScrolling, measure, index]);

    return (
      <div
        className={`ax-timeline__entry ${className ?? ""}`}
        data-entry={type}
        data-reverse={reverse}
        data-noline={noline}
        style={style}
      >
        <section ref={setEventRef} className={className}>
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
                  {headerAppend}
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
            {footer && (
              <AxPanel.Footer className="ax-timeline__entry--foot">{footer}</AxPanel.Footer>
            )}
          </AxPanel>
          {sidebar && <div className="ax-timeline__entry--side">{sidebar}</div>}
        </section>
      </div>
    );
  }
);
