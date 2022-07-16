/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Popover } from "@headlessui/react";
import { Placement } from "@popperjs/core";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { AxPopover } from "../overlays/Popover";
import { BooleanCallback } from "../types";
import { AxButton, ButtonProps } from "./Button";

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
  /******************* component *******************/
  return (
    <AxPopover placement={placement}>
      <AxButton {...props}>{children}</AxButton>
      <div className="p-2">
        <p>{message}</p>
        <div>
          <Popover.Button>
            <AxButton
              size="sm"
              style="link"
              color={actionType}
              onClick={() => onClick?.(false)}
            >
              {cancelLabel ?? t("action.cancel")}
            </AxButton>
          </Popover.Button>
          <Popover.Button>
            <AxButton
              size="sm"
              style="solid"
              color={actionType}
              onClick={() => onClick?.(true)}
            >
              {okLabel ?? t("action.ok")}
            </AxButton>
          </Popover.Button>
        </div>
      </div>
    </AxPopover>
  );
};
