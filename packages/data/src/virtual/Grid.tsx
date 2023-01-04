/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useIsRtl } from "@axux/core/dist/hooks/useIsRtl";
import {
  ChildrenProp,
  ElementProps,
  EmptyCallback,
} from "@axux/core/dist/types";
import memoize from "memoize-one";
import {
  CSSProperties,
  memo,
  ReactElement,
  Ref,
  useCallback,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, VariableSizeGrid as Grid } from "react-window";
import ResizeObserver from "resize-observer-polyfill";
import { Wrapper } from "./Wrapper";

export type GridRef = Pick<Grid, "scrollTo" | "scrollToItem"> & {
  hilight: (index: number) => void;
  unhilight: () => void;
};

export interface GridItemProps extends ChildrenProp {
  style: CSSProperties;
  index: number;
  rowIndex: number;
  columnIndex: number;
  isScrolling?: boolean;
  updateHeight: (rowIndex: number, columnIndex: number, height: number) => void;
}

export interface GridProps<T> extends ElementProps {
  children: (props: GridItemProps & { data: T }) => ReactElement;
  listRef?: Ref<GridRef | undefined>;
  colHeight?: number;
  colWidth?: number;
  /**
   * data list
   */
  items: T[];
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * load more callback
   */
  onLoadMore?: EmptyCallback;
}

/** ***************** Timeline item *******************/
// eslint-disable-next-line react/display-name
const Item = memo(
  ({
    style,
    index,
    rowIndex,
    columnIndex,
    children,
    updateHeight,
  }: GridItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    /** ***************** calculate height on resize *******************/
    useLayoutEffect(() => {
      const ob = new ResizeObserver(() => {
        const el = itemRef.current;
        if (el != null) {
          updateHeight(rowIndex, columnIndex, el.offsetHeight);
        }
      });
      itemRef.current != null && ob.observe(itemRef.current);
      return () => {
        ob.disconnect();
      };
    }, [rowIndex, columnIndex, parent]);

    /** ***************** component *******************/
    return (
      <div style={style} className="overflow-hidden">
        <div ref={itemRef} className="ax-grid__item" data-index={index}>
          {children}
        </div>
      </div>
    );
  },
  areEqual
);

const createItemList = memoize((items) => items);

/**
 * Grid virtual list
 */
const AxGridViewComponent = <T extends KeyValue>({
  className,
  children,
  items,
  colHeight = 48,
  colWidth = 550,
  listRef: ref,
  isLoading,
  onLoadMore,
  ...rest
}: GridProps<T>) => {
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);
  const [listRef, setList] = useState<AnyObject>();
  const cache = useMemo(() => new Map<number, number[]>(), []);

  const count = useDeferredValue(items.length);
  const itemList = createItemList(items);

  const colCount = useRef(0);

  useEffect(() => {
    listRef?._outerRef?.setLoading(isLoading);
  }, [listRef, isLoading]);

  useImperativeHandle(
    ref,
    () => {
      return (
        listRef && {
          hilight: (idx: number) => {
            if (idx >= 0) {
              listRef.scrollToItem({
                align: "center",
                rowIndex: Math.floor(idx / (colCount.current || 1)),
                columnIndex: 0,
              });
              containerRef.current
                ?.querySelector(`.hilight`)
                ?.classList.remove("hilight");
              setTimeout(() => {
                containerRef.current
                  ?.querySelector(`[data-index="${idx}"]`)
                  ?.classList.add("hilight");
              }, 500);
            }
          },
          unhilight: () =>
            containerRef.current
              ?.querySelector(`.hilight`)
              ?.classList.remove("hilight"),
          scrollTo: (...args) => listRef?.scrollTo(...args),
          scrollToItem: (...args) => listRef?.scrollToItem(...args),
        }
      );
    },
    [listRef]
  );

  /** ***************** list handlers *******************/
  useEffect(() => {
    const el = containerRef.current;
    const handlers = {
      scrollFirst: () => listRef.scrollToItem({ rowIndex: 0, columnIndex: 0 }),
      scrollLast: () =>
        listRef.scrollToItem({
          rowIndex: listRef.props.rowCount,
          columnIndex: 0,
        }),
      scrollDown: () =>
        listRef.scrollTo({
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          scrollTop: listRef.state.scrollTop + listRef.props.height,
        }),
      scrollUp: () =>
        listRef.scrollTo({
          scrollTop: listRef.state.scrollTop - listRef.props.height,
        }),
      loadMore: () => {
        !isLoading && onLoadMore?.();
      },
    };
    el?.addEventListener("scrollFirst", handlers.scrollFirst);
    el?.addEventListener("scrollLast", handlers.scrollLast);
    el?.addEventListener("scrollDown", handlers.scrollDown);
    el?.addEventListener("scrollUp", handlers.scrollUp);
    el?.addEventListener("loadMore", handlers.loadMore);

    return () => {
      el?.removeEventListener("scrollFirst", handlers.scrollFirst);
      el?.removeEventListener("scrollLast", handlers.scrollLast);
      el?.removeEventListener("scrollDown", handlers.scrollDown);
      el?.removeEventListener("scrollUp", handlers.scrollUp);
      el?.removeEventListener("loadMore", handlers.loadMore);
    };
  }, [listRef, count, isLoading, onLoadMore]);

  /** ***************** item height cache *******************/
  const updateCache = useCallback(
    (rowIndex: number, columnIndex: number, height: number) => {
      const size = cache.get(rowIndex) ?? [];
      if (height !== size[columnIndex] ?? colHeight) {
        size[columnIndex] = height;
        cache.set(rowIndex, size);
        listRef.resetAfterRowIndex(rowIndex);
      }
    },
    [listRef]
  );

  const outerElement = useMemo(() => Wrapper(), []);

  return (
    <div
      {...rest}
      ref={containerRef}
      className={`ax-virtual__container ${className ?? ""}`}
    >
      <AutoSizer>
        {({ width, height }) => {
          const cc = Math.floor((width - 84) / colWidth);
          colCount.current = cc;
          return (
            <Grid
              ref={setList}
              useIsScrolling
              width={width}
              height={height}
              rowCount={Math.ceil(count / cc)}
              itemData={itemList}
              columnCount={cc}
              direction={isRtl ? "rtl" : "ltr"}
              outerElementType={outerElement}
              columnWidth={() => Math.min(colWidth, (width - 84) / cc)}
              rowHeight={(index) =>
                Math.max(...(cache.get(index) ?? []), colHeight)
              }
            >
              {(props) =>
                children({
                  ...props,
                  index: props.rowIndex * cc + props.columnIndex,
                  data:
                    props.data.length > props.rowIndex * cc + props.columnIndex
                      ? props.data[props.rowIndex * cc + props.columnIndex]
                      : null,
                  updateHeight: updateCache,
                })
              }
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

AxGridViewComponent.displayName = "AxGridView";

const GenericMemo: <T>(c: T) => T & { Item: typeof Item } = memo;

export const AxGridView = GenericMemo(AxGridViewComponent);

AxGridView.Item = Item;
AxGridView.Item.displayName = "AxGridView.Item";
