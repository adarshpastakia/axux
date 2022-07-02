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
import {
  CSSProperties,
  FC,
  memo,
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, VariableSizeList as List } from "react-window";
import ResizeObserver from "resize-observer-polyfill";
import { Wrapper } from "./Wrapper";

export interface TimelineItemProps
  extends ChildrenProp,
    ElementProps,
    Omit<IconProps, "onClick" | "size"> {
  style: CSSProperties;
  index: number;
  lastChild: boolean;
  isScrolling: boolean;
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
   * icon className
   */
  iconClassName?: HTMLElement["className"];
}

export interface TimelineProps extends ElementProps {
  children: (props: TimelineItemProps) => ReactElement;
  /**
   * item count
   */
  count: number;
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * load more callback
   */
  onLoadMore?: EmptyCallback;
}

/******************* Timeline item *******************/
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

    /******************* calculate height on resize *******************/
    useLayoutEffect(() => {
      const ob = new ResizeObserver(() => {
        const el = itemRef.current;
        if (el) {
          updateHeight(index, el.offsetHeight);
        }
      });
      itemRef.current && ob.observe(itemRef.current);
      return () => {
        ob.disconnect();
      };
    }, [index, parent]);

    /******************* component *******************/
    return (
      <div style={style} className="overflow-hidden">
        <div
          {...rest}
          ref={itemRef}
          data-size={size}
          data-noline={noLine}
          data-reverse={reverse}
          data-last-child={lastChild}
          className={`ax-timeline__item ${className ?? ""}`}
        >
          <div className={isScrolling ? "animate-pulse" : ""}>
            <AxIcon
              className={`ax-timeline__avatar ${iconClassName}`}
              {...{ icon, bg, color, rtlFlip, viewBox, animate }}
            />
          </div>
          <div>{children}</div>
        </div>
      </div>
    );
  },
  areEqual
);

/**
 * Timeline virtual list
 */
export const AxTimeline: FC<TimelineProps> & { Item: typeof Item } = ({
  className,
  children,
  count,
  isLoading,
  onLoadMore,
  ...rest
}) => {
  const isRtl = useIsRtl();
  const containerRef = useRef<HTMLDivElement>(null);
  const [listRef, setList] = useState<AnyObject>();
  const cache = useMemo(() => new Map<number, number>(), []);

  useEffect(() => {
    listRef?._outerRef.setLoading(isLoading);
  }, [listRef, isLoading]);

  /******************* list handlers *******************/
  useEffect(() => {
    const el = containerRef.current;
    const handlers = {
      scrollFirst: () => listRef.scrollToItem(0),
      scrollLast: () => listRef.scrollToItem(count),
      scrollDown: () =>
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

  /******************* item height cache *******************/
  const updateCache = useCallback(
    (index: number, height: number) => {
      if (height !== (cache.get(index) ?? 48)) {
        cache.set(index, height);
        listRef.resetAfterIndex(index);
      }
    },
    [listRef]
  );

  return (
    <div
      {...rest}
      ref={containerRef}
      className={`ax-virtual__container ${className ?? ""}`}
    >
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={setList}
            useIsScrolling
            width={width}
            height={height}
            itemCount={count}
            direction={isRtl ? "rtl" : "ltr"}
            children={(props) =>
              children({
                ...props,
                updateHeight: updateCache,
                lastChild: props.index === count - 1,
              } as AnyObject)
            }
            outerElementType={Wrapper}
            itemSize={(index) => cache.get(index) ?? 48}
          />
        )}
      </AutoSizer>
    </div>
  );
};
AxTimeline.Item = Item;

AxTimeline.displayName = "AxTimeline";
AxTimeline.Item.displayName = "AxTimeline.Item";
