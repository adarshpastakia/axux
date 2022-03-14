// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTextLoader } from "@axux/core";
import { RefProp } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  WindowScroller
} from "react-virtualized";
import { TimelineEntry } from "./Entry";
import { TimelineProps } from "./types";

interface ExtendedFC extends FC<TimelineProps & RefProp<HTMLDivElement>> {
  Entry: typeof TimelineEntry;
}

export const AxTimeline: ExtendedFC = ({
  list,
  children,
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
  const windowRef = useRef<WindowScroller>(null);
  const [scrollerRef, setScrollerRef] = useState<HTMLDivElement>();
  const [canScroll, setCanScroll] = useState(0);
  const [firstScroll, setFirstScroll] = useState<number | undefined>(undefined);

  useEffect(() => {
    setFirstScroll(initialScroll);
  }, [initialScroll]);

  const cache = useRef(
    new CellMeasurerCache({
      defaultHeight: 50,
      fixedWidth: true
    })
  );

  const checkScroll = useCallback(() => {
    if (scrollerRef) {
      const { scrollHeight, scrollTop, offsetHeight } = scrollerRef;
      if (scrollHeight === offsetHeight) setCanScroll(0);
      else if (scrollTop === 0) setCanScroll(1);
      else if (scrollTop + offsetHeight >= scrollHeight - 5) setCanScroll(2);
      else setCanScroll(3);

      if (scrollTop + offsetHeight >= scrollHeight - 10) {
        !isLoading && canLoadMore && onLoadMore && debounce(onLoadMore, 100)();
      }
      onScroll?.(scrollTop);
    }
  }, [scrollerRef, canLoadMore, isLoading, onLoadMore]);

  const doScroll = useCallback(
    (diff: number) => {
      if (scrollerRef) {
        const el = scrollerRef;
        let scrollTo;
        if (diff === -2) scrollTo = 0;
        else if (diff === 2) scrollTo = el.scrollHeight;
        else scrollTo = diff * el.offsetHeight + el.scrollTop;
        el.scrollTo({
          top: scrollTo,
          behavior: "auto"
        });
      }
    },
    [scrollerRef]
  );

  useLayoutEffect(() => {
    if (firstScroll !== undefined) {
      scrollerRef && (scrollerRef.scrollTop = firstScroll);
      windowRef.current?.updatePosition();
      setFirstScroll(undefined);
    }
  }, [firstScroll]);

  return (
    <div
      className={`ax-timeline__panel ${className ?? ""}`}
      onScroll={checkScroll}
      ref={(el) => setScrollerRef(el as HTMLDivElement)}
      {...aria}
    >
      <div className="ax-timeline__wrapper">
        <WindowScroller ref={windowRef} scrollElement={scrollerRef}>
          {({ height, isScrolling, registerChild, scrollTop }) => (
            <div>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div ref={registerChild}>
                    <List
                      autoHeight
                      width={width}
                      height={height}
                      isScrolling={isScrolling}
                      deferredMeasurementCache={cache.current}
                      rowHeight={cache.current.rowHeight}
                      rowCount={list.length}
                      rowRenderer={({ index, key, parent, style }: AnyObject) => (
                        <CellMeasurer
                          cache={cache.current}
                          columnIndex={0}
                          key={key}
                          parent={parent}
                          rowIndex={index}
                        >
                          {({ measure }) =>
                            children({
                              record: list[index],
                              index,
                              style,
                              measure,
                              isScrolling
                            })
                          }
                        </CellMeasurer>
                      )}
                      scrollTop={scrollTop}
                    />
                    {isLoading && <AxTextLoader />}
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
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
AxTimeline.Entry = TimelineEntry;

AxTimeline.displayName = "AxTimeline";
AxTimeline.Entry.displayName = "AxTimeline.Entry";
