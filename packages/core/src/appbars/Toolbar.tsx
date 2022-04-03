// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useCallback, useLayoutEffect, useRef, useState } from "react";
import ResizeObserver from "resize-observer-polyfill";
import { AxButton } from "../buttons/Button";
import { AxSpacer } from "../divider/Spacer";
import { AxPopover } from "../overlays/Popover";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface ToolbarProps {
  /**
   * Align children
   */
  align?: "start" | "end" | "center";
  /**
   * Vertical toolbar
   */
  vertical?: boolean;
  /**
   * Enable overflow
   */
  enableOverflow?: boolean;
}

const elementHasOverflow = (el: HTMLElement) => {
  return el.scrollWidth > el.offsetWidth || el.scrollHeight > el.offsetHeight;
};
const childNotInView = (el: HTMLElement, child: Element, vertical: boolean) => {
  const rect = el.getBoundingClientRect();
  const { right, bottom } = child.getBoundingClientRect();
  return vertical ? bottom > rect.bottom - 32 : right > rect.right - 32;
};

/**
 *
 * Toolbar
 * @internal
 */
export const AxToolbar: FC<ToolbarProps> = ({
  children,
  align,
  enableOverflow = false,
  vertical = false
}) => {
  const refToolbar = useRef<HTMLDivElement>(null);
  const refOverflow = useRef<HTMLDivElement>(null);

  const [hasOverflow, setOverflow] = useState(false);

  const checkOverflow = useCallback(() => {
    if (refToolbar.current && refOverflow.current && refToolbar.current.firstElementChild) {
      const wrapper = refToolbar.current.firstElementChild;
      for (const child of Array.from(refOverflow.current.children)) {
        wrapper.appendChild(child);
      }

      if (elementHasOverflow(refToolbar.current)) {
        for (const child of Array.from(wrapper.children).reverse()) {
          if (childNotInView(refToolbar.current, child, vertical)) {
            refOverflow.current.firstElementChild
              ? refOverflow.current.insertBefore(child, refOverflow.current.firstElementChild)
              : refOverflow.current.appendChild(child);
          }
        }
      }

      setOverflow(refOverflow.current.childElementCount > 0);
    }
  }, [refToolbar, vertical]);

  useLayoutEffect(() => {
    if (ResizeObserver && enableOverflow) {
      const ob = new ResizeObserver(checkOverflow);
      if (refToolbar.current) {
        ob.observe(refToolbar.current);
      }
      checkOverflow();

      return () => ob.disconnect();
    }
  }, [refToolbar, checkOverflow, enableOverflow]);

  return (
    <div ref={refToolbar} className="ax-toolbar" data-align={align} data-vertical={vertical}>
      <div className="ax-toolbar--wrapper">{children}</div>
      {hasOverflow && <AxSpacer.Flex />}
      {enableOverflow && (
        <AxPopover forceRender placement={vertical ? "right-end" : "bottom-end"}>
          <AxButton
            icon={AppIcons.iconOverflow}
            data-overflow={hasOverflow}
            type="link"
            hideCaret
          />
          <div className="ax-toolbar--overflow" ref={refOverflow} />
        </AxPopover>
      )}
    </div>
  );
};
AxToolbar.displayName = "AxToolbar";
