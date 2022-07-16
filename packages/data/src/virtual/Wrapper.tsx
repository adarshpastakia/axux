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
} from "react";

export const Wrapper = forwardRef(({ children, ...props }: KeyValue, ref) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

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

  const [noScrollUp, setNoScrollUp] = useState(true);
  const [noScrollDown, setNoScrollDown] = useState(true);
  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (el) {
      const cb = () => {
        setNoScrollUp(el.scrollTop === 0);
        setNoScrollDown(el.scrollTop + el.offsetHeight >= el.scrollHeight);
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
    noScrollDown && fireEvent("loadMore");
  }, [noScrollDown]);

  return (
    <div {...props} className="ax-virtual__wrapper" ref={scrollerRef}>
      <div>
        {children}
        {isLoading && <AxAnimation.Card showIcon />}
        <div style={{ height: 48 }} />
      </div>
      <div className="ax-virtual__scroll">
        <div>
          <AxButton.Group isVertical>
            <AxButton
              style="link"
              aria-label="scroll to top"
              icon={AppIcons.iconChevronUp}
              onClick={() => fireEvent("scrollFirst")}
              isDisabled={noScrollUp}
            />
            <AxButton
              style="link"
              aria-label="scroll up"
              icon={AppIcons.iconCaretUp}
              onClick={() => fireEvent("scrollUp")}
              isDisabled={noScrollUp}
            />
            <AxButton
              style="link"
              aria-label="scroll down"
              icon={AppIcons.iconCaretDown}
              onClick={() => fireEvent("scrollDown")}
              isDisabled={noScrollDown}
            />
            <AxButton
              style="link"
              aria-label="scroll to bottom"
              icon={AppIcons.iconChevronDown}
              onClick={() => fireEvent("scrollLast")}
              isDisabled={noScrollDown}
            />
          </AxButton.Group>
        </div>
      </div>
    </div>
  );
});

Wrapper.displayName = "VirtualWrapper";
