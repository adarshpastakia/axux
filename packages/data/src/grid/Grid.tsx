// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTextLoader } from "@axux/core";
import { useIsRtl } from "@axux/core/dist/internals/useIsRtl";
import { ElementProps, EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import {
  CSSProperties,
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  createMasonryCellPositioner,
  Masonry,
  WindowScroller
} from "react-virtualized";
import { GridItem } from "./Item";

export interface GridProps extends ElementProps {
  list: KeyValue[];
  cellWidth?: number;
  cellHeight?: number;
  isLoading?: boolean;
  canLoadMore?: boolean;
  hideScrollButtons?: boolean;
  onLoadMore?: EmptyCallback;
  onScroll?: (top: number) => void;
  sortOrder?: "asc" | "desc";
  initialScroll?: number;
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
  className,
  isLoading,
  canLoadMore,
  onLoadMore,
  sortOrder,
  onSort,
  onScroll,
  initialScroll = 0,
  hideScrollButtons,
  cellWidth = 520,
  cellHeight = 50,
  ...aria
}) => {
  const { isRtl } = useIsRtl();
  const windowRef = useRef<WindowScroller>(null);
  const [scrollerRef, setScrollerRef] = useState<HTMLDivElement>();
  const [masonryRef, setMasonryRef] = useState<Masonry>();
  const [canScroll, setCanScroll] = useState(0);
  const [firstScroll, setFirstScroll] = useState<number | undefined>(undefined);

  useEffect(() => {
    setFirstScroll(initialScroll);
  }, [initialScroll]);

  const cache = useRef(
    new CellMeasurerCache({
      defaultWidth: cellWidth,
      fixedWidth: true,
      defaultHeight: cellHeight
    })
  );
  const [width, setWidth] = useState(1200);
  const positioner = useRef(
    createMasonryCellPositioner({
      cellMeasurerCache: cache.current,
      columnWidth: cellWidth,
      columnCount: Math.floor(width / (cellWidth + 16)),
      spacer: 16
    })
  );

  useEffect(() => {
    cache.current.clearAll();
    positioner.current.reset({
      columnWidth: cellWidth,
      columnCount: Math.floor(width / (cellWidth + 16)),
      spacer: 16
    });
    masonryRef && masonryRef.clearCellPositions();
  }, [cellWidth, masonryRef, width]);

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
      className={`ax-gridView__panel ${className ?? ""}`}
      onScroll={checkScroll}
      ref={(el) => setScrollerRef(el as HTMLDivElement)}
      {...aria}
    >
      <div className="ax-gridView__wrapper">
        <WindowScroller ref={windowRef} scrollElement={scrollerRef}>
          {({ height, isScrolling, registerChild, scrollTop }) => (
            <div>
              <AutoSizer disableHeight height={height} onResize={({ width }) => setWidth(width)}>
                {({ width }) => (
                  <div ref={registerChild}>
                    {list.length > 0 && (
                      <Masonry
                        autoHeight
                        width={width}
                        height={height}
                        rowDirection={isRtl ? "rtl" : "ltr"}
                        ref={(e) => setMasonryRef(e as Masonry)}
                        isScrolling={isScrolling}
                        cellMeasurerCache={cache.current}
                        cellPositioner={positioner.current}
                        cellCount={list.length}
                        cellRenderer={({ index, key, parent, style }: AnyObject) => (
                          <CellMeasurer
                            cache={cache.current}
                            key={key}
                            index={index}
                            parent={parent}
                          >
                            {({ measure }) =>
                              children({
                                record: list[index],
                                index,
                                style: { ...style, direction: isRtl ? "rtl" : "ltr" },
                                measure,
                                isScrolling
                              })
                            }
                          </CellMeasurer>
                        )}
                        scrollTop={scrollTop}
                      />
                    )}
                    {isLoading && <AxTextLoader />}
                  </div>
                )}
              </AutoSizer>
            </div>
          )}
        </WindowScroller>
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
          <div className="ax-col--fill" />
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
