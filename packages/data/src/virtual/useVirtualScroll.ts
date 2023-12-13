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

export const useVirtualScroll = ({
  orientation = "vertical",
  height = 64,
  width = 64,
  count = 0,
}) => {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const sizeCache = useRef<Array<[number, number]>>([]);
  const ignoreScrollChange = useRef(false);
  const [pageCount, setPageCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [scrollSize, setScrollSize] = useState(0);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    sizeCache.current = new Array(count)
      .fill([width, height])
      .map((h, i) => [
        Math.max(h[0], sizeCache.current[i]?.[0] ?? width),
        Math.max(h[1], sizeCache.current[i]?.[1] ?? height),
      ]);
  }, [count, height, width, orientation]);

  // start item index
  useEffect(() => {
    let idx = 0;
    for (let tot = 0; idx < count; idx++) {
      tot += sizeCache.current[idx][orientation === "vertical" ? 1 : 0];
      if (tot >= scrollOffset) break;
    }
    setPageIndex(idx);
  }, [count, orientation, scrollOffset]);

  const [startIndex, endIndex, springSize] = useMemo(() => {
    const index = Math.max(0, pageIndex - pageCount);
    return [
      index,
      pageIndex + pageCount * 2,
      new Array(index)
        .fill(0)
        .reduce<number>(
          (t, _, i) =>
            (t += sizeCache.current[i][orientation === "vertical" ? 1 : 0]),
          0
        ),
    ];
  }, [pageCount, pageIndex, orientation]);

  useEffect(() => {
    if (scrollerRef.current) {
      const el = scrollerRef.current;
      const size = orientation === "vertical" ? height : width;
      const handler = () => {
        const scrollerSize =
          orientation === "vertical"
            ? scrollerRef.current?.offsetHeight
            : scrollerRef.current?.offsetWidth;
        // page minimum 10 records with minimum viewport height 1000px
        setPageCount(
          Math.max(10, Math.round(Math.max(1000, scrollerSize ?? 0) / size))
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
  }, [scrollerRef.current, orientation, height, width]);

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
        setScrollSize(
          sizeCache.current.reduce<number>(
            (t, h, i) => (t += h[orientation === "vertical" ? 1 : 0] ?? 0),
            0
          ) + EXTRA_SIZE
        );
      }
    },
    [orientation]
  );

  const scrollActive = useMemo(() => {
    const {
      scrollTop = 0,
      scrollLeft = 0,
      scrollWidth = 0,
      scrollHeight = 0,
      offsetWidth = 0,
      offsetHeight = 0,
    } = (scrollerRef.current ?? {}) as HTMLElement;
    if (orientation === "vertical") {
      if (scrollSize === offsetHeight) return 0;

      if (scrollTop === 0) return 1;
      if (scrollTop >= scrollHeight - offsetHeight - EXTRA_SIZE) return 2;
    }
    if (orientation === "horizontal") {
      if (scrollSize === offsetWidth) return 0;

      if (Math.abs(scrollLeft) === 0) return 1;
      if (Math.abs(scrollLeft) >= scrollWidth - offsetWidth - EXTRA_SIZE)
        return 2;
    }
    return 3;
  }, [count, orientation, scrollOffset, scrollSize]);

  const handleScroll = useCallback(
    (evt: UIEvent<Element>) => {
      const {
        scrollTop,
        scrollLeft,
        scrollHeight,
        scrollWidth,
        offsetWidth,
        offsetHeight,
      } = evt.currentTarget as HTMLElement;
      if (!ignoreScrollChange.current)
        setScrollOffset(
          orientation === "vertical" ? scrollTop : Math.abs(scrollLeft)
        );

      if (
        orientation === "vertical" &&
        +scrollTop + +offsetHeight >= +scrollHeight
      )
        return true;
      if (
        orientation === "horizontal" &&
        Math.abs(+scrollLeft) + +offsetWidth >= +scrollWidth
      )
        return true;

      return false;
    },
    [orientation]
  );

  const scrollToItem = useCallback((index: number) => {
    ignoreScrollChange.current = true;
    setPageIndex(index);
    setTimeout(() => {
      scrollerRef.current
        ?.querySelector(`[data-index="${index}"]`)
        ?.scrollIntoView({ behavior: "instant", block: "start" });
      setTimeout(() => (ignoreScrollChange.current = false), 10);
    }, 100);
  }, []);

  const scrollActions = useMemo(
    () => ({
      first() {
        scrollerRef.current?.scrollTo({
          top: 0,
          left: 0,
          behavior: "instant",
        });
      },
      pgup() {
        scrollerRef.current?.scrollTo({
          top:
            (scrollerRef.current?.scrollTop ?? 0) -
              scrollerRef.current?.offsetHeight ?? 0,
          left:
            (scrollerRef.current?.scrollLeft ?? 0) -
              scrollerRef.current?.offsetWidth ?? 0,
          behavior: "smooth",
        });
      },
      pgdn() {
        scrollerRef.current?.scrollTo({
          top:
            (scrollerRef.current?.scrollTop ?? 0) +
              scrollerRef.current?.offsetHeight ?? 0,
          left:
            (scrollerRef.current?.scrollLeft ?? 0) +
              scrollerRef.current?.offsetWidth ?? 0,
          behavior: "smooth",
        });
      },
      last() {
        scrollerRef.current?.scrollTo({
          top:
            (scrollerRef.current?.scrollHeight ?? 0) -
            (scrollerRef.current?.offsetHeight ?? 0) -
            EXTRA_SIZE,
          left:
            (scrollerRef.current?.scrollWidth ?? 0) -
            (scrollerRef.current?.offsetWidth ?? 0) -
            EXTRA_SIZE,
          behavior: "instant",
        });
      },
    }),
    [orientation]
  );

  return {
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
