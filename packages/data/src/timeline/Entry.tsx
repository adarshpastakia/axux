// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxTextLoader } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, isValidElement, memo, useEffect, useMemo, useRef, useState } from "react";

interface EntryProps {
  index: number;
  avatar?: string | JSX.Element;
  avatarBg?: string;
  avatarColor?: string;
  reverse?: boolean;
}

export const TimelineEntry: FC<EntryProps> = memo(
  ({ avatar, avatarBg, avatarColor, reverse, children, index }) => {
    const eventRef = useRef<HTMLElement>(null);
    const entryIcon = useMemo(
      () =>
        isValidElement(avatar) ? (
          avatar
        ) : (
          <AxAvatar
            bg={avatarBg ?? "lightest"}
            color={avatarColor ?? "medium"}
            title=""
            icon={avatar ?? AppIcons.iconFace}
          />
        ),
      [avatar, avatarBg, avatarColor]
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
      <div className="ax-timeline__entry" data-reverse={reverse} data-index={index}>
        <div className="ax-timeline__entry--icon">{entryIcon}</div>
        <section ref={eventRef} className="ax-timeline__entry--body">
          {visible && children}
          {!visible && <AxTextLoader />}
        </section>
      </div>
    );
  },
  (prev, next) => prev.index === next.index
);
