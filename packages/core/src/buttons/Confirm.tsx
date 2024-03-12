/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { Popover } from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import { type FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { AxPopover } from "../overlays/Popover";
import { type BooleanCallback } from "../types";
import { AxButton, type ButtonProps } from "./Button";

export interface ConfirmProps extends ButtonProps {
  /**
   * action message
   */
  message: string;
  /**
   * action type
   */
  actionType?: "danger" | "success";
  /**
   * ok label
   */
  okLabel?: string;
  /**
   * ok label
   */
  cancelLabel?: string;
  /**
   * popover placement
   */
  placement?: Placement;
  /**
   * click handler
   */
  onClick?: BooleanCallback;
}

/**
 * Confirm button to show confirmation message before handle click
 *
 * @prop message
 * @prop actionType - danger | success
 * @prop okLabel
 * @prop cancelLabel
 * @prop placement
 * @prop onClick(@param boolean)
 * @prop see Button
 */
export const ConfirmButton: FC<ConfirmProps> = ({
  onClick,
  message,
  actionType = "success",
  okLabel,
  cancelLabel,
  placement,
  children,
  ...props
}) => {
  const { t } = useTranslation("core");
  /** ***************** component *******************/
  return (
    <AxPopover placement={placement} showArrow>
      <AxButton {...props}>{children}</AxButton>
      <div className="p-2" role="none" onClick={(e) => e.stopPropagation()}>
        <div>{message}</div>
        <div className="flex justify-end">
          <Popover.Button as={Fragment}>
            <AxButton
              size="sm"
              variant="link"
              color={actionType}
              {...{ onMouseUp: () => onClick?.(false) }}
            >
              {cancelLabel ?? t("action.cancel")}
            </AxButton>
          </Popover.Button>
          <Popover.Button as={Fragment}>
            <AxButton
              size="sm"
              variant="solid"
              color={actionType}
              {...{ onMouseUp: () => onClick?.(true) }}
            >
              {okLabel ?? t("action.ok")}
            </AxButton>
          </Popover.Button>
        </div>
      </div>
    </AxPopover>
  );
};
