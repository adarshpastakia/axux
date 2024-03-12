/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { isString } from "@axux/utilities/src";
import { useCallback, useEffect, useMemo, useState, type FC } from "react";
import { AxAnimation } from "../animations";
import { AxTooltip } from "../overlays/Tooltip";
import { AxButton, type ButtonProps } from "./Button";

export interface ActionProps extends ButtonProps {
  /**
   * action message
   */
  message: string;
  /**
   * action type
   */
  actionType?: "danger" | "success";
}

/**
 * Action button to show tooltip message on success
 *
 * @requires This button expects a `onClick` return value of boolean type,
 * if true will display given message and display animated check/cross
 *
 * @prop message
 * @prop actionType - danger | success
 * @prop see Button
 */
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
                <AxAnimation.Check className="text-success-base" />
              )}
              {actionType === "danger" && (
                <AxAnimation.Cross className="text-danger-base" />
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
