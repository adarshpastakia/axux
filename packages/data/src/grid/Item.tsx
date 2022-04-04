// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxTextLoader } from "@axux/core";
import { FC, useEffect, useRef, useState } from "react";

export const GridItem: FC<{ index: number }> = ({ children, index }: KeyValue) => {
  const entryRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (entryRef.current) {
      const el: AnyObject = entryRef.current;
      let timer: AnyObject;
      let obResize: ResizeObserver;
      let obIntersection: IntersectionObserver;
      if (ResizeObserver) {
        obResize = new ResizeObserver(() => {
          const { offsetHeight: height } = el;
          (el as AnyObject).attributeStyleMap.set("contain-intrinsic-size", height + "px");
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

  return (
    <section ref={entryRef} className="ax-gridView__item" data-index={index}>
      {visible && children}
      {!visible && <AxTextLoader />}
    </section>
  );
};
