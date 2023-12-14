/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type UIEvent,
} from "react";

const EXTRA_SIZE = 64;

export const useVirtualGallery = ({
  columns = 0,
  height = 64,
  width = 64,
  count = 0,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sizeCache = useRef<Array<[number, number]>>([]);
  const rowsizeCache = useRef<number[]>([]);
  const ignoreScrollChange = useRef(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [scrollSize, setScrollSize] = useState(0);
  const [columnCount, setColumnCount] = useState(1);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    sizeCache.current = new Array(count)
      .fill([width, height])
      .map((h, i) => [
        Math.max(h[0], sizeCache.current[i]?.[0] ?? width),
        Math.max(h[1], sizeCache.current[i]?.[1] ?? height),
      ]);

    rowsizeCache.current = new Array(Math.ceil(count / columnCount))
      .fill(height)
      .map((h, i) =>
        Math.max(
          h,
          ...sizeCache.current
            .slice(i * columnCount, i * columnCount + columnCount)
            .map((s) => s?.[1])
            .filter(Boolean)
        )
      );
  }, [count, columnCount, height, width]);

  // start item index
  useEffect(() => {
    let idx = 0;
    for (let tot = 0; idx < rowsizeCache.current.length; idx++) {
      tot += rowsizeCache.current[idx] + 8;
      if (tot >= scrollOffset) break;
    }
    setPageIndex(idx);
  }, [count, columnCount, scrollOffset]);

  const [startIndex, endIndex, springSize] = useMemo(() => {
    const index = Math.max(0, pageIndex - pageCount);
    return [
      index * columnCount,
      (pageIndex + pageCount + pageCount) * columnCount,
      new Array(index)
        .fill(0)
        .reduce<number>((t, _, i) => t + rowsizeCache.current[i] + 8, 0),
    ];
  }, [pageCount, columnCount, pageIndex]);

  useEffect(() => {
    if (scrollerRef.current) {
      const el = scrollerRef.current;
      const handler = () => {
        // page minimum 10 records with minimum viewport height 1000px
        setPageCount(
          Math.max(
            10,
            Math.round(Math.max(1000, el?.offsetHeight ?? 0) / height)
          )
        );
        setColumnCount(
          columns ||
            Math.max(
              1,
              Math.floor(((el?.offsetWidth ?? 800) - 32) / (width + 16))
            )
        );
      };
      const ob = new ResizeObserver(handler);
      handler();
      ob.observe(el);

      return () => {
        ob.unobserve(el);
        ob.disconnect();
      };
    }
  }, [scrollerRef.current, columns, count, height, width]);

  /** ***************** item height cache *******************/
  const updateCache = useCallback(
    (index: number, width: number, height: number) => {
      const oldSize = sizeCache.current[index];
      if (oldSize) {
        if (width !== oldSize[0]) {
          sizeCache.current[index][0] = width;
        }
        if (height !== oldSize[1]) {
          sizeCache.current[index][1] = height;
        }

        rowsizeCache.current = new Array(Math.ceil(count / columnCount))
          .fill(height)
          .map((h, i) =>
            Math.max(
              h,
              ...sizeCache.current
                .slice(i * columnCount, i * columnCount + columnCount)
                .map((s) => s?.[1])
                .filter(Boolean)
            )
          );

        setScrollSize(
          rowsizeCache.current.reduce<number>((t, h) => t + h + 8, 0) +
            EXTRA_SIZE
        );
      }
    },
    [count, columnCount]
  );

  const scrollActive = useMemo(() => {
    const {
      scrollTop = 0,
      scrollHeight = 0,
      offsetHeight = 0,
    } = (scrollerRef.current ?? {}) as HTMLElement;

    if (scrollSize === offsetHeight) return 0;

    if (scrollTop === 0) return 1;
    if (scrollTop >= scrollHeight - offsetHeight - EXTRA_SIZE) return 2;

    return 3;
  }, [count, scrollOffset, scrollSize]);

  const handleScroll = useCallback((evt: UIEvent<Element>) => {
    const { scrollTop, scrollHeight, offsetHeight } =
      evt.currentTarget as HTMLElement;
    if (!ignoreScrollChange.current) setScrollOffset(scrollTop);

    if (+scrollTop + +offsetHeight >= +scrollHeight) return true;

    return false;
  }, []);

  const scrollToItem = useCallback(
    (index: number) => {
      ignoreScrollChange.current = true;
      setPageIndex(Math.floor(index / columnCount));
      setTimeout(() => {
        scrollerRef.current
          ?.querySelector(`[data-index="${index}"]`)
          ?.scrollIntoView({ behavior: "instant", block: "start" });
        setTimeout(() => (ignoreScrollChange.current = false), 10);
      }, 100);
    },
    [columnCount]
  );

  const scrollActions = useMemo(
    () => ({
      first() {
        scrollerRef.current?.scrollTo({
          top: 0,
          behavior: "instant",
        });
      },
      pgup() {
        scrollerRef.current?.scrollTo({
          top:
            (scrollerRef.current?.scrollTop ?? 0) -
              scrollerRef.current?.offsetHeight ?? 0,
          behavior: "smooth",
        });
      },
      pgdn() {
        scrollerRef.current?.scrollTo({
          top:
            (scrollerRef.current?.scrollTop ?? 0) +
              scrollerRef.current?.offsetHeight ?? 0,
          behavior: "smooth",
        });
      },
      last() {
        scrollerRef.current?.scrollTo({
          top:
            (scrollerRef.current?.scrollHeight ?? 0) -
            (scrollerRef.current?.offsetHeight ?? 0) -
            EXTRA_SIZE,
          behavior: "instant",
        });
      },
    }),
    []
  );

  return {
    columnCount,
    scrollerRef,
    pageIndex,
    startIndex,
    endIndex,
    springSize,
    scrollSize,
    scrollOffset,
    scrollActive,
    handleScroll,
    updateCache,
    scrollToItem,
    scrollActions,
  };
};
