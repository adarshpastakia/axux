// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, MouseEvent, ReactNodeArray, useCallback, useState } from "react";
import { AxPopper } from "../internals/Popper";
import { AxPanelStack } from "../panels/PanelStack";
import { ElementProps } from "../types";

export interface ContextMenuProps extends ElementProps {
  menu: ReactNodeArray;

  onContextMenu?: (e: MouseEvent) => boolean;
}

export const AxContextMenu: FC<ContextMenuProps> = ({
  children,
  onContextMenu,
  className,
  menu
}) => {
  const [rect, setRect] = useState({
    top: 0,
    left: 0,
    height: 16,
    width: 16
  });

  const [isOpen, setIsOpen] = useState(false);

  const preventMouseup = useCallback((e) => {
    e.stopPropagation();
    e.preventDefault();
    return false;
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (!onContextMenu || onContextMenu(e)) {
        const el = e.currentTarget;
        setTimeout(() => {
          setRect({
            top: e.clientY,
            left: e.clientX,
            height: 16,
            width: 16
          });
          el.addEventListener("mouseup", preventMouseup);
          setIsOpen(true);
          el.removeEventListener("mouseup", preventMouseup);
        }, 200);
      }
      e.stopPropagation();
      e.preventDefault();
      return false;
    },
    [onContextMenu, preventMouseup]
  );

  return (
    <div style={{ display: "contents" }} onContextMenu={handleClick}>
      <AxPopper
        placement="bottom-start"
        isOpen={isOpen}
        trigger="click"
        autoTrigger={false}
        usePortal
        closeOnClick
        onClose={() => setIsOpen(false)}
      >
        <span style={{ position: "fixed", pointerEvents: "none", ...rect }} />
        <AxPanelStack className={className}>{menu}</AxPanelStack>
      </AxPopper>
      {children}
    </div>
  );
};
