// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useMemo, VFC } from "react";
import { useTranslation } from "react-i18next";
import { AxButton } from "../buttons/Button";
import { AxIcon } from "../icons/Icon";
import { Color, IconProps } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface ToastProps extends IconProps {
  /**
   * Toast title
   */
  title?: string;
  /**
   * Toast message
   */
  text?: string | JSX.Element;
  /**
   * Toast type
   */
  type?: "alert" | "confirm";
  /**
   * Theme color
   */
  color?: Color;
  /**
   * OK button label
   */
  okLabel?: string;
  /**
   * Cancel button label
   */
  cancelLabel?: string;
  /**
   * Extra action button
   */
  extraAction?: JSX.Element;
}

/**
 * Notification toast
 * @param title
 * @param text
 * @param dismissLabel
 * @param icon
 * @param color
 * @param onClose
 * @constructor
 */
export const AxToast: VFC<ToastProps & { [key: string]: AnyObject }> = ({
  title,
  text,
  okLabel,
  cancelLabel,
  icon,
  type = "alert",
  color = "primary",
  extraActions,
  onClose,
  onCloseAll
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

  return (
    <div className="ax-toast" data-color={color}>
      <div className="ax-alert--close">
        <AxButton icon={AppIcons.iconClose} type="link" onClick={() => onClose && onClose(false)} />
        <AxButton
          icon={AppIcons.iconCloseAll}
          type="link"
          onClick={() => onCloseAll && onCloseAll()}
        />
      </div>
      <div className="ax-toast__icon">
        <AxIcon icon={icon ?? iconType} />
      </div>
      {title && <div className="ax-toast__title">{title}</div>}
      <span className="ax-toast__text">{text}</span>
      <div className="ax-toast__footer">
        <div className="ax-col--fill">{extraActions}</div>
        {type === "confirm" && (
          <AxButton
            type="link"
            color={color}
            label={cancelText}
            onClick={() => onClose && onClose(false)}
          />
        )}
        <AxButton
          type="outline"
          color={color}
          label={okText}
          data-default={true}
          onClick={() => onClose && onClose(true)}
        />
      </div>
    </div>
  );
};
AxToast.displayName = "AxToast";
