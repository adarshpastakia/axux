// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Children, cloneElement, FC, useCallback, useEffect, useState } from "react";

/** @internal */
export interface PanelGroupProps {
  accordion?: boolean;
  activePanel?: string;
}

/**
 * Panel accordion group
 * @param children
 * @param accordion
 * @param activePanel
 * @constructor
 * @internal
 */
export const AxPanelGroup: FC<PanelGroupProps> = ({ children, accordion, activePanel }) => {
  const [expandedPanel, setExpandedPanel] = useState<string>();

  useEffect(() => {
    setExpandedPanel(activePanel);
  }, [activePanel]);

  const changeExpanded = useCallback((collapsed: boolean, id: string, handler?: AnyObject) => {
    if (!collapsed) {
      setExpandedPanel(id);
    }
    handler && handler(collapsed);
  }, []);

  return (
    <div className="ax-panel__group">
      {Children.toArray(children).map((child: AnyObject) =>
        cloneElement(
          child,
          accordion
            ? {
                id: child.props.id || child.key,
                collapsable: true,
                onCollapse: (b: boolean, id: string) =>
                  changeExpanded(b, id, child.props.onCollapse),
                collapsed: expandedPanel !== (child.props.id || child.key)
              }
            : undefined
        )
      )}
    </div>
  );
};
AxPanelGroup.displayName = "AxPanel.Group";
