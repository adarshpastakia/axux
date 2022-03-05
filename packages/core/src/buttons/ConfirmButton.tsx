// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { Placement } from "@popperjs/core";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxPopover } from "../overlays/Popover";
import { AxSection } from "../page/Section";
import { AxContent } from "../panels/Content";
import { AxPanel } from "../panels/Panel";
import { AxText } from "../typography/Text";
import { AxButton, ButtonProps } from "./Button";

export interface ConfirmProps extends Omit<ButtonProps, "onClick" | "hideCaret"> {
  message: string;
  placement?: Placement;
  okLabel?: string;
  cancelLabel?: string;
  onClick: (confirm: boolean) => void;
}

export const AxConfirmButton: FC<ConfirmProps> = ({
  onClick,
  message,
  placement = "right",
  okLabel,
  cancelLabel,
  ...props
}) => {
  const { t } = useTranslation("core");
  const [isOpen, setOpen] = useState(false);
  return (
    <AxPopover
      isOpen={isOpen}
      usePortal
      onClose={() => setOpen(false)}
      closeOnClick
      showArrow
      placement={placement}
    >
      <AxButton onClick={() => setOpen(true)} {...props} hideCaret />
      <AxPanel>
        <AxPopover.PreventClose>
          <AxContent padding="sm">
            <AxText size="sm">{message}</AxText>
          </AxContent>
        </AxPopover.PreventClose>
        <AxSection.Foot className="ax-align--end ax-padding--x--sm ax-border--none">
          <AxButton.Neutral size="sm" onClick={() => onClick?.(false)}>
            {cancelLabel ?? t("action.cancel")}
          </AxButton.Neutral>
          <span>&nbsp;</span>
          <AxButton.Positive size="sm" onClick={() => onClick?.(true)}>
            {okLabel ?? t("action.ok")}
          </AxButton.Positive>
        </AxSection.Foot>
      </AxPanel>
    </AxPopover>
  );
};
