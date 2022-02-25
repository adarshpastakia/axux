// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { AxTooltip } from "../overlays/Tooltip";
import { Size } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxButton, ButtonProps } from "./Button";

export interface ActionProps extends ButtonProps {
  size?: Size;
}

export const AxActionButton: FC<ActionProps> = ({ onClick, type, color, icon, ...props }) => {
  const [actionDone, setActionDone] = useState(false);
  const doClick = useCallback(
    (e: MouseEvent) => {
      onClick && onClick(e);
      setActionDone(true);
    },
    [onClick]
  );
  useEffect(() => {
    if (actionDone) {
      const timer = setTimeout(() => setActionDone(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [actionDone]);
  return (
    <AxTooltip content="Copied!" isDisabled={!actionDone} isOpen={actionDone} usePortal>
      <AxButton
        onClick={doClick}
        type={actionDone ? "solid" : type}
        color={actionDone ? "success" : color}
        icon={actionDone ? AppIcons.iconCheckAll : icon}
        {...props}
      />
    </AxTooltip>
  );
};
