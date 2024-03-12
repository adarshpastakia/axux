/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import {
  useCallback,
  useLayoutEffect,
  useRef,
  type FC,
  type MouseEvent,
} from "react";
import { AxHeader } from "../components/Header";
import { AxTitle } from "../components/Title";
import { AxHotKey } from "../hotkeys/HotKey";
import { HotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { AxIcon } from "../icons/Icon";
import { Close } from "../internal/Close";
import {
  type ChildProp,
  type Color,
  type ElementProps,
  type EmptyCallback,
  type IconProp,
  type Size,
} from "../types";

export interface ModalProps extends ElementProps, IconProp, ChildProp {
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
    el &&
      requestAnimationFrame(() => {
        el.dataset.show = "true";
        !el.contains(document.activeElement) &&
          el.querySelector<HTMLElement>(".ax-modal")?.focus();
      });
  }, []);

  const handleMouseEvent = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (e.target === maskRef.current) {
      onClose?.();
    }
  }, []);

  return (
    <div
      ref={maskRef}
      role="none"
      className="ax-overlay__mask"
      onMouseDown={handleMouseEvent}
      onClick={(e) => e.stopPropagation()}
    >
      <HotKeyWrapper>
        <AxHotKey global keyCombo="esc" handler={handleClose} />
        <div
          role="dialog"
          className="ax-modal"
          data-size={size}
          {...({ tabIndex: 0 } as AnyObject)}
          style={{ height, width, minHeight, minWidth }}
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
            {Close(handleClose)}
          </AxHeader>
          {children}
        </div>
      </HotKeyWrapper>
    </div>
  );
};
