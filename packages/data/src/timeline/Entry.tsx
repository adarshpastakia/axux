// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxTextLoader } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { isValidElement, memo, useEffect, useMemo, useRef, useState } from "react";

export const TimelineEntry: VFC<AnyObject> = memo(
  ({ avatar, reverse, index, record, callback }: KeyValue) => {
    const eventRef = useRef<HTMLElement>(null);
    const entryIcon = useMemo(
      () =>
        isValidElement(avatar) ? (
          avatar
        ) : (
          <AxAvatar
            bg={record.avatarBg ?? "lightest"}
            color={record.avatarColor ?? "medium"}
            title=""
            icon={avatar ?? record.avatar ?? AppIcons.iconFace}
          />
        ),
      [avatar, record]
    );

    const [visible, setVisible] = useState(false);
    useEffect(() => {
      if (eventRef.current) {
        const el: AnyObject = eventRef.current;
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
          let timer: AnyObject;
          const scrollerRef = el.closest(".ax-timeline__panel") as HTMLElement;
          obIntersection = new IntersectionObserver(
            (entries) => {
              const visible = entries.pop()?.isIntersecting;
              clearTimeout(timer);
              setVisible(false);
              el.attributeStyleMap.set("content-visibility", visible ? "visible" : "hidden");
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
          obResize?.disconnect();
          obIntersection?.disconnect();
        };
      }
    }, [index]);

    return (
      <div
        className="ax-timeline__entry"
        data-reverse={reverse ?? record.reverse}
        data-index={index}
      >
        <div className="ax-timeline__entry--icon">{entryIcon}</div>
        <section ref={eventRef} className="ax-timeline__entry--body">
          {visible && callback({ record, index })}
          {!visible && <AxTextLoader />}
        </section>
      </div>
    );
  },
  (prev, next) => prev.index === next.index && prev.record === next.record
);
