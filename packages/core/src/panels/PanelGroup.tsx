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
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type ChildrenProp, type ElementProps } from "../types";

export interface PanelGroupProps extends ElementProps, ChildrenProp {
  /**
   * active panel id
   */
  activePanel?: string;
  /**
   * active change callback
   */
  onActiveChange?: (panelId: string) => void;
}

/**
 * Accordion style grouped panels
 */
export const PanelGroup: FC<PanelGroupProps> = ({
  children,
  className,
  activePanel,
  onActiveChange,
}) => {
  const [expandedPanel, setExpandedPanel] = useState<string>();

  const panels = useMemo(
    () =>
      Children.toArray(children).map(
        (child: AnyObject, index: number) =>
          child.props.panelId || child.key || index,
      ),
    [children],
  );

  useEffect(() => {
    setExpandedPanel(activePanel ?? panels[0]);
  }, [activePanel, panels]);

  const changeExpanded = useCallback(
    (collapsed: boolean, id: string, handler?: AnyObject) => {
      if (!collapsed) {
        setExpandedPanel(id);
        onActiveChange?.(id);
      }
      handler?.(collapsed);
      return id !== expandedPanel;
    },
    [onActiveChange, expandedPanel],
  );

  return (
    <div className={`ax-panel__group ${className ?? ""}`}>
      {Children.toArray(children).map((child: AnyObject, index: number) =>
        cloneElement(child, {
          panelId: child.props.panelId || child.key || index,
          isCollapsable: true,
          onCollapse: (b: boolean, id: string) =>
            changeExpanded(b, id, child.props.onCollapse),
          isCollapsed:
            expandedPanel !== (child.props.panelId || child.key || index),
        }),
      )}
    </div>
  );
};
