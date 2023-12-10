/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxAnimation, AxButton, AxContent } from "@axux/core";
import { AxIcon, type IconProps } from "@axux/core/dist/icons/Icon";
import { type ChildrenProp, type EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce, isString } from "@axux/utilities";
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
  type ReactNode,
  type Ref,
} from "react";
import { areEqual } from "react-window";

export interface TimelineRef {
  scrollToItem: (index: number) => void;
  hilight: (index: number) => void;
  unhilight: () => void;
}

export interface TimelineItemProps
  extends ChildrenProp,
    Omit<IconProps, "onClick" | "size" | "icon"> {
  index: number;
  lastChild: boolean;
  updateHeight: (index: number, height: number) => void;

  /**
   * avatar size
   */
  size?: "sm" | "md" | "lg";
  /**
   * hide line
   */
  noLine?: boolean;
  /**
   * reverse layout
   */
  reverse?: boolean;
  /**
   * avatar icon
   */
  icon?: string | ReactNode;
  /**
   * icon className
   */
  iconClassName?: HTMLElement["className"];
}
export interface TimelineProps<T> {
  children: (props: {
    data: T;
    index: number;
    lastChild: boolean;
    updateHeight: (index: number, height: number) => void;
  }) => ReactElement;
  listRef?: Ref<TimelineRef | undefined>;
  height?: number;
  width?: number;
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

/** ***************** Timeline item *******************/
// eslint-disable-next-line react/display-name
const Item = memo(
  ({
    index,
    children,
    lastChild,
    noLine,
    reverse,
    iconClassName,
    updateHeight,
    icon = AppIcons.iconFace,
    bg,
    color,
    rtlFlip,
    size,
    viewBox,
    animate,
    ...rest
  }: TimelineItemProps) => {
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
        data-size={size}
        data-index={index}
        data-noline={noLine}
        data-reverse={reverse}
        data-last-child={lastChild}
        className="ax-timeline__item"
      >
        <div className="ax-timeline__avatar">
          {isString(icon) && (
            <AxIcon
              className={iconClassName}
              {...{ icon, bg, color, rtlFlip, viewBox, animate }}
            />
          )}
          {!isString(icon) && icon}
        </div>
        <div className="ax-timeline__body">{children}</div>
      </div>
    );
  },
  areEqual
);

const EXTRA_HEIGHT = 64;
const createItemList = memoize((items) => items);

const TimelineComponent = <T extends KeyValue>({
  items,
  children,
  height = 48,
  width = 960,
  hideScroller,
  isLoading,
  onLoadMore,
  onScroll,
  listRef,
}: TimelineProps<T>) => {
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
  const minsizeCache = useRef<number[]>([]);
  const ignoreScrollChange = useRef(false);
  const ignoreResetTimer = useRef<AnyObject>();
  const [scrollTop, setScrollTop] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

  const scrollCallback = useRef(debounce((idx) => onScroll?.(idx)));

  useEffect(() => {
    minsizeCache.current = new Array(count).fill(height);

    sizeCache.current = new Array(count)
      .fill(height)
      .map((h, i) => Math.max(h, sizeCache.current[i] ?? height));

    setScrollHeight(
      sizeCache.current.reduce<number>((t, h) => t + h, 0) + EXTRA_HEIGHT
    );
  }, [count, height]);

  // start item index
  useEffect(() => {
    let idx = 0;
    for (let tot = 0; idx < count; idx++) {
      tot += sizeCache.current[idx] ?? minsizeCache.current[idx];
      if (tot >= scrollTop) break;
    }
    scrollCallback.current(idx);
    setStartIndex(idx);
  }, [count, pageCount, scrollTop]);

  const [pagedList, otherHeight] = useMemo(() => {
    const index = Math.max(0, startIndex - pageCount);
    return [
      itemList.slice(index, startIndex + pageCount * 2),
      new Array(index)
        .fill(0)
        .reduce<number>(
          (t, _, i) => (t += sizeCache.current[i] ?? minsizeCache.current[i]),
          0
        ),
    ];
  }, [itemList, scrollTop, pageCount, startIndex]);

  useEffect(() => {
    if (scrollerRef.current) {
      const el = scrollerRef.current;
      const ob = new ResizeObserver(() => {
        setPageCount(
          Math.round((scrollerRef.current?.offsetHeight ?? 0) / height)
        );
      });
      setPageCount(
        Math.round((scrollerRef.current?.offsetHeight ?? 0) / height)
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
    (index: number, height: number) => {
      const oldHeight = sizeCache.current[index] ?? minsizeCache.current[index];
      if (height !== oldHeight) {
        sizeCache.current[index] = height;
      }
      setScrollHeight(
        minsizeCache.current.reduce<number>(
          (t, h, i) => (t += sizeCache.current[i] ?? h),
          0
        ) + EXTRA_HEIGHT
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
    [startIndex]
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
        setStartIndex(index);
        setTimeout(() => {
          scrollerRef.current
            ?.querySelector(`[data-index="${index}"]`)
            ?.scrollIntoView({ behavior: "instant", block: "start" });
          setTimeout(() => (ignoreScrollChange.current = false), 10);
        }, 100);
      },
    }),
    []
  );

  return (
    <AxContent ref={scrollerRef} onScroll={handleScroll}>
      <div className="ax-timeline2">
        <div
          className="ax-timeline__scroller"
          style={{ height: scrollHeight, maxWidth: width }}
        >
          <div style={{ height: otherHeight }} />
          {pagedList.map(({ __index__: index, ...data }: AnyObject) =>
            children({
              data,
              index,
              key: index,
              updateHeight: updateCache,
              lastChild: +index + 1 === count,
            } as AnyObject)
          )}
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
TimelineComponent.displayName = "AxCssTimeline";

const GenericMemo: <T>(c: T) => T & { Item: typeof Item } = memo;

export const AxTimeline = GenericMemo(TimelineComponent);

AxTimeline.Item = Item;
AxTimeline.Item.displayName = "AxTimeline.Item";
