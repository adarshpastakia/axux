/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { getValue } from "@axux/utilities";
import { useCallback, useMemo, useState, type FC, type Ref } from "react";
import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { AxIcon } from "../icons/Icon";
import { Close } from "../internal/Close";
import { type Color, type IconProp } from "../types";
import { AppIcons } from "../types/appIcons";

export interface AlertProps extends IconProp {
  /**
   * alert type
   */
  type?: "alert" | "confirm" | "prompt";
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
  actions?: false | JSX.Element[];
  /**
   * ok label
   */
  okLabel?: string;
  /**
   * cancel label
   */
  cancelLabel?: string;
  /**
   * placeholder for prompt
   */
  placeholder?: string;
  /**
   * default value for prompt
   */
  defaultValue?: string;

  onClose: (b?: boolean | string) => void;

  rootRef?: Ref<HTMLDivElement>;

  width?: string | number;
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
  placeholder,
  defaultValue = "",
  onClose,
  rootRef,
  width,
}) => {
  const { t } = useTranslation("core");
  const [value, setValue] = useState(defaultValue);
  const iconType = useMemo(() => {
    switch (type) {
      case "prompt":
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
      onClose?.(ret && type === "prompt" ? value : ret);
    },
    [type, value, onClose],
  );

  return (
    <div
      ref={rootRef}
      role="none"
      className="ax-overlay__mask"
      onMouseDown={() => closeModal()}
    >
      <div
        role="none"
        className="ax-alert"
        data-color={color}
        onClick={(e) => e.stopPropagation()}
      >
        {Close(closeModal)}
        <div className="ax-alert__icon">
          <AxIcon
            icon={getValue(icon, iconType)}
            color={color}
            rtlFlip={rtlFlip}
          />
        </div>
        {title && <div className="ax-alert__title">{title}</div>}
        {message && <p className="ax-alert__message">{message}</p>}
        <input
          value={value}
          style={{ width }}
          placeholder={placeholder}
          className="ax-alert__input"
          data-hidden={type !== "prompt"}
          ref={(e) => e != null && setTimeout(() => e.focus(), 100)}
          onBlur={(e) => e.target.focus()}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) =>
            (e.key === "Enter" || e.key === "Escape") &&
            closeModal(e.key === "Enter")
          }
        />
        <div className="ax-alert__footer">
          <div onClickCapture={() => onClose?.(false)}>{actions}</div>
          {type !== "alert" && (
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
    </div>
  );
};
AxAlert.displayName = "AxAlert";
