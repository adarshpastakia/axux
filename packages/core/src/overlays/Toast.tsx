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

export interface ToastProps extends IconProp {
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

export const AxToast: FC<ToastProps> = ({
  type = "alert",
  title,
  message,
  color,
  icon,
  actions,
  rtlFlip,
  okLabel,
  cancelLabel,
  // @ts-ignore
  onClose,
  // @ts-ignore
  onCloseAll,
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

  const closeToast = useCallback(
    (ret = false) => {
      onClose?.(ret);
    },
    [onClose]
  );

  return (
    <div className="ax-toast" data-color={color}>
      <div className="ax-toast__close">
        {CloseX(onCloseAll, AppIcons.iconCloseAll)}
        {CloseX(closeToast)}
      </div>
      <div className="ax-toast__icon">
        <AxIcon icon={icon || iconType} rtlFlip={rtlFlip} />
      </div>
      {title && <div className="ax-toast__title">{title}</div>}
      {message && <p className="ax-toast__message">{message}</p>}
      <input
        className="ax-toast__input"
        ref={(e) => e && setTimeout(() => e.focus(), 100)}
        onBlur={(e) => e.target.focus()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === "Escape") &&
          closeToast(e.key === "Enter")
        }
      />
      <div className="ax-toast__footer">
        <div onClickCapture={() => onClose?.(false)}>{actions}</div>
        {type === "confirm" && (
          <AxButton
            size="sm"
            color={color}
            onClick={() => closeToast(false)}
          >
            {cancelText}
          </AxButton>
        )}
        <AxButton
          size="sm"
          type="solid"
          color={color}
          onClick={() => closeToast(true)}
        >
          {okText}
        </AxButton>
      </div>
    </div>
  );
};
