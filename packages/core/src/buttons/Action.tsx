/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isString } from "@axux/utilities";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { AxAnimation } from "../animations";
import { AxTooltip } from "../overlays/Tooltip";
import { HandleCallback } from "../types";
import { AxButton, ButtonProps } from "./Button";

export interface ActionProps extends ButtonProps {
  /**
   * action message
   */
  message: string;
  /**
   * action type
   */
  actionType?: "danger" | "success";

  onClick?: HandleCallback;
}

export const ActionButton: FC<ActionProps> = ({
  onClick,
  message,
  color,
  variant: style,
  tooltip,
  actionType = "success",
  children,
  ...props
}) => {
  const [actionDone, setActionDone] = useState(false);

  /** ***************** handle click *******************/
  const doClick = useCallback(() => {
    const ret = onClick?.();
    void Promise.resolve(ret).then((b) => {
      if (b !== false) {
        setActionDone(true);
      }
    });
  }, [onClick]);

  /** ***************** reset done state on timeout *******************/
  useEffect(() => {
    if (actionDone) {
      const timer = setTimeout(() => setActionDone(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [actionDone]);

  /** ***************** normalize tooltip content *******************/
  const tooltipContent = useMemo(() => {
    if (actionDone || !tooltip) return { content: message };
    return isString(tooltip) ? { content: tooltip } : tooltip;
  }, [message, tooltip, actionDone]);

  /** ***************** component *******************/
  return (
    <AxTooltip
      {...tooltipContent}
      isDisabled={!tooltip}
      isOpen={actionDone || undefined}
      placement="top"
    >
      <AxButton
        {...props}
        onClick={doClick}
        data-active={actionDone}
        data-action-done={actionDone}
        color={actionDone ? actionType : color}
        variant={actionDone ? "solid" : style}
        data-extra={
          actionDone && (
            <div className="animated-svg">
              {actionType === "success" && (
                <AxAnimation.Check className="text-success-500" />
              )}
              {actionType === "danger" && (
                <AxAnimation.Cross className="text-danger-400" />
              )}
            </div>
          )
        }
      >
        {children}
      </AxButton>
    </AxTooltip>
  );
};
