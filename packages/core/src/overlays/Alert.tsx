// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { AxIcon } from "../icons/Icon";
import { AlertClose } from "../internals/AlertClose";
import { Color, IconProps, VFC } from "../types";
import { AppIcons } from "../types/appIcons";

export interface AlertProps extends IconProps {
  type?: "alert" | "confirm";
  title?: string;
  text: string | JSX.Element;

  color?: Color;

  okLabel?: string;
  cancelLabel?: string;

  extraActions?: JSX.Element[];
}

/**
 * Alert overlay
 * @param title
 * @param text
 * @param type
 * @param color
 * @param icon
 * @param extraActions
 * @param okLabel
 * @param cancelLabel
 * @param onClose
 * @constructor
 */
export const AxAlert: VFC<AlertProps & { [key: string]: AnyObject }> = ({
  title,
  text,
  type = "alert",
  color = "primary",
  icon,
  extraActions,
  okLabel,
  cancelLabel,
  onClose
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

  const handleClose = useCallback(
    (b: boolean) => {
      onClose && onClose(b);
    },
    [onClose]
  );

  return (
    <div className="ax-alert" data-color={color}>
      <AlertClose onClick={() => handleClose(false)} />
      <div className="ax-alert__icon">
        <AxIcon icon={icon || iconType} color={color} />
      </div>
      {title && <div className="ax-alert__title">{title}</div>}
      {text && <p className="ax-alert__text">{text}</p>}
      <input
        className="ax-alert__input"
        ref={(e) => e && setTimeout(() => e.focus(), 100)}
        onBlur={(e) => e.target.focus()}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === "Escape") && handleClose(e.key === "Enter")
        }
      />
      <div className="ax-alert__footer">
        <div onClickCapture={() => onClose?.(false)}>{extraActions}</div>
        {type === "confirm" && (
          <AxButton
            type="link"
            color={color}
            label={cancelText}
            onClick={() => handleClose(false)}
          />
        )}
        <AxButton type="solid" color={color} label={okText} onClick={() => handleClose(true)} />
      </div>
    </div>
  );
};
AxAlert.displayName = "AxAlert";
