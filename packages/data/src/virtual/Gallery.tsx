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
import { useVirtualGallery } from "./useVirtualGallery";

export interface VirtualGalleryRef {
  scrollToItem: (index: number) => void;
  hilight: (index: number) => void;
  unhilight: () => void;
}

export interface GridProps<T> {
  children: (
    props: Omit<VirtualItemProps, "children"> & {
      data: T;
    }
  ) => ReactElement;
  listRef?: Ref<VirtualGalleryRef | undefined>;
  height?: number;
  width?: number;
  columns?: number;
  padding?: "sm" | "md" | "none";
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

const createItemList = memoize((items) => items);

const VirtualGallery = <T extends KeyValue>({
  items,
  children,
  padding = "md",
  height = 48,
  width = 64,
  columns,
  hideScroller,
  isLoading,
  onLoadMore,
  onScroll,
  listRef,
}: GridProps<T>) => {
  const count = useDeferredValue(items.length);
  const itemList: Array<{
    index: number;
    data: T;
    isLast: boolean;
  }> = createItemList(
    items.map((item: AnyObject, idx) => {
      return {
        index: idx,
        data: item,
        isLast: idx + 1 === items.length,
      };
    })
  );

  const {
    columnCount,
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
  } = useVirtualGallery({
    columns,
    height,
    width,
    count,
  });

  const scrollCallback = useRef(debounce((idx) => onScroll?.(idx)));

  useEffect(() => {
    scrollCallback.current(pageIndex);
  }, [pageIndex]);

  const pagedList = useMemo(() => {
    return itemList.slice(startIndex, endIndex);
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
            ?.scrollIntoView({ behavior: "auto", block: "nearest" });
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
    [scrollToItem]
  );

  return (
    <div
      className="ax-virtual-list"
      ref={scrollerRef}
      onScroll={(evt) => handleScroll(evt) && onLoadMore?.()}
      data-padding={padding}
      data-orientation="vertical"
    >
      <div className="ax-virtual__container">
        <div className="ax-virtual__scroller" style={{ minHeight: scrollSize }}>
          <div style={{ height: springSize }} />
          <div
            className="ax-virtual__gallery"
            style={{
              gridTemplateColumns: `repeat(${columnCount}, ${width}px)`,
              maxWidth: columns ? undefined : (width + 8) * columnCount,
            }}
          >
            {pagedList.map(({ index, data, isLast }) =>
              children({
                data,
                index,
                isLast,
                key: index,
                updateSize: updateCache,
              } as AnyObject)
            )}
          </div>
          {onLoadMore && (
            <div className="ax-virtual__placeholder">
              {isLoading && <AxAnimation.Card showIcon />}
            </div>
          )}
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
VirtualGallery.displayName = "AxVirtualGallery";

const GenericMemo: <T>(c: T) => T = memo;
export const AxVirtualGallery = GenericMemo(VirtualGallery);
