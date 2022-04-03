// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { withinEl } from "@axux/utilities/dist/dom";
import { FC, ReactNodeArray, useCallback, useLayoutEffect, useRef, useState } from "react";
import { AxButton } from "../buttons/Button";
import { usePropToggle } from "../internals/usePropToggle";
import { useResize } from "../internals/useResize";
import { AxLoader } from "../loader/Loader";
import { CollapseProps, ElementProps, EmptyCallback } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface AsideProps extends CollapseProps, ElementProps {
  /**
   * Align inline-end
   */
  end?: boolean;
  /**
   * Allow resize
   */
  isResizeable?: boolean;
  /**
   * Allow flyout with collapsed
   */
  flyout?: boolean;

  /**
   * Header title
   */
  title?: string | JSX.Element;
  /**
   * Show loading indicator
   */
  isLoading?: boolean;

  /**
   * Fixed width
   */
  width?: number | string;
  /**
   * Max width
   */
  maxWidth?: number | string;
  /**
   * Min width
   */
  minWidth?: number | string;

  /**
   * Event handler when shown
   */
  onFlyout?: EmptyCallback;

  actions?: ReactNodeArray;
}

/**
 * Section side panel
 * @param children
 * @param title
 * @param isLoading
 * @param className
 * @param isCollapsable
 * @param isCollapsed
 * @param flyout
 * @param onCollapse
 * @param onFlyout
 * @param resizable
 * @param wd
 * @param minWidth
 * @param maxWidth
 * @param end
 * @param aria
 * @constructor
 * @internal
 */
export const Aside: FC<AsideProps> = ({
  children,
  title,
  isLoading,
  className,
  isCollapsable,
  isCollapsed = false,
  flyout,
  onCollapse,
  onFlyout,
  isResizeable,
  width: wd = "10rem",
  minWidth = "2em",
  maxWidth = "35vw",
  end,
  actions,
  ...aria
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const resizeHandleRef = useRef<HTMLDivElement>(null);
  const [peek, setPeek] = useState(false);

  const [width, setWidth] = useState(wd);

  const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse);

  const tryPeek = useCallback(() => {
    if (collapsed) {
      if (flyout) {
        setPeek(true);
        onFlyout && onFlyout();
      } else {
        toggleCollapse();
      }
    }
  }, [flyout, collapsed, onFlyout, toggleCollapse]);

  useLayoutEffect(() => {
    if (peek) {
      const handler = (e: MouseEvent) => {
        if (!withinEl(e.target as HTMLElement, ".ax-section__side--body")) {
          setPeek(false);
        }
      };
      document.addEventListener("mouseup", handler);

      return () => document.removeEventListener("mouseup", handler);
    }
  }, [peek]);

  useResize(
    resizeHandleRef,
    ({ x }) => {
      if (elementRef.current) {
        setWidth(elementRef.current.offsetWidth + x);
      }
    },
    { reverse: end }
  );

  return (
    <div
      className={`ax-section__side ${className ?? ""}`}
      data-end={end}
      data-collapsed={collapsed}
      data-flyout={peek}
      onClick={tryPeek}
      {...aria}
    >
      {(title || isCollapsable) && (
        <div className="ax-section__side--header">
          <span className="ax-section__side--title">{title}</span>
          <div className="ax-section__side--actions">{actions}</div>
          {isCollapsable && (
            <AxButton
              type="link"
              className="ax-section__side--toggle flippable"
              icon={
                (collapsed && !end) || (!collapsed && end)
                  ? AppIcons.iconCaretRight
                  : AppIcons.iconCaretLeft
              }
              onClick={toggleCollapse}
            />
          )}
        </div>
      )}
      {collapsed && <div className="ax-section__side--placeholder" />}
      <div
        ref={elementRef}
        className="ax-section__side--body"
        style={{
          width,
          minWidth,
          maxWidth
        }}
      >
        {children}
      </div>
      {isResizeable && <div ref={resizeHandleRef} className="ax-section__side--resizeHandle" />}
      {isLoading && <AxLoader />}
    </div>
  );
};
