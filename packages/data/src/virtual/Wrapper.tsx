/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
  useTransition,
} from "react";

export const Wrapper = (maxWidth = 1100, hideScroller = false) => {
  const El = forwardRef(({ children, width, ...props }: KeyValue, ref) => {
    const scrollerRef = useRef<HTMLDivElement>(null);
    const [, startTransition] = useTransition();
    const [isLoading, setLoading] = useState(false);
    useImperativeHandle(
      ref,
      () => {
        const el = scrollerRef.current as AnyObject;
        el.setLoading = setLoading;
        return el;
      },
      []
    );

    const [noScrollUp, setNoScrollUp] = useState<boolean>();
    const [noScrollDown, setNoScrollDown] = useState<boolean>();
    useLayoutEffect(() => {
      const el = scrollerRef.current;
      if (el != null) {
        const cb = () => {
          setNoScrollUp(el.scrollTop === 0);
          setNoScrollDown(
            el.scrollTop + el.offsetHeight >= el.scrollHeight - 96
          );
          if (el.scrollTop + el.offsetHeight >= el.scrollHeight - 16) {
            fireEvent("loadMore");
          }
        };
        el?.addEventListener("scroll", cb);
        cb();
        return () => {
          el?.removeEventListener("scroll", cb);
        };
      }
    }, [children]);

    const fireEvent = useCallback(
      (
        event:
          | "scrollFirst"
          | "scrollUp"
          | "scrollDown"
          | "scrollLast"
          | "loadMore"
      ) => {
        scrollerRef.current?.dispatchEvent(new Event(event, { bubbles: true }));
      },
      []
    );

    useEffect(() => {
      const el = scrollerRef.current;
      startTransition(() => {
        if (el && el.scrollTop + el.offsetHeight >= el.scrollHeight - 16) {
          el.scrollTop -= 96;
        }
      });
    }, [isLoading]);

    return (
      <div {...props} className="ax-virtual__wrapper" ref={scrollerRef}>
        <div style={{ minWidth: Math.min(props.style.width * 0.8, maxWidth) }}>
          {children}
          <AxAnimation.Card
            showIcon
            className={isLoading ? "visible" : "invisible"}
          />
        </div>
        {!hideScroller && (
          <div className="ax-virtual__scroll">
            <div>
              <AxButton.Group isVertical variant="flat">
                <AxButton
                  size="sm"
                  variant="link"
                  className="flush"
                  aria-label="scroll to top"
                  icon={AppIcons.iconChevronUp}
                  onClick={() => fireEvent("scrollFirst")}
                  isDisabled={noScrollUp}
                />
                <AxButton
                  size="sm"
                  variant="link"
                  className="flush"
                  aria-label="scroll up"
                  icon={AppIcons.iconCaretUp}
                  onClick={() => fireEvent("scrollUp")}
                  isDisabled={noScrollUp}
                />
                <AxButton
                  size="sm"
                  variant="link"
                  className="flush"
                  aria-label="scroll down"
                  icon={AppIcons.iconCaretDown}
                  onClick={() => fireEvent("scrollDown")}
                  isDisabled={noScrollDown}
                />
                <AxButton
                  size="sm"
                  variant="link"
                  className="flush"
                  aria-label="scroll to bottom"
                  icon={AppIcons.iconChevronDown}
                  onClick={() => fireEvent("scrollLast")}
                  isDisabled={noScrollDown}
                />
              </AxButton.Group>
            </div>
          </div>
        )}
      </div>
    );
  });

  El.displayName = "VirtualWrapper";
  return El;
};
