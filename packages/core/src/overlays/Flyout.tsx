/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC, type MouseEvent, useCallback, useLayoutEffect, useRef } from "react";
import { AxHeader } from "../components/Header";
import { AxTitle } from "../components/Title";
import { AxHotKey } from "../hotkeys/HotKey";
import { HotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { AxIcon } from "../icons/Icon";
import {
  type ChildProp,
  CloseX,
  type Color,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
  type Size,
} from "../types";

export interface FlyoutProps extends ElementProps, IconProp, ChildProp {
  /**
   * header title
   */
  title?: string | JSX.Element;
  /**
   * header actions
   */
  actions?: false | JSX.Element[];
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
   * close on click capture
   */
  closeOnClick?: boolean;
  /**
   * close on click capture
   */
  noMask?: boolean;
  /**
   * close handler
   */
  onClose?: EmptyCallback;
}

export const AxFlyout: FC<FlyoutProps> = ({
  children,
  placement,
  size,
  width,
  title,
  actions,
  headerClass,
  icon,
  noMask = false,
  rtlFlip,
  iconBg,
  iconClass,
  iconColor,
  closeOnClick,
  onClose,
  ...rest
}) => {
  const maskRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (maskRef.current) {
      maskRef.current.dataset.show = "";
      setTimeout(() => {
        onClose?.();
      }, 250);
    }
  };

  useLayoutEffect(() => {
    const el = maskRef.current;
    // @ts-expect-error ignore
    el.close = onClose;
    el && requestAnimationFrame(() => (el.dataset.show = "true"));
  }, []);

  const tryClose = useCallback(
    (e: MouseEvent) => {
      if (
        closeOnClick &&
        (e.target as HTMLElement).closest(".prevent-close") == null
      ) {
        handleClose();
      }
    },
    [closeOnClick, handleClose]
  );

  return (
    <div
      {...rest}
      className="ax-overlay__mask"
      ref={maskRef}
      data-hide-mask={noMask}
      onClick={handleClose}
      onClickCapture={tryClose}
    >
      <HotKeyWrapper>
        <AxHotKey global keyCombo="esc" handler={handleClose} />
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
              {CloseX(handleClose)}
            </AxHeader>
          )}
          {children}
        </div>
      </HotKeyWrapper>
    </div>
  );
};
AxFlyout.displayName = "AxFlyout";
