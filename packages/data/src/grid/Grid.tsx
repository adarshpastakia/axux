// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTextLoader } from "@axux/core";
import { ElementProps, EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import { CSSProperties, FC, ReactNode, useCallback, useRef, useState } from "react";
import { GridItem } from "./Item";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  WindowScroller
} from "react-virtualized";

export interface GridProps extends ElementProps {
  list: KeyValue[];
  cellWidth?: string;
  isLoading?: boolean;
  canLoadMore?: boolean;
  hideScrollButtons?: boolean;
  onLoadMore?: EmptyCallback;
  sortOrder?: "asc" | "desc";
  onSort?: (order: "asc" | "desc") => void;
  children: (props: {
    style: CSSProperties;
    isScrolling: boolean;
    measure: () => void;
    index: number;
    record: KeyValue;
  }) => ReactNode;
}

interface ExtendedFC extends FC<GridProps> {
  Item: typeof GridItem;
}

export const AxGridView: ExtendedFC = ({
  list,
  children,
  isLoading,
  canLoadMore,
  onLoadMore,
  sortOrder,
  onSort,
  hideScrollButtons,
  cellWidth = "20em",
  className,
  ...aria
}) => {
  const [scrollerRef, setScrollerRef] = useState<HTMLDivElement>();
  const [canScroll, setCanScroll] = useState(0);

  const cache = useRef(
    new CellMeasurerCache({
      defaultWidth: 520,
      fixedWidth: true,
      defaultHeight: 50
    })
  );

  const checkScroll = useCallback(() => {
    if (scrollerRef) {
      const { scrollHeight, scrollTop, offsetHeight } = scrollerRef;
      if (scrollHeight === offsetHeight) setCanScroll(0);
      else if (scrollTop === 0) setCanScroll(1);
      else if (scrollTop + offsetHeight === scrollHeight) setCanScroll(2);
      else setCanScroll(3);

      if (scrollTop + offsetHeight >= scrollHeight - 10) {
        !isLoading && canLoadMore && onLoadMore && debounce(() => onLoadMore(), 100);
      }
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

  return (
    <div
      className={`ax-gridView__panel ${className ?? ""}`}
      onScroll={checkScroll}
      ref={(el) => setScrollerRef(el as HTMLDivElement)}
      style={{ "--cell-width": cellWidth } as AnyObject}
      {...aria}
    >
      <div className="ax-gridView__wrapper">
        <WindowScroller scrollElement={scrollerRef}>
          {({ height, isScrolling, registerChild, scrollTop }) => (
            <div>
              <AutoSizer disableHeight>
                {({ width }) => (
                  <div ref={registerChild}>
                    <Masonry
                      autoHeight
                      width={width}
                      height={height}
                      isScrolling={isScrolling}
                      cellMeasurerCache={cache.current}
                      cellPositioner={createMasonryCellPositioner({
                        cellMeasurerCache: cache.current,
                        columnWidth: 520,
                        columnCount: Math.floor(width / 536),
                        spacer: 16
                      })}
                      cellCount={list.length}
                      cellRenderer={({ index, key, parent, style }: AnyObject) => (
                        <CellMeasurer cache={cache.current} key={key} index={index} parent={parent}>
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
                  onClick={() => onSort && onSort("desc")}
                  data-active={sortOrder === "desc"}
                />
                <AxButton
                  icon={AppIcons.iconSortTimeAsc}
                  onClick={() => onSort && onSort("asc")}
                  data-active={sortOrder === "asc"}
                />
              </AxButton.Group>
            )}
          </div>
          {!hideScrollButtons && (
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
          )}
        </div>
      </div>
    </div>
  );
};
AxGridView.Item = GridItem;

AxGridView.displayName = "AxGridView";
AxGridView.Item.displayName = "AxGridView.Item";
