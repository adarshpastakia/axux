/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  Children,
  cloneElement,
  type FC,
  forwardRef,
  type ReactElement,
  useMemo,
} from "react";
import { Indicator } from "../animations";
import { AxHeader } from "../components/Header";
import { usePropToggle } from "../hooks/usePropToggle";
import {
  type ChildrenProp,
  type CollapseProps,
  type ElementProps,
  type EmptyCallback,
  type ExpandProps,
} from "../types";
import { PanelGroup } from "./PanelGroup";
import { PanelStack } from "./PanelStack";
import { AxErrorBoundary } from "../application/ErrorBoundary";

export interface PanelProps
  extends ElementProps,
    ChildrenProp,
    CollapseProps,
    ExpandProps {
  /**
   * panel id used by panel stack
   */
  panelId?: string;
  /**
   * highlight shadow
   */
  isActive?: boolean;
  /**
   * paper shadow
   */
  isPaper?: boolean;
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * height
   */
  height?: string | number;
  /**
   * width
   */
  width?: string | number;
  /**
   * minimum height
   */
  minHeight?: string | number;
  /**
   * minimum width
   */
  minWidth?: string | number;
  /**
   * maximum height
   */
  maxHeight?: string | number;
  /**
   * maximum width
   */
  maxWidth?: string | number;
  /**
   * close handler
   */
  onClose?: EmptyCallback;
}

export const PanelRoot: FC<PanelProps> = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      children,
      className,
      isPaper,
      isActive,
      isLoading,
      panelId,
      isCollapsable,
      isExpandable,
      isCollapsed,
      onCollapse,
      isExpanded,
      onExpand,
      height,
      width,
      minHeight,
      minWidth,
      maxHeight,
      maxWidth,
      // @ts-expect-error ignore
      onBack,
      onClose,
      ...rest
    },
    ref,
  ) => {
    const [collapsed, toggleCollapse] = usePropToggle(
      isCollapsed,
      onCollapse,
      panelId,
    );
    const [expanded, toggleExpand] = usePropToggle(
      isExpanded,
      onExpand,
      panelId,
    );

    const [head, body] = useMemo(() => {
      const header = Children.toArray(children).find(
        (child: AnyObject) =>
          child && "type" in child && child.type === AxHeader,
      ) as ReactElement;

      return [
        header,
        Children.toArray(children).filter(
          (el: AnyObject) => el.key !== header?.key,
        ),
      ];
    }, [children]);

    return (
      <div
        {...rest}
        ref={ref}
        data-test-loading={isLoading}
        data-expanded={expanded}
        data-collapsed={!expanded && collapsed}
        data-active-shadow={isActive}
        className={`ax-panel ${isPaper ? "ax-paper" : ""} ${className ?? ""}`}
        style={{ height, width, minHeight, minWidth, maxHeight, maxWidth }}
      >
        {isLoading && <Indicator />}
        {head &&
          cloneElement(head, {
            isCollapsed: !expanded && collapsed,
            isExpanded: expanded,
            onBack,
            onClose,
            onClick: isCollapsable && !expanded && toggleCollapse,
            onCollapse: isCollapsable && toggleCollapse,
            onExpand: isExpandable && toggleExpand,
          })}

        {(!head || !collapsed || expanded) && (
          <div className="ax-panel__body">
            <AxErrorBoundary>{body}</AxErrorBoundary>
          </div>
        )}
      </div>
    );
  },
) as AnyObject;
PanelRoot.displayName = "AxPanel";

export const AxPanel = Object.assign(PanelRoot, {
  Group: PanelGroup,
  Stack: PanelStack,
});

AxPanel.displayName = "AxPanel";
AxPanel.Group.displayName = "AxPanel.Group";
AxPanel.Stack.displayName = "AxPanel.Stack";
