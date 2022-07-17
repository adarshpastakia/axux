/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, useImperativeHandle } from "react";
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
  OverlayRef,
  Size,
} from "../types";

export interface FlyoutProps extends ElementProps, IconProp, ChildProp {
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
   * flyout size
   */
  size?: Size | "xl";
  /**
   * flyout placement
   */
  placement?: "start" | "end";
  /**
   * width
   */
  width?: string | number;
  /**
   * close handler
   */
  onClose?: EmptyCallback;
}

export const AxFlyout = forwardRef<OverlayRef, FlyoutProps>(
  (
    {
      children,
      placement,
      size,
      width,
      title,
      actions,
      headerClass,
      icon,
      rtlFlip,
      iconBg,
      iconClass,
      iconColor,
      onClose,
    },
    ref
  ) => {
    const isRtl = useIsRtl();
    useImperativeHandle(
      ref,
      () => ({
        close: onClose!,
      }),
      [onClose]
    );
    return (
      <div className="ax-overlay__mask" onClick={onClose}>
        <HotKeyWrapper>
          <AxHotKey global keyCombo="esc" handler={onClose} />
          <div
            className="ax-flyout"
            data-size={size}
            data-align={placement}
            style={{ width }}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <AxHeader className={`ax-flyout__header ${headerClass ?? ""}`}>
                {icon && (
                  <AxIcon
                    icon={icon}
                    rtlFlip={rtlFlip}
                    bg={iconBg}
                    color={iconColor}
                    className={`ax-flyout__icon ${iconClass ?? ""}`}
                  />
                )}
                <AxTitle className="ax-flyout__title">{title}</AxTitle>
                <div className="ax-flyout__actions">{actions}</div>
                {CloseX(onClose)}
              </AxHeader>
            )}
            {children}
          </div>
        </HotKeyWrapper>
      </div>
    );
  }
);
