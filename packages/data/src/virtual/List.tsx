/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { AxAnimation, AxButton } from "@axux/core";
import { type EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import memoize from "memoize-one";
import {
  memo,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  type ReactElement,
  type Ref,
} from "react";
import { type VirtualItemProps } from "./Item";
import { useVirtualScroll } from "./useVirtualScroll";

export interface VirtualListRef {
  scrollToItem: (index: number) => void;
  hilight: (index: number) => void;
  unhilight: () => void;
}

export interface VirtualListProps<T> {
  children: (
    props: Omit<VirtualItemProps, "children"> & {
      data: T;
    }
  ) => ReactElement;
  listRef?: Ref<VirtualListRef | undefined>;
  height?: number;
  width?: number;
  fullWidth?: boolean;
  padding?: "sm" | "md" | "none";
  orientation?: "vertical" | "horizontal";
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

  isSticky?: (index: number) => boolean;

  onScroll?: (top: number) => void;
}

const createItemList = memoize((items) => items);

const VirtualList = <T extends KeyValue>({
  items,
  children,
  fullWidth,
  padding = "md",
  orientation = "vertical",
  height = 48,
  width = 48,
  hideScroller,
  isLoading,
  onLoadMore,
  onScroll,
  isSticky,
  listRef,
}: VirtualListProps<T>) => {
  const count = useDeferredValue(items.length);
  const itemList: Array<{
    index: number;
    data: T;
    isLast: boolean;
    isSticky: boolean;
  }> = createItemList(
    items.map((item: AnyObject, idx) => {
      return {
        index: idx,
        data: item,
        isSticky: isSticky?.(idx) === true,
        isLast: idx + 1 === items.length,
      };
    })
  );

  const {
    scrollerRef,
    scrollSize,
    pageIndex,
    startIndex,
    endIndex,
    springSize,
    scrollActive,
    handleScroll,
    updateCache,
    scrollToItem,
    scrollActions,
  } = useVirtualScroll({
    orientation,
    height,
    width,
    count,
  });

  const scrollCallback = useRef(debounce((idx) => onScroll?.(idx)));

  useEffect(() => {
    scrollCallback.current(pageIndex);
  }, [pageIndex]);

  const [stickiesStart, pagedList] = useMemo(() => {
    return [
      itemList.slice(0, pageIndex).filter((item) => item.isSticky),
      itemList.slice(startIndex, endIndex),
    ];
  }, [itemList, startIndex, endIndex]);

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
        scrollToItem(index);
      },
    }),
    []
  );

  return (
    <div
      className="ax-virtual-list"
      ref={scrollerRef}
      onScroll={(evt) => handleScroll(evt) && onLoadMore?.()}
      data-padding={padding}
      data-orientation={orientation}
    >
      <div className="ax-virtual__container">
        <div
          className={`ax-virtual__scroller ${fullWidth ? "flex-1" : ""}`}
          style={
            orientation === "vertical"
              ? { minHeight: scrollSize, minWidth: width }
              : { minWidth: scrollSize, minHeight: height }
          }
        >
          <div
            style={
              orientation === "vertical"
                ? { height: springSize }
                : { width: springSize, display: "inline-block" }
            }
          />
          <div className="ax-virtual__sticky">
            {stickiesStart.map(({ index, data, isSticky, isLast }) =>
              children({
                data,
                index,
                key: index,
                isLast,
                isSticky,
                updateSize: updateCache,
              } as AnyObject)
            )}
          </div>
          {pagedList.map(({ index, data, isSticky, isLast }) =>
            children({
              data,
              index,
              isLast,
              isSticky,
              key: index,
              updateSize: updateCache,
            } as AnyObject)
          )}
          {onLoadMore && (
            <div className="ax-virtual__placeholder">
              {isLoading && <AxAnimation.Card showIcon />}
            </div>
          )}
        </div>
        {!hideScroller && (
          <div className="ax-virtual__tools">
            <AxButton.Group
              isVertical={orientation === "vertical"}
              variant="flat"
            >
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll to top"
                icon={AppIcons.iconChevronUp}
                isDisabled={(scrollActive & 2) === 0}
                onClick={() => scrollActions.first()}
              />
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll up"
                icon={AppIcons.iconCaretUp}
                isDisabled={(scrollActive & 2) === 0}
                onClick={() => scrollActions.pgup()}
              />
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll down"
                icon={AppIcons.iconCaretDown}
                isDisabled={scrollActive % 2 === 0}
                onClick={() => scrollActions.pgdn()}
              />
              <AxButton
                size="sm"
                variant="link"
                className="flush"
                aria-label="scroll to bottom"
                icon={AppIcons.iconChevronDown}
                isDisabled={scrollActive % 2 === 0}
                onClick={() => scrollActions.last()}
              />
            </AxButton.Group>
          </div>
        )}
      </div>
    </div>
  );
};
VirtualList.displayName = "AxVirtualList";

const GenericMemo: <T>(c: T) => T = memo;
export const AxVirtualList = GenericMemo(VirtualList);
