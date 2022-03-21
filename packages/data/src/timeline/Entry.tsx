// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxTextLoader } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { isValidElement, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

export const TimelineEntry: VFC<AnyObject> = ({
  avatar,
  reverse,
  index,
  record,
  callback
}: KeyValue) => {
  const eventRef = useRef<HTMLElement>(null);
  const entryIcon = useMemo(
    () =>
      isValidElement(avatar) ? (
        avatar
      ) : (
        <AxAvatar bg="lightest" color="medium" title="" icon={avatar ?? AppIcons.iconFace} />
      ),
    [avatar]
  );

  useEffect(() => {
    if (ResizeObserver) {
      if (eventRef.current) {
        const el = eventRef.current;
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
    if (eventRef.current) {
      let timer: AnyObject;
      const el = eventRef.current as AnyObject;
      const scrollerRef = el.closest(".ax-timeline__panel") as HTMLElement;
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
      ob.observe(eventRef.current);
      return () => ob.disconnect();
    }
  }, []);

  return (
    <div className={`ax-timeline__entry`} data-reverse={reverse}>
      <div className="ax-timeline__entry--icon">{entryIcon}</div>
      <section ref={eventRef} className="ax-timeline__entry--body">
        {visible && callback({ record, index })}
        {!visible && <AxTextLoader />}
      </section>
    </div>
  );
};
