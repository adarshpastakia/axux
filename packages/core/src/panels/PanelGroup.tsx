// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Children, cloneElement, FC, useCallback, useEffect, useState } from "react";

/** @internal */
export interface PanelGroupProps {
  accordion?: boolean;
  activePanel?: string;
  onActiveChange?: (panelId: string) => void;
}

/**
 * Panel accordion group
 * @param children
 * @param accordion
 * @param activePanel
 * @param onActiveChange
 * @constructor
 * @internal
 */
export const AxPanelGroup: FC<PanelGroupProps> = ({
  children,
  accordion,
  activePanel,
  onActiveChange
}) => {
  const [expandedPanel, setExpandedPanel] = useState<string>();

  useEffect(() => {
    setExpandedPanel(activePanel);
  }, [activePanel]);

  const changeExpanded = useCallback((collapsed: boolean, id: string, handler?: AnyObject) => {
    if (!collapsed) {
      setExpandedPanel(id);
      onActiveChange && onActiveChange(id);
    }
    handler && handler(collapsed);
  }, [onActiveChange]);

  return (
    <div className="ax-panel__group">
      {Children.toArray(children).map((child: AnyObject) =>
        cloneElement(
          child,
          accordion
            ? {
                panelId: child.props.panelId || child.key,
                isCollapsable: true,
                isAccordion: true,
                onCollapse: (b: boolean, id: string) =>
                  changeExpanded(b, id, child.props.onCollapse),
                isCollapsed: expandedPanel !== (child.props.panelId || child.key)
              }
            : undefined
        )
      )}
    </div>
  );
};
AxPanelGroup.displayName = "AxPanel.Group";
