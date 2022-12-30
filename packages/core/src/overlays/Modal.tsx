/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { AxButton } from "../buttons/Button";
import { AxHeader } from "../components/Header";
import { AxTitle } from "../components/Title";
import { useIsRtl } from "../hooks/useIsRtl";
import { AxHotKey } from "../hotkeys/HotKey";
import { HotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { AxIcon } from "../icons/Icon";
import {
  ChildProp,
  CloseX,
  Color,
  ElementProps,
  EmptyCallback,
  IconProp,
  NavigationDirection,
  Size,
} from "../types";
import { AppIcons } from "../types/appIcons";

export interface ModalProps extends ElementProps, IconProp, ChildProp {
  /**
   * header title
   */
  title?: string | JSX.Element;
  /**
   * header actions
   */
  actions?: JSX.Element[];
  /**
   * header class
   */
  headerClass?: HTMLDivElement["className"];

  /**
   * icon bg
   */
  iconBg?: Color | string;
  /**
   * icon color
   */
  iconColor?: Color | string;
  /**
   * icon class
   */
  iconClass?: HTMLDivElement["className"];

  /**
   * modal size
   */
  size?: Size | "xl";
  /**
   * height
   */
  height?: string | number;
  /**
   * width
   */
  width?: string | number;
  /**
   * minimum height
   */
  minHeight?: string | number;
  /**
   * minimum width
   */
  minWidth?: string | number;
  /**
   * close handler
   */
  onClose?: EmptyCallback;
  /**
   * navigation handler
   */
  onNavigate?: (dir: NavigationDirection) => void;
}

export const AxModal: FC<ModalProps> = ({
  children,
  size,
  height,
  width,
  minHeight,
  minWidth,
  title,
  actions,
  headerClass,
  icon,
  rtlFlip,
  iconBg,
  iconClass,
  iconColor,
  onClose,
  onNavigate,
}) => {
  const isRtl = useIsRtl();
  return (
    <div
      className="ax-overlay__mask"
      onClick={(e) => (onClose?.(), e.stopPropagation())}
    >
      <HotKeyWrapper>
        <AxHotKey global keyCombo="esc" handler={onClose} />
        <AxHotKey global keyCombo="left" handler={() => onNavigate?.("prev")} />
        <AxHotKey
          global
          keyCombo="right"
          handler={() => onNavigate?.("next")}
        />
        <div
          className="ax-modal"
          data-size={size}
          tabIndex={0}
          style={{ height, width, minHeight, minWidth }}
          onClick={(e) => e.stopPropagation()}
        >
          <AxHeader className={`ax-modal__header ${headerClass ?? ""}`}>
            {icon && (
              <AxIcon
                icon={icon}
                rtlFlip={rtlFlip}
                bg={iconBg}
                color={iconColor}
                className={`ax-modal__icon ${iconClass ?? ""}`}
              />
            )}
            <AxTitle className="ax-modal__title">{title}</AxTitle>
            <div className="ax-modal__actions">{actions}</div>
            {CloseX(onClose)}
          </AxHeader>
          <div className="ax-modal__body">
            {onNavigate != null && (
              <AxButton
                rtlFlip
                variant="link"
                icon={AppIcons.iconCaretLeft}
                onClick={() => onNavigate("prev")}
                aria-label={isRtl ? "next" : "previous"}
              />
            )}
            {children}
            {onNavigate != null && (
              <AxButton
                rtlFlip
                variant="link"
                icon={AppIcons.iconCaretRight}
                onClick={() => onNavigate("next")}
                aria-label={isRtl ? "previous" : "next"}
              />
            )}
          </div>
        </div>
      </HotKeyWrapper>
    </div>
  );
};
