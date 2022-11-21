/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { AxIcon } from "../icons/Icon";
import { CloseX, Color, IconProp } from "../types";
import { AppIcons } from "../types/appIcons";

export interface AlertProps extends IconProp {
  /**
   * alert type
   */
  type?: "alert" | "confirm";
  /**
   * alert color
   */
  color?: Color;
  /**
   * alert title text
   */
  title: string | JSX.Element;
  /**
   * alert message
   */
  message: string | JSX.Element;
  /**
   * extra actions
   */
  actions?: JSX.Element[];
  /**
   * ok label
   */
  okLabel?: string;
  /**
   * cancel label
   */
  cancelLabel?: string;
}

export const AxAlert: FC<AlertProps> = ({
  type = "alert",
  title,
  message,
  color,
  icon,
  actions,
  rtlFlip,
  okLabel,
  cancelLabel,
  // @ts-expect-error
  onClose,
}) => {
  const { t } = useTranslation("core");
  const iconType = useMemo(() => {
    switch (type) {
      case "confirm":
        return AppIcons.iconQuestion;
      default:
        return AppIcons.iconAlert;
    }
  }, [type]);

  const okText = useMemo(() => {
    if (!okLabel) {
      return t("action.ok", "OK");
    }
    return okLabel;
  }, [t, okLabel]);
  const cancelText = useMemo(() => {
    if (!cancelLabel) {
      return t("action.cancel", "Cancel");
    }
    return cancelLabel;
  }, [t, cancelLabel]);

  const closeModal = useCallback(
    (ret = false) => {
      onClose?.(ret);
    },
    [onClose]
  );

  return (
    <div className="ax-alert" data-color={color}>
      {CloseX(closeModal)}
      <div className="ax-alert__icon">
        <AxIcon icon={icon ?? iconType} color={color} rtlFlip={rtlFlip} />
      </div>
      {title && <div className="ax-alert__title">{title}</div>}
      {message && <p className="ax-alert__message">{message}</p>}
      <input
        className="ax-alert__input"
        ref={(e) => e != null && setTimeout(() => e.focus(), 100)}
        onBlur={(e) => e.target.focus()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === "Escape") &&
          closeModal(e.key === "Enter")
        }
      />
      <div className="ax-alert__footer">
        <div onClickCapture={() => onClose?.(false)}>{actions}</div>
        {type === "confirm" && (
          <AxButton
            variant="link"
            color={color}
            onClick={() => closeModal(false)}
          >
            {cancelText}
          </AxButton>
        )}
        <AxButton
          variant="solid"
          color={color}
          onClick={() => closeModal(true)}
        >
          {okText}
        </AxButton>
      </div>
    </div>
  );
};
