// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, MouseEvent, ReactNodeArray, useCallback, useMemo, useState } from "react";
import { AxPopper } from "../internals/Popper";
import { AxPanelStack } from "../panels/PanelStack";
import { ElementProps, VFC } from "../types";

export interface ContextMenuPopperProps extends ElementProps {
  menu: ReactNodeArray;
  x: number;
  y: number;
}

export const AxContextMenuPopper: VFC<ContextMenuPopperProps & { onClose: () => void }> = ({
  menu,
  x,
  y,
  className,
  onClose
}) => {
  const rect = useMemo(
    () => ({
      top: y,
      left: x,
      height: 2,
      width: 2
    }),
    [x, y]
  );

  return (
    <AxPopper
      placement="bottom-start"
      isOpen
      trigger="click"
      autoTrigger={false}
      usePortal
      closeOnClick
      onClose={onClose}
    >
      <span style={{ position: "fixed", pointerEvents: "none", ...rect }} />
      <AxPanelStack className={className}>{menu}</AxPanelStack>
    </AxPopper>
  );
};

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
    x: 0,
    y: 0
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
        const y = e.clientY;
        const x = e.clientX;
        setTimeout(() => {
          setRect({
            x,
            y
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
      {isOpen && (
        <AxContextMenuPopper
          {...rect}
          menu={menu}
          className={className}
          onClose={() => setIsOpen(false)}
        />
      )}
      {children}
    </div>
  );
};
