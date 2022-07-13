/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Children, cloneElement, FC, ReactElement, useMemo } from "react";
import { Indicator } from "../animations";
import { AxHeader } from "../components/Header";
import { usePropToggle } from "../hooks/usePropToggle";
import {
  ChildrenProp,
  CollapseProps,
  ElementProps,
  EmptyCallback,
  ExpandProps,
} from "../types";
import { PanelGroup } from "./PanelGroup";
import { PanelStack } from "./PanelStack";

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

export const AxPanel: FC<PanelProps> & {
  Group: typeof PanelGroup;
  Stack: typeof PanelStack;
} = ({
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
  // @ts-ignore
  onBack,
  onClose,
  ...rest
}) => {
  const [collapsed, toggleCollapse] = usePropToggle(
    isCollapsed,
    onCollapse,
    panelId
  );
  const [expanded, toggleExpand] = usePropToggle(isExpanded, onExpand, panelId);

  const [head, body] = useMemo(() => {
    const matcher =
      (match = true) =>
      (child: AnyObject) =>
        (child && "type" in child && child.type === AxHeader) === match;
    return [
      Children.toArray(children).find(matcher(true)) as ReactElement,
      Children.toArray(children).filter(matcher(false)),
    ];
  }, [children]);

  return (
    <div
      {...rest}
      data-expanded={expanded}
      data-collapsed={!expanded && collapsed}
      data-active-shadow={isActive}
      style={{ height, width, minHeight, minWidth, maxHeight, maxWidth }}
      className={`ax-panel ${isPaper ? "ax-paper" : ""} ${className ?? ""}`}
    >
      {isLoading && <Indicator />}
      {head &&
        cloneElement(head, {
          isCollapsed: !expanded && collapsed,
          isExpanded: expanded,
          onBack,
          onClose,
          onClick: !expanded && toggleCollapse,
          onCollapse: isCollapsable && toggleCollapse,
          onExpand: isExpandable && toggleExpand,
        })}
      {(!head || !collapsed || expanded) && body}
    </div>
  );
};

AxPanel.Group = PanelGroup;
AxPanel.Stack = PanelStack;

AxPanel.displayName = "AxPanel";
AxPanel.Group.displayName = "AxPanel.Group";
AxPanel.Stack.displayName = "AxPanel.Stack";
