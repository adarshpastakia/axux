/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { useIsRtl } from "@axux/core/dist/hooks/useIsRtl";
import { IconProps } from "@axux/core/dist/icons/Icon";
import {
  ChildrenProp,
  ElementProps,
  EmptyCallback,
} from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { isString } from "@axux/utilities";
import memoize from "memoize-one";
import {
  CSSProperties,
  memo,
  ReactElement,
  ReactNode,
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
import { areEqual, VariableSizeList as List } from "react-window";
import ResizeObserver from "resize-observer-polyfill";
import { Wrapper } from "./Wrapper";

export type TimelineRef = Pick<List, "scrollTo" | "scrollToItem"> & {
  hilight: (index: number) => void;
  unhilight: () => void;
};

export interface TimelineItemProps
  extends ChildrenProp,
    ElementProps,
    Omit<IconProps, "onClick" | "size" | "icon"> {
  style: CSSProperties;
  index: number;
  lastChild: boolean;
  isScrolling?: boolean;
  updateHeight: (index: number, height: number) => void;
  /**
   * avatar size
   */
  size?: "sm" | "md";
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

export interface TimelineProps<T> extends ElementProps {
  children: (props: TimelineItemProps & { data: T }) => ReactElement;
  listRef?: Ref<TimelineRef | undefined>;
  minHeight?: number;
  maxWidth?: number;
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
    children,
    lastChild,
    isScrolling,
    updateHeight,
    noLine,
    reverse,
    className,
    iconClassName,
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
      const ob = new ResizeObserver(() => {
        const el = itemRef.current;
        if (el != null) {
          updateHeight(index, el.offsetHeight);
        }
      });
      itemRef.current != null && ob.observe(itemRef.current);
      return () => {
        ob.disconnect();
      };
    }, [index, parent]);

    /** ***************** component *******************/
    return (
      <div style={style} className="overflow-hidden">
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
          <div className={isScrolling ? "animate-pulse" : ""}>
            <div className="ax-timeline__avatar">
              {isString(icon) && (
                <AxIcon
                  className={iconClassName}
                  {...{ icon, bg, color, rtlFlip, viewBox, animate }}
                />
              )}
              {!isString(icon) && icon}
            </div>
          </div>
          <div className={className}>{children}</div>
        </div>
      </div>
    );
  },
  areEqual
);

const createItemList = memoize((items) => items);

/**
 * Timeline virtual list
 */
const AxTimelineComponent = <T extends KeyValue>({
  className,
  children,
  items,
  maxWidth,
  minHeight = 48,
  isLoading,
  onLoadMore,
  listRef: ref,
  ...rest
}: TimelineProps<T>) => {
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);
  const [listRef, setList] = useState<AnyObject>();
  const cache = useMemo(() => new Map<number, number>(), []);

  const count = useDeferredValue(items.length);
  const itemList = createItemList(items);

  useEffect(() => {
    listRef?._outerRef.setLoading(isLoading);
  }, [listRef, isLoading]);

  useImperativeHandle(
    ref,
    () => {
      return (
        listRef && {
          hilight: (idx: number) => {
            if (idx >= 0) {
              listRef.scrollToItem(idx, "center");
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
      scrollFirst: () => listRef.scrollToItem(0),
      scrollLast: () => listRef.scrollToItem(count),
      scrollDown: () =>
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        listRef.scrollTo(listRef.state.scrollOffset + listRef.props.height),
      scrollUp: () =>
        listRef.scrollTo(listRef.state.scrollOffset - listRef.props.height),
      loadMore: () => !isLoading && onLoadMore?.(),
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
    (index: number, height: number) => {
      if (height !== (cache.get(index) ?? minHeight)) {
        cache.set(index, height);
        listRef.resetAfterIndex(index);
      }
    },
    [listRef]
  );

  const outerElement = useMemo(() => Wrapper(maxWidth), [maxWidth]);

  return (
    <div
      {...rest}
      ref={containerRef}
      style={{ "--maxw": maxWidth } as AnyObject}
      className={`ax-virtual__container ax-timeline ${className ?? ""}`}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={setList}
            useIsScrolling
            width={width}
            height={height}
            itemCount={count}
            itemData={itemList}
            direction={isRtl ? "rtl" : "ltr"}
            outerElementType={outerElement}
            itemSize={(index) =>
              cache.get(index) ??
              Math.max(minHeight, ...Array.from(cache.values()))
            }
          >
            {(props) =>
              children({
                ...props,
                updateHeight: updateCache,
                data:
                  props.data.length > props.index
                    ? props.data[props.index]
                    : null,
                lastChild: props.index === count - 1,
              })
            }
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
AxTimelineComponent.displayName = "AxTimeline";

const GenericMemo: <T>(c: T) => T & { Item: typeof Item } = memo;

export const AxTimeline = GenericMemo(AxTimelineComponent);

AxTimeline.Item = Item;
AxTimeline.Item.displayName = "AxTimeline.Item";
