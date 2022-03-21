// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxTextLoader } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export const GridItem: VFC<AnyObject> = ({ callback, record, index }: KeyValue) => {
  const entryRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ResizeObserver) {
      if (entryRef.current) {
        const el = entryRef.current;
        const ob = new ResizeObserver(() => {
          const { offsetHeight: height } = el;
          (el as AnyObject).attributeStyleMap.set("contain-intrinsic-size", height + "px");
        });
        ob.observe(el);
        return () => ob.disconnect();
      }
    }
  }, [index]);

  const [visible, setVisible] = useState(false);
  useLayoutEffect(() => {
    if (entryRef.current) {
      let timer: AnyObject;
      const el = entryRef.current as AnyObject;
      const scrollerRef = el.closest(".ax-gridView__panel") as HTMLElement;
      const ob = new IntersectionObserver(
        (entries) => {
          clearTimeout(timer);
          setVisible(false);
          el.attributeStyleMap.set(
            "content-visibility",
            entries[0].isIntersecting ? "visible" : "hidden"
          );
          setTimeout(() => setVisible(entries[0].isIntersecting), 500);
        },
        {
          threshold: 0.25,
          rootMargin: `${scrollerRef.offsetHeight / 2}px 0px ${scrollerRef.offsetHeight / 2}px 0px`,
          root: scrollerRef
        }
      );
      ob.observe(entryRef.current);
      return () => ob.disconnect();
    }
  }, []);

  return (
    <section ref={entryRef} className="ax-gridView__item" data-index={index}>
      {visible && callback({ record, index })}
      {!visible && <AxTextLoader />}
    </section>
  );
};
