// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { ReactNodeArray, useMemo } from "react";
import { AxPopper } from "../internals/Popper";
import { AxPanelStack } from "../panels/PanelStack";
import { ElementProps, VFC } from "../types";

export interface ContextMenuProps extends ElementProps {
  menu: ReactNodeArray;
  x: number;
  y: number;
}

export const AxContextMenu: VFC<ContextMenuProps & { onClose: () => void }> = ({
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
