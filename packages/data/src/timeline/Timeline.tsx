// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTextLoader } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import { FC, ReactNode, useCallback, useLayoutEffect, useRef, useState } from "react";
import { TimelineEntry } from "./Entry";
import { ElementProps, EmptyCallback } from "@axux/core/dist/types";

interface TimelineProps<T = KeyValue> extends ElementProps {
  list: T[];
  noLine?: boolean;
  isLoading?: boolean;
  canLoadMore?: boolean;
  onLoadMore?: EmptyCallback;
  sortOrder?: "asc" | "desc";
  onSort?: (order: "asc" | "desc") => void;
  onScroll?: (top: number) => void;
  initialScroll?: number;
  actions?: ReactNode;
  avatar?: (props: { index: number; record: T }) => string | ReactNode;
  reverse?: (props: { index: number; record: T }) => boolean;
  children: (props: { index: number; record: T }) => ReactNode;
}

export const AxTimeline: FC<TimelineProps> = ({
  list,
  avatar,
  reverse,
  children,
  noLine,
  actions,
  className,
  isLoading,
  canLoadMore,
  onLoadMore,
  onScroll,
  initialScroll = 0,
  sortOrder,
  onSort,
  ...aria
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(0);

  const checkScroll = useCallback(() => {
    if (scrollerRef.current) {
      const { scrollHeight, scrollTop, offsetHeight } = scrollerRef.current;
      if (scrollHeight === offsetHeight) setCanScroll(0);
      else if (scrollTop === 0) setCanScroll(1);
      else if (scrollTop + offsetHeight === scrollHeight) setCanScroll(2);
      else setCanScroll(3);

      if (scrollTop + offsetHeight >= scrollHeight - 10) {
        !isLoading && canLoadMore && onLoadMore && debounce(() => onLoadMore(), 100)();
      }
      onScroll?.(scrollTop);
    }
  }, [canLoadMore, isLoading, onLoadMore]);

  const doScroll = useCallback((diff: number) => {
    if (scrollerRef.current) {
      const el = scrollerRef.current;
      let scrollTo;
      if (diff === -2) scrollTo = 0;
      else if (diff === 2) scrollTo = el.scrollHeight;
      else scrollTo = diff * el.offsetHeight + el.scrollTop;
      el.scrollTo({
        top: scrollTo,
        behavior: "auto"
      });
    }
  }, []);

  useLayoutEffect(() => {
    initialScroll && scrollerRef.current?.scrollTo({ top: initialScroll, behavior: "auto" });
  }, [initialScroll]);

  useLayoutEffect(() => {
    if (ResizeObserver) {
      const ob = new ResizeObserver(checkScroll);
      if (scrollerRef.current && scrollerRef.current.firstElementChild) {
        ob.observe(scrollerRef.current.firstElementChild);
      }
      return () => ob.disconnect();
    }
  }, [checkScroll]);

  return (
    <div
      className={`ax-timeline__panel ${className ?? ""}`}
      onScroll={checkScroll}
      ref={scrollerRef}
      {...aria}
    >
      <div className="ax-timeline__wrapper" data-noline={noLine}>
        <div>
          {list.map((record, index) => {
            return (
              <TimelineEntry
                key={index}
                index={index}
                record={record}
                avatar={avatar?.({ record, index })}
                reverse={reverse?.({ record, index })}
                callback={children}
              />
            );
          })}
          {isLoading && <AxTextLoader />}
        </div>
        <div>
          <div>
            {onSort && (
              <AxButton.Group vertical>
                <AxButton
                  icon={AppIcons.iconSortTimeDesc}
                  onClick={() => onSort("desc")}
                  data-active={sortOrder === "desc"}
                />
                <AxButton
                  icon={AppIcons.iconSortTimeAsc}
                  onClick={() => onSort("asc")}
                  data-active={sortOrder === "asc"}
                />
              </AxButton.Group>
            )}
            {actions}
          </div>
          <div className="ax-col--fill" />
          <AxButton.Group vertical>
            <AxButton
              isDisabled={(canScroll | 1) === 1}
              onClick={() => doScroll(-2)}
              icon={AppIcons.iconChevronTop}
            />
            <AxButton
              isDisabled={(canScroll | 1) === 1}
              onClick={() => doScroll(-1)}
              icon={AppIcons.iconCaretTop}
            />
            <AxButton
              isDisabled={(canScroll | 2) === 2}
              onClick={() => doScroll(1)}
              icon={AppIcons.iconCaretDown}
            />
            <AxButton
              isDisabled={(canScroll | 2) === 2}
              onClick={() => doScroll(2)}
              icon={AppIcons.iconChevronDown}
            />
          </AxButton.Group>
        </div>
      </div>
    </div>
  );
};
AxTimeline.displayName = "AxTimeline";
