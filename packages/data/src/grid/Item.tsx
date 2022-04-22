// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxTextLoader } from "@axux/core";
import { FC, useLayoutEffect, useRef, useState } from "react";

export const GridItem: FC<{ index: number; minHeight?: string }> = ({
  children,
  index,
  minHeight
}: KeyValue) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    if (entryRef.current) {
      const el: AnyObject = entryRef.current;
      let timer: AnyObject;
      let obResize: ResizeObserver;
      let obIntersection: IntersectionObserver;
      if (ResizeObserver) {
        obResize = new ResizeObserver(() => {
          const { offsetHeight: height } = el;
          try {
            (el as AnyObject).attributeStyleMap.set("contain-intrinsic-size", height + "px");
          } catch (e) {
            el.style.minHeight = height + "px";
          }
        });
        obResize.observe(el);
      }
      if (IntersectionObserver) {
        const scrollerRef = el.closest(".ax-gridView__panel") as HTMLElement;
        obIntersection = new IntersectionObserver(
          (entries) => {
            const visible = entries.pop()?.isIntersecting;
            clearTimeout(timer);
            setVisible(false);
            try {
              el.attributeStyleMap.set("content-visibility", visible ? "visible" : "hidden");
            } catch (e) {
              el.style.visibility = visible ? "visible" : "hidden";
            }
            timer = setTimeout(() => setVisible(!!visible), 200);
          },
          {
            threshold: 0.25,
            rootMargin: `${scrollerRef.offsetHeight * 1.5}px 0px ${
              scrollerRef.offsetHeight * 1.5
            }px 0px`,
            root: scrollerRef
          }
        );
        obIntersection.observe(el);
      }
      return () => {
        clearTimeout(timer);
        obResize?.disconnect();
        obIntersection?.disconnect();
      };
    }
  }, [index]);

  useLayoutEffect(() => {
    if (entryRef.current) {
      const el: AnyObject = entryRef.current;
      try {
        (el as AnyObject).attributeStyleMap.set("contain-intrinsic-size", minHeight);
      } catch (e) {
        el.style.minHeight = minHeight;
      }
    }
  }, []);

  return (
    <section ref={entryRef} className="ax-gridView__item" data-index={index}>
      {visible && children}
      {!visible && <AxTextLoader />}
    </section>
  );
};
