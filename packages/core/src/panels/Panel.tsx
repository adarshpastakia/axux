// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { Children, cloneElement, FC, forwardRef, ReactElement, useMemo } from "react";
import { AxFooter } from "../appbars/Footer";
import { AxHeader } from "../appbars/Header";
import { AxButton } from "../buttons/Button";
import { usePropToggle } from "../internals/usePropToggle";
import { AxLoader } from "../loader/Loader";
import {
  CollapseProps,
  ElementProps,
  EmptyCallback,
  ExpandProps,
  IconProps,
  RefProp
} from "../types";
import { AppIcons } from "../types/appIcons";
import { AxPanelGroup } from "./PanelGroup";
import { AxPanelStack } from "./PanelStack";

/** @internal */
export interface PanelProps
  extends CollapseProps,
    ExpandProps,
    ElementProps,
    IconProps<JSX.Element>,
    RefProp<HTMLDivElement> {
  /**
   * Panel id
   */
  panelId?: string;
  /**
   * Panel title
   */
  title?: string;
  paper?: boolean;
  /**
   * Height
   */
  height?: string | number;
  /**
   * Min height
   */
  minHeight?: string | number;
  /**
   * Max height
   */
  maxHeight?: string | number;
  /**
   * Show loading indicator
   */
  isLoading?: boolean;
  onClose?: EmptyCallback;
  /**
   *
   */
  onBack?: EmptyCallback;
}

interface ExtendedFC extends FC<PanelProps> {
  Group: typeof AxPanelGroup;
  Stack: typeof AxPanelStack;
  Header: typeof AxHeader;
  Footer: typeof AxFooter;
}

/**
 * Panel
 * @internal
 */
export const AxPanel: ExtendedFC = forwardRef<HTMLDivElement, PanelProps>(
  (
    {
      panelId,
      icon,
      title,
      className,
      isExpandable,
      isCollapsable,
      isExpanded = false,
      isCollapsed = false,
      onCollapse,
      onBack,
      onExpand,
      onClose,
      paper,
      isLoading,
      height,
      minHeight,
      maxHeight,
      children,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      isAccordion,
      onClick,
      ...props
    },
    ref
  ) => {
    const [collapsed, toggleCollapse] = usePropToggle(isCollapsed, onCollapse, panelId);
    const [expanded, toggleExpand] = usePropToggle(isExpanded, onExpand, panelId);

    const header = useMemo(() => {
      const head = Children.toArray(children).find(
        (child) => child && "type" in (child as KeyValue) && (child as KeyValue).type === AxHeader
      ) as ReactElement;

      const actions = (
        <AxButton.Group key="__panelActions__" className="ax-panel__tools">
          {isExpandable && (
            <AxButton
              type="link"
              aria-label="Collapse"
              icon={expanded ? AppIcons.iconCollapse : AppIcons.iconExpand}
              onClick={toggleExpand}
            />
          )}
          {!expanded && isCollapsable && (
            <AxButton
              type="link"
              aria-label="Expand"
              icon={collapsed ? AppIcons.iconExpandPlus : AppIcons.iconCollapseMinus}
              onClick={toggleCollapse}
            />
          )}
          {onClose && (
            <AxButton type="link" icon={AppIcons.iconClose} onClick={onClose} aria-label="Close" />
          )}
        </AxButton.Group>
      );

      if (head) {
        const childs = Array.isArray(head.props.children)
          ? head.props.children
          : [head.props.children];
        return cloneElement(head as ReactElement, {
          children: [...childs, actions],
          onBack,
          onClick: isAccordion && collapsed ? () => toggleCollapse() : undefined
        });
      } else if (!!title || isExpandable || isCollapsable || !!onClose || !!onBack) {
        return (
          <AxHeader
            title={title}
            icon={icon}
            onBack={onBack}
            onClick={isAccordion && collapsed ? () => toggleCollapse() : undefined}
          >
            {actions}
          </AxHeader>
        );
      }

      return null;
    }, [
      children,
      isExpandable,
      expanded,
      toggleExpand,
      isCollapsable,
      collapsed,
      toggleCollapse,
      onClose,
      title,
      onBack,
      isAccordion,
      icon
    ]);

    const childs = useMemo(
      () =>
        Children.toArray(children).filter(
          (child) => child && "type" in (child as KeyValue) && (child as KeyValue).type !== AxHeader
        ),
      [children]
    );

    const styles = useMemo(() => {
      return {
        height,
        minHeight,
        maxHeight
      };
    }, [height, minHeight, maxHeight]);

    const classes = useMemo(() => {
      const cls = ["ax-panel", className ?? ""];
      if (onClick) {
        cls.push("ax-clickable");
      }
      if (paper) {
        cls.push("ax-paper");
      }
      return cls.join(" ");
    }, [className, onClick, paper]);

    return (
      <div
        ref={ref}
        className={classes}
        data-collapse={collapsed}
        data-expand={expanded}
        onClick={onClick}
        style={styles}
        {...props}
      >
        {header}
        <div className="ax-panel__body">{childs}</div>
        {isLoading && <AxLoader />}
      </div>
    );
  }
) as AnyObject;
AxPanel.Group = AxPanelGroup;
AxPanel.Stack = AxPanelStack;
AxPanel.Header = AxHeader;
AxPanel.Footer = AxFooter;

AxPanel.displayName = "AxPanel";
AxPanel.Group.displayName = "AxPanel.Group";
AxPanel.Stack.displayName = "AxPanel.Stack";
AxPanel.Header.displayName = "AxPanel.Header";
AxPanel.Footer.displayName = "AxPanel.Footer";
