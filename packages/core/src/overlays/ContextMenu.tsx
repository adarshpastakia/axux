// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  Children,
  cloneElement,
  FC,
  MouseEvent,
  ReactElement,
  useCallback,
  useMemo,
  useState
} from "react";
import { AxPopper } from "../internals/Popper";
import { AxPanelStack } from "../panels/PanelStack";
import { VFC } from "../types";

export interface ContextMenuPopperProps {
  menu: JSX.Element[];
  onClick?: (menuId: string) => void;
  className?: string;
  x: number;
  y: number;
}

export const AxContextMenuPopper: VFC<ContextMenuPopperProps & { onClose: () => void }> = ({
  menu,
  x,
  y,
  className,
  onClick,
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
      <AxPanelStack className={className}>
        {Children.map(menu, (m) => cloneElement(m as ReactElement, { onClick }))}
      </AxPanelStack>
    </AxPopper>
  );
};

export interface ContextMenuProps {
  menu: JSX.Element[];
  className?: string;
  onClick?: (menuId: string) => void;
  onContextMenu?: (e: MouseEvent) => boolean;
}

export const AxContextMenu: FC<ContextMenuProps> = ({
  children,
  onContextMenu,
  onClick,
  className,
  menu
}) => {
  const [rect, setRect] = useState({
    x: 0,
    y: 0
  });

  const [isOpen, setIsOpen] = useState(false);

  const preventMouseup = useCallback((e) => {
    e.target.removeEventListener("mouseup", preventMouseup);
    e.stopPropagation();
    e.preventDefault();
    return false;
  }, []);

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if ((e.target as HTMLDivElement).closest(".ax-menu")) return false;
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
          onClick={onClick}
          onClose={() => setIsOpen(false)}
        />
      )}
      {children}
    </div>
  );
};
