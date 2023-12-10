/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxAnimation, AxButton, AxContent } from "@axux/core";
import { type ChildrenProp, type EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import memoize from "memoize-one";
import {
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ReactElement,
  type Ref,
} from "react";
import { areEqual } from "react-window";

export interface GridRef {
  scrollToItem: (index: number) => void;
  hilight: (index: number) => void;
  unhilight: () => void;
}

export interface GridItemProps extends ChildrenProp {
  index: number;
  lastChild: boolean;
  updateHeight: (index: number, height: number) => void;
}
export interface GridProps<T> {
  children: (props: {
    data: T;
    index: number;
    lastChild: boolean;
    updateHeight: (index: number, height: number) => void;
  }) => ReactElement;
  listRef?: Ref<GridRef | undefined>;
  height?: number;
  width?: number;
  columns?: number;
  /**
   * data list
   */
  items: T[];
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * hide scroll buttons
   */
  hideScroller?: boolean;
  /**
   * load more callback
   */
  onLoadMore?: EmptyCallback;

  onScroll?: (top: number) => void;
}

/** ***************** Grid item *******************/
// eslint-disable-next-line react/display-name
const Item = memo(
  ({ index, children, lastChild, updateHeight, ...rest }: GridItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    /** ***************** calculate height on resize *******************/
    useLayoutEffect(() => {
      const el = itemRef.current;
      const ob = new ResizeObserver(() => {
        if (el != null) {
          updateHeight(index, el.offsetHeight);
        }
      });
      el && ob.observe(el.lastElementChild as HTMLElement);
      return () => {
        el && ob.unobserve(el.lastElementChild as HTMLElement);
        ob.disconnect();
      };
    }, [index]);

    /** ***************** component *******************/
    return (
      <div
        {...rest}
        ref={itemRef}
        data-index={index}
        data-last-child={lastChild}
        className="ax-grid__item"
      >
        {children}
      </div>
    );
  },
  areEqual
);

const EXTRA_HEIGHT = 64;
const DEFAULT_WIDTH = 480;
const createItemList = memoize((items) => items);

const GridComponent = <T extends KeyValue>({
  items,
  children,
  height = 48,
  width = DEFAULT_WIDTH,
  columns,
  hideScroller,
  isLoading,
  onLoadMore,
  onScroll,
  listRef,
}: GridProps<T>) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const count = useDeferredValue(items.length);
  const itemList: Array<T & { __index__: number }> = createItemList(
    items.map((item: AnyObject, idx) => {
      item.__index__ = idx;
      return item;
    })
  );

  const sizeCache = useRef<number[]>([]);
  const rowsizeCache = useRef<number[]>([]);
  const ignoreScrollChange = useRef(false);
  const ignoreResetTimer = useRef<AnyObject>();
  const [scrollTop, setScrollTop] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [columnCount, setColumnCount] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const scrollCallback = useRef(debounce((idx) => onScroll?.(idx)));

  useEffect(() => {
    rowsizeCache.current = new Array(Math.ceil(count / columnCount))
      .fill(height)
      .map((h, i) => Math.max(h, rowsizeCache.current[i] ?? height));

    setScrollHeight(
      rowsizeCache.current.reduce<number>((t, h) => t + h, 0) + EXTRA_HEIGHT
    );
  }, [count, columnCount, height]);

  // start item index
  useEffect(() => {
    let idx = 0;
    for (let tot = 0; idx < rowsizeCache.current.length; idx++) {
      tot += rowsizeCache.current[idx] ?? height;
      if (tot >= scrollTop) break;
    }
    scrollCallback.current(idx * columnCount);
    setStartIndex(idx * columnCount);
  }, [count, pageCount, scrollTop, columnCount, height]);

  const [pagedList, otherHeight] = useMemo(() => {
    if (columnCount > 0) {
      const index = Math.max(0, startIndex - pageCount * columnCount);
      return [
        itemList.slice(index, startIndex + pageCount * columnCount * 2),
        new Array(index / columnCount)
          .fill(0)
          .reduce<number>(
            (t, _, i) =>
              t +
              Math.max(
                ...sizeCache.current
                  .slice(i * columnCount, i * columnCount + columnCount)
                  .filter(Boolean),
                height
              ),
            0
          ),
      ];
    }
    return [[], 0];
  }, [itemList, scrollTop, pageCount, startIndex, columnCount]);

  useEffect(() => {
    if (scrollerRef.current) {
      const el = scrollerRef.current;
      const ob = new ResizeObserver(() => {
        setPageCount(
          Math.round((scrollerRef.current?.offsetHeight ?? 0) / height)
        );
        setColumnCount(
          columns ??
            Math.max(
              1,
              Math.floor(
                ((scrollerRef.current?.offsetWidth ?? 800) - 32) / (width + 16)
              )
            )
        );
      });
      setPageCount(
        Math.round((scrollerRef.current?.offsetHeight ?? 0) / height)
      );
      setColumnCount(
        columns ??
          Math.max(
            1,
            Math.floor(
              ((scrollerRef.current?.offsetWidth ?? 800) - 32) / (width + 16)
            )
          )
      );
      ob.observe(el);

      return () => {
        ob.unobserve(el);
        ob.disconnect();
      };
    }
  }, [scrollerRef.current]);

  /** ***************** item height cache *******************/
  const updateCache = useCallback(
    (index: number, colHeight: number) => {
      const oldHeight = sizeCache.current[index] ?? height;
      if (colHeight !== oldHeight) {
        sizeCache.current[index] = colHeight;
        const row = Math.floor(index / columnCount);
        rowsizeCache.current[row] = Math.max(
          height,
          ...sizeCache.current
            .slice(row * columnCount, row * columnCount + columnCount)
            .filter(Boolean)
        );
      }
      setScrollHeight(
        rowsizeCache.current.reduce<number>((t, h) => t + h, 0) + EXTRA_HEIGHT
      );
      if (index < startIndex) {
        clearTimeout(ignoreResetTimer.current);
        ignoreScrollChange.current = true;
        ignoreResetTimer.current = setTimeout(
          () => (ignoreScrollChange.current = false),
          100
        );
      }
    },
    [startIndex, count, columnCount]
  );

  const handleScroll = useCallback(
    (evt: AnyObject) => {
      const { scrollTop, scrollHeight, offsetHeight } = evt.currentTarget;
      if (!ignoreScrollChange.current)
        setScrollTop(evt.currentTarget.scrollTop);

      if (!isLoading && +scrollTop + +offsetHeight >= +scrollHeight)
        onLoadMore?.();
    },
    [isLoading]
  );

  const scrollActive = useMemo(() => {
    const {
      scrollTop = 0,
      scrollHeight = 0,
      offsetHeight = 0,
    } = (scrollerRef.current ?? {}) as HTMLElement;
    if (scrollHeight === offsetHeight) return 0;

    if (scrollTop === 0) return 1;
    if (scrollTop + offsetHeight >= scrollHeight - EXTRA_HEIGHT) return 2;

    return 3;
  }, [scrollTop, scrollHeight]);

  useImperativeHandle(
    listRef,
    () => ({
      hilight(index) {
        scrollerRef.current
          ?.querySelector(".hilight")
          ?.classList.remove("hilight");
        scrollerRef.current
          ?.querySelector(`[data-index="${index}"]`)
          ?.classList.add("hilight");
        setTimeout(() => {
          scrollerRef.current
            ?.querySelector(`[data-index="${index}"]`)
            ?.scrollIntoView({ behavior: "instant", block: "nearest" });
        }, 100);
      },
      unhilight() {
        scrollerRef.current
          ?.querySelector(".hilight")
          ?.classList.remove("hilight");
      },
      scrollToItem(index) {
        ignoreScrollChange.current = true;
        setStartIndex(index - (index % columnCount));
        setTimeout(() => {
          scrollerRef.current
            ?.querySelector(`[data-index="${index}"]`)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
          setTimeout(() => (ignoreScrollChange.current = false), 10);
        }, 100);
      },
    }),
    [columnCount]
  );

  return (
    <AxContent ref={scrollerRef} onScroll={handleScroll}>
      <div className="ax-grid2 relative">
        <div
          className="ax-grid__scroller"
          style={{
            height: scrollHeight,
            maxWidth: columns ? undefined : (width + 16) * columnCount,
          }}
        >
          <div style={{ height: otherHeight }} />
          <div
            className="ax-grid__grid"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              maxWidth: columns ? undefined : (width + 16) * columnCount,
            }}
          >
            {pagedList.map(({ __index__: index, ...data }: AnyObject) =>
              children({
                data,
                index,
                key: index,
                updateHeight: updateCache,
                lastChild: +index + 1 === count,
              } as AnyObject)
            )}
          </div>
          <div className="h-16" ref={loaderRef}>
            {isLoading && <AxAnimation.Card showIcon />}
          </div>
        </div>
        {!hideScroller && (
          <div className="ax-virtual__tools">
            <AxButton.Group isVertical variant="flat">
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll to top"
                icon={AppIcons.iconChevronUp}
                isDisabled={(scrollActive & 2) === 0}
                onClick={() =>
                  scrollerRef.current?.scrollTo({ top: 0, behavior: "smooth" })
                }
              />
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll up"
                icon={AppIcons.iconCaretUp}
                isDisabled={(scrollActive & 2) === 0}
                onClick={() =>
                  scrollerRef.current?.scrollTo({
                    top:
                      (scrollerRef.current?.scrollTop ?? 0) -
                        scrollerRef.current?.offsetHeight ?? 0,
                    behavior: "smooth",
                  })
                }
              />
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll down"
                icon={AppIcons.iconCaretDown}
                isDisabled={scrollActive % 2 === 0}
                onClick={() =>
                  scrollerRef.current?.scrollTo({
                    top:
                      (scrollerRef.current?.scrollTop ?? 0) +
                        scrollerRef.current?.offsetHeight ?? 0,
                    behavior: "smooth",
                  })
                }
              />
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll to bottom"
                icon={AppIcons.iconChevronDown}
                isDisabled={scrollActive % 2 === 0}
                onClick={() =>
                  scrollerRef.current?.scrollTo({
                    top:
                      (scrollerRef.current?.scrollHeight ?? 0) -
                      (scrollerRef.current?.offsetHeight ?? 0) -
                      EXTRA_HEIGHT,
                    behavior: "smooth",
                  })
                }
              />
            </AxButton.Group>
          </div>
        )}
      </div>
    </AxContent>
  );
};
GridComponent.displayName = "AxCssGrid";

const GenericMemo: <T>(c: T) => T & { Item: typeof Item } = memo;

export const AxGrid = GenericMemo(GridComponent);

AxGrid.Item = Item;
AxGrid.Item.displayName = "AxGrid.Item";
