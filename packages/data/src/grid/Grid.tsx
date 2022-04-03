// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxTextLoader } from "@axux/core";
import { ElementProps, EmptyCallback, RefProp } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { debounce } from "@axux/utilities";
import {
  FC,
  forwardRef,
  ReactNode,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState
} from "react";
import { GridItem } from "./Item";

export interface GridRef {
  scrollTo: (index: number) => void;
}

export interface GridProps extends Omit<ElementProps, "onScroll">, RefProp<GridRef> {
  cellWidth?: string;
  isLoading?: boolean;
  canLoadMore?: boolean;
  hideScrollButtons?: boolean;
  onLoadMore?: EmptyCallback;
  sortOrder?: "asc" | "desc";
  onSort?: (order: "asc" | "desc") => void;
  onScroll?: (top: number) => void;
  initialScroll?: number;
  actions?: ReactNode;
}
interface ExtendedFC extends FC<GridProps> {
  Item: typeof GridItem;
}

export const AxGridView: ExtendedFC = forwardRef<GridRef, GridProps>(
  (
    {
      children,
      isLoading,
      canLoadMore,
      onLoadMore,
      sortOrder,
      onSort,
      onScroll,
      initialScroll,
      actions,
      hideScrollButtons,
      cellWidth,
      className,
      ...aria
    },
    ref
  ) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [canScroll, setCanScroll] = useState(0);

    const checkScroll = useCallback(() => {
      if (scrollerRef.current) {
        const el = scrollerRef.current;
        const { scrollHeight, scrollTop, offsetHeight } = el;
        if (scrollHeight === offsetHeight) setCanScroll(0);
        else if (scrollTop === 0) setCanScroll(1);
        else if (scrollTop + offsetHeight === scrollHeight) setCanScroll(2);
        else setCanScroll(3);

        if (scrollTop + offsetHeight >= scrollHeight - 16) {
          !isLoading && canLoadMore && onLoadMore && debounce(() => onLoadMore(), 100)();
        }
        debounce(() => {
          const first: AnyObject = Array.from<HTMLElement>(
            el.querySelectorAll(".ax-gridView__item")
          ).find((e) => e.offsetTop >= el.scrollTop);
          onScroll?.(first?.dataset.index);
        }, 250)();
      }
    }, [canLoadMore, isLoading, onLoadMore, onScroll]);

    const doScroll = useCallback((diff: number) => {
      if (scrollerRef.current) {
        const el = scrollerRef.current;
        let scrollTo;
        if (diff === -2) scrollTo = 0;
        else if (diff === 2) scrollTo = el.scrollHeight;
        else scrollTo = diff * el.offsetHeight + el.scrollTop;
        el.scrollTo({
          top: scrollTo,
          behavior: "auto"
        });
      }
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        scrollTo: (index: number) =>
          scrollerRef.current
            ?.querySelector(`.ax-gridView__item[data-index="${index}"]`)
            ?.scrollIntoView({ block: "nearest" })
      }),
      []
    );

    useLayoutEffect(() => {
      initialScroll &&
        scrollerRef.current
          ?.querySelector(`.ax-gridView__item[data-index="${initialScroll}"]`)
          ?.scrollIntoView();
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

    return (
      <div
        className={`ax-gridView__panel ${className ?? ""}`}
        style={{ "--cell-width": cellWidth } as AnyObject}
        onScroll={checkScroll}
        ref={scrollerRef as AnyObject}
        {...aria}
      >
        <div className="ax-gridView__wrapper">
          <div>
            {children}
            {isLoading && <AxTextLoader />}
            {!isLoading && <div style={{ height: "3rem" }} />}
          </div>
          <div>
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
              {actions}
            </div>
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
  }
) as AnyObject;
AxGridView.Item = GridItem;

AxGridView.displayName = "AxGridView";
AxGridView.Item.displayName = "AxGridView.Item";
