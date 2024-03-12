/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useCallback, useLayoutEffect, useRef, useState, type FC } from "react";
import { Indicator } from "../animations";
import { AxButton } from "../buttons/Button";
import { usePropToggle } from "../hooks/usePropToggle";
import { useResize } from "../hooks/useResize";
import { AxIcon } from "../icons/Icon";
import {
  type ChildrenProp,
  type CollapseProps,
  type Color,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
} from "../types";
import { AppIcons } from "../types/appIcons";
import { AxHeader } from "./Header";
import { AxTitle } from "./Title";

/** @internal */
export interface AsideProps
  extends CollapseProps,
    ElementProps,
    IconProp,
    ChildrenProp {
  /**
   * align inline-end
   */
  align?: "start" | "end";
  /**
   * header title
   */
  title?: string | JSX.Element;
  /**
   * header actions
   */
  actions?: false | JSX.Element[];
  /**
   * header class
   */
  headerClass?: HTMLDivElement["className"];

  /**
   * icon bg
   */
  iconBg?: Color | string;
  /**
   * icon color
   */
  iconColor?: Color | string;
  /**
   * icon class
   */
  iconClass?: HTMLDivElement["className"];

  /**
   * show loading indicator
   */
  isLoading?: boolean;
  /**
   * allow resize
   */
  isResizeable?: boolean;
  /**
   * allow flyout with collapsed
   */
  isFlyout?: boolean;
  /**
   * event handler when shown
   */
  onFlyout?: EmptyCallback;

  /**
   * fixed width
   */
  width?: number | string;
  /**
   * max width
   */
  maxWidth?: number | string;
  /**
   * min width
   */
  minWidth?: number | string;
}

/**
 * Aside panel
 */
export const AxAside: FC<AsideProps> = ({
  children,
  icon,
  iconBg,
  iconColor,
  iconClass,
  rtlFlip,
  title,
  headerClass,
  isLoading,
  className,
  isCollapsable = false,
  isCollapsed = false,
  isFlyout,
  onCollapse,
  onFlyout,
  isResizeable,
  width: wd = "10rem",
  minWidth = "2em",
  maxWidth = "35vw",
  align = "start",
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
      if (isFlyout) {
        setPeek(true);
        void onFlyout?.();
      } else {
        void toggleCollapse();
      }
    }
  }, [isFlyout, collapsed, onFlyout, toggleCollapse]);

  useLayoutEffect(() => {
    if (peek) {
      const handler = (e: MouseEvent) => {
        if ((e.target as HTMLElement).closest(".ax-side__body") == null) {
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
      if (elementRef.current != null) {
        setWidth(elementRef.current.offsetWidth + x);
      }
    },
    { isReverse: align === "end" },
  );

  return (
    <div
      className={`ax-side ${className ?? ""}`}
      data-align={align}
      data-collapsed={collapsed}
      data-flyout={peek}
      onClick={tryPeek}
      role="none"
      {...aria}
    >
      {(!!title || !!isFlyout || !!isCollapsable) && (
        <AxHeader className={`ax-side__header ${headerClass ?? ""}`}>
          {icon && (
            <AxIcon
              icon={icon}
              rtlFlip={rtlFlip}
              bg={iconBg}
              color={iconColor}
              className={`ax-side__icon ${iconClass ?? ""}`}
            />
          )}
          <AxTitle className="ax-side__title">{title}</AxTitle>
          <div className="ax-side__actions">{actions}</div>
          {(isCollapsable || isFlyout) && (
            <AxButton
              variant="link"
              aria-label="Toggle collapse"
              className="ax-side__toggle flippable"
              isDisabled={!isCollapsable}
              rtlFlip
              icon={
                (collapsed && align === "start") ||
                (!collapsed && align === "end")
                  ? AppIcons.iconCaretRight
                  : AppIcons.iconCaretLeft
              }
              onClick={toggleCollapse}
            />
          )}
        </AxHeader>
      )}
      {collapsed && <div className="ax-side__placeholder" />}
      <div
        ref={elementRef}
        className="ax-side__body"
        style={{
          width,
          minWidth,
          maxWidth,
        }}
      >
        {isLoading && <Indicator />}
        {children}
      </div>
      {isResizeable && (
        <div ref={resizeHandleRef} className="ax-side__resizeHandle" />
      )}
    </div>
  );
};
