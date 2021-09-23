// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTextLoader } from "@axux/core";
import { ElementProps, EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import { Children, FC, useCallback, useLayoutEffect, useReducer, useRef, useState } from "react";
import { GridItem } from "./Item";

export interface GridProps extends ElementProps {
  cellWidth?: string;
  isLoading?: boolean;
  canLoadMore?: boolean;
  onLoadMore?: EmptyCallback;
  sortOrder?: "asc" | "desc";
  onSort?: (order: "asc" | "desc") => void;
}

interface ExtendedFC extends FC<GridProps> {
  Item: typeof GridItem;
}

export const AxGridView: ExtendedFC = ({
  children,
  isLoading,
  canLoadMore,
  onLoadMore,
  sortOrder,
  onSort,
  cellWidth = "20em",
  className,
  ...aria
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(0);

  const checkScroll = useCallback(() => {
    if (scrollerRef.current) {
      const { scrollHeight, scrollTop, offsetHeight } = scrollerRef.current;
      if (scrollHeight === offsetHeight) setCanScroll(0);
      else if (scrollTop === 0) setCanScroll(1);
      else if (scrollTop + offsetHeight === scrollHeight) setCanScroll(2);
      else setCanScroll(3);

      if (scrollTop + offsetHeight >= scrollHeight - 10) {
        !isLoading && canLoadMore && onLoadMore && debounce(() => onLoadMore(), 100);
      }
    }
  }, [canLoadMore, isLoading, onLoadMore]);

  const doScroll = useCallback((diff: number) => {
    if (scrollerRef.current) {
      const el = scrollerRef.current;
      let scrollTo;
      if (diff === -2) scrollTo = 0;
      else if (diff === 2) scrollTo = el.scrollHeight;
      else scrollTo = diff * el.offsetHeight + el.scrollTop;
      el.scrollTo({
        top: scrollTo,
        behavior: "smooth"
      });
    }
  }, []);

  useLayoutEffect(() => {
    if (ResizeObserver) {
      const ob = new ResizeObserver(checkScroll);
      if (scrollerRef.current && scrollerRef.current.firstElementChild) {
        ob.observe(scrollerRef.current.firstElementChild);
      }
      return () => ob.disconnect();
    }
  }, [checkScroll]);

  const [visibilityMap, dispatch] = useReducer<
    (state: boolean[], { index, visible }: KeyValue) => boolean[]
  >((state, { index, visible }) => {
    state.splice(index, 1, visible);
    return [...state];
  }, []);
  useLayoutEffect(() => {
    if (scrollerRef.current) {
      const height = scrollerRef.current.offsetHeight;
      const ob = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) =>
            dispatch({
              index: parseInt((entry.target as HTMLElement).dataset.index + ""),
              visible: entry.isIntersecting
            })
          );
        },
        {
          rootMargin: `${height}px 0px ${height}px 0px`,
          root: scrollerRef.current
        }
      );
      scrollerRef.current.querySelectorAll(".ax-timeline__entry").forEach((e) => ob.observe(e));
      return () => ob.disconnect();
    }
  }, [children]);

  return (
    <div
      className={`ax-gridView__panel ${className ?? ""}`}
      onScroll={checkScroll}
      ref={scrollerRef}
      style={{ "--cell-width": cellWidth } as AnyObject}
      {...aria}
    >
      <div className="ax-gridView__wrapper">
        <div>
          {Children.map(children, (child, i) => (
            <section key={i} data-index={i} className="ax-gridView__item">
              {visibilityMap[i] && child}
            </section>
          ))}
          {isLoading && <AxTextLoader />}
        </div>
        <div>
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
        </div>
      </div>
    </div>
  );
};
AxGridView.Item = GridItem;

AxGridView.displayName = "AxGridView";
AxGridView.Item.displayName = "AxGridView.Item";
