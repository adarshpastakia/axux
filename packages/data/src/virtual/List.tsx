/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useIsRtl } from "@axux/core/dist/hooks/useIsRtl";
import { ChildrenProp, ElementProps } from "@axux/core/dist/types";
import memoizeOne from "memoize-one";
import {
  CSSProperties,
  forwardRef,
  memo,
  ReactElement,
  Ref,
  useCallback,
  useDeferredValue,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { areEqual, VariableSizeList as List } from "react-window";
import ResizeObserver from "resize-observer-polyfill";

export type ListRef = Pick<List, "scrollTo" | "scrollToItem">;

export interface ListItemProps extends ChildrenProp, ElementProps {
  style: CSSProperties;
  index: number;
  isScrolling?: boolean;
  updateSize: (index: number, size: [width: number, height: number]) => void;
}

export interface ListProps<T> extends ElementProps {
  children: (props: ListItemProps & { data: T }) => ReactElement;
  listRef?: Ref<ListRef | undefined>;
  /**
   * data list
   */
  items: T[];
  /**
   * sticky count;
   */
  stickies?: number;
  /**
   * scroll direction
   */
  layout?: "vertical" | "horizontal";
}

/** ***************** List item *******************/
// eslint-disable-next-line react/display-name
const Item = memo(
  ({
    style,
    index,
    children,
    updateSize,
    className,
    isScrolling,
    ...rest
  }: ListItemProps) => {
    const itemRef = useRef<HTMLDivElement>(null);

    /** ***************** calculate height on resize *******************/
    useLayoutEffect(() => {
      const ob = new ResizeObserver(() => {
        const el = itemRef.current;
        if (el != null) {
          updateSize?.(index, [el.offsetWidth, el.offsetHeight]);
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
          className={`ax-list__item ${className ?? ""}`}
        >
          {children}
        </div>
      </div>
    );
  },
  areEqual
);

const createItemList = memoizeOne((items) => items);

/**
 * Virtual list
 */
const AxListComponent = <T extends KeyValue>({
  className,
  children,
  layout,
  items,
  listRef: ref,
  stickies = 0,
  ...rest
}: ListProps<T>) => {
  const isRtl = useIsRtl();
  const [listRef, setList] = useState<AnyObject>();
  const cache = useMemo(() => new Map<number, [number, number]>(), []);

  useImperativeHandle(ref, () => listRef, [listRef]);

  const count = useDeferredValue(items.length);
  const itemList = createItemList(items);

  /** ***************** item height cache *******************/
  const updateCache = useCallback(
    (index: number, [width, height]: [number, number]) => {
      if (
        width !== (cache.get(index)?.[0] ?? 48) ||
        height !== (cache.get(index)?.[1] ?? 48)
      ) {
        cache.set(index, [width, height]);
        listRef.resetAfterIndex(index);
      }
    },
    [listRef]
  );

  const getSize = useCallback(
    (index: number) =>
      cache.get(index)?.[layout === "horizontal" ? 0 : 1] ?? 48,
    [layout]
  );

  // eslint-disable-next-line react/display-name
  const StickyList = forwardRef<HTMLDivElement, KeyValue>(
    ({ children: innerChildren, ...rest }, ref) => {
      return (
        <div ref={ref} {...rest}>
          <div className="ax-list__sticky" data-layout={layout}>
            {stickies > 0 &&
              items.slice(0, stickies).map((data, index) =>
                children({
                  data,
                  key: index,
                } as AnyObject)
              )}
          </div>
          {innerChildren}
        </div>
      );
    }
  );

  return (
    <div {...rest} className={`ax-virtual__container ${className ?? ""}`}>
      <AutoSizer>
        {({ width, height }) => (
          <List
            ref={setList}
            useIsScrolling
            width={width}
            height={height}
            layout={layout}
            itemCount={count}
            itemData={itemList}
            direction={isRtl ? "rtl" : "ltr"}
            innerElementType={StickyList}
            itemSize={getSize}
            style={{ paddingBottom: "2rem" }}
          >
            {(props) =>
              children({
                ...props,
                updateSize: updateCache,
                data:
                  props.data.length > props.index
                    ? props.data[props.index]
                    : null,
              })
            }
          </List>
        )}
      </AutoSizer>
    </div>
  );
};
AxListComponent.displayName = "AxList";

const GenericMemo: <T>(c: T) => T & { Item: typeof Item } = memo;

export const AxList = GenericMemo(AxListComponent);

AxList.Item = Item;
AxList.Item.displayName = "AxList.Item";
