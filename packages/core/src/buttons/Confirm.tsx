/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Popover } from "@headlessui/react";
import { type Placement } from "@popperjs/core";
import { type FC, Fragment } from "react";
import { useTranslation } from "react-i18next";
import { AxPopover } from "../overlays/Popover";
import { type BooleanCallback } from "../types";
import { AxButton, type ButtonProps } from "./Button";

export interface ConfirmProps extends Omit<ButtonProps, "onClick"> {
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
    <AxPopover placement={placement}>
      <AxButton {...props}>{children}</AxButton>
      <div className="p-2" onClick={(e) => e.stopPropagation()}>
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
