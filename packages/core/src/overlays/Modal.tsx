// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isNumber, isRtl } from "@axux/utilities";
import {
  Children,
  cloneElement,
  FC,
  forwardRef,
  KeyboardEvent,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef
} from "react";
import { AxFooter } from "../appbars/Footer";
import { AxHeader } from "../appbars/Header";
import { AxButton } from "../buttons/Button";
import { AxHotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { AxLoader } from "../loader/Loader";
import { ElementProps, IconProps, RefProp, Size } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface ModalProps extends ElementProps, IconProps, RefProp<HTMLDivElement> {
  /**
   * Panel id
   */
  id?: string;
  /**
   * Panel title
   */
  title?: string;
  /**
   * Height
   */
  height?: string | number;
  /**
   * Width
   */
  width?: string | number;
  size?: Size;
  isLoading?: boolean;
  onClose?: () => Promise<boolean | void> | boolean | void;
  onNavigate?: (dir: "prev" | "next") => void;
}

interface ExtendedFC extends FC<ModalProps> {
  Header: typeof AxHeader;
  Footer: typeof AxFooter;
}

export const AxModal: ExtendedFC = forwardRef<HTMLDivElement, ModalProps>(
  (
    { children, className, icon, title, isLoading, onClose, onNavigate, size, height, width },
    ref
  ) => {
    const maskRef = useRef<HTMLDivElement>(null);

    const header = useMemo(() => {
      const head = Children.toArray(children).find(
        (child) => child && "type" in (child as KeyValue) && (child as KeyValue).type === AxHeader
      ) as ReactElement;

      const actions = (
        <AxButton key="close-link" type="link" icon={AppIcons.iconClose} onClick={onClose} />
      );

      if (head) {
        const childs = Array.isArray(head.props.children)
          ? head.props.children
          : [head.props.children];
        return cloneElement(head as ReactElement, {
          size: head.props.size ?? "lg",
          children: [...childs, actions]
        });
      } else {
        return (
          <AxHeader title={title} icon={icon} size="lg">
            {actions}
          </AxHeader>
        );
      }
    }, [children, icon, onClose, title]);

    const childs = useMemo(
      () =>
        Children.toArray(children).filter(
          (child) => child && "type" in (child as KeyValue) && (child as KeyValue).type !== AxHeader
        ),
      [children]
    );

    const styles = useMemo(() => {
      return {
        height,
        width
      };
    }, [height, width]);

    useLayoutEffect(() => {
      if (maskRef.current) {
        const el = maskRef.current;
        requestAnimationFrame(() => {
          (el.firstElementChild as HTMLElement).focus();
          el.dataset.show = "true";
        });
      }
    }, []);

    const keyHandler = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          onClose?.();
        }
        const target = event.target as HTMLElement;
        const { ctrlKey, shiftKey, altKey, metaKey, key } = event;
        if (
          !ctrlKey &&
          !shiftKey &&
          !altKey &&
          !metaKey &&
          (key === "ArrowLeft" || key === "ArrowRight")
        ) {
          if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
            onNavigate &&
              onNavigate(key === (isRtl() ? "ArrowRight" : "ArrowLeft") ? "prev" : "next");
            event.stopPropagation();
            event.preventDefault();
          }
        }
      },
      [onClose, onNavigate]
    );

    return (
      <AxHotKeyWrapper>
        <div className="ax-overlay__mask ax-root" ref={maskRef} onKeyDown={keyHandler}>
          <div
            className={`ax-modal ${className ?? ""}`}
            ref={ref}
            data-size={size}
            style={styles}
            tabIndex={0}
          >
            <div className="ax-modal__header">{header}</div>
            <div className="ax-modal__wrapper">
              {onNavigate && (
                <AxButton
                  type="link"
                  tabIndex={-1}
                  className="flippable"
                  icon={AppIcons.iconCaretLeft}
                  onClick={() => onNavigate("prev")}
                />
              )}
              <div className="ax-modal__body">{childs}</div>
              {onNavigate && (
                <AxButton
                  type="link"
                  tabIndex={-1}
                  data-end="true"
                  className="flippable"
                  icon={AppIcons.iconCaretRight}
                  onClick={() => onNavigate("next")}
                />
              )}
            </div>
            {isLoading && <AxLoader />}
          </div>
        </div>
      </AxHotKeyWrapper>
    );
  }
) as AnyObject;
AxModal.Header = AxHeader;
AxModal.Footer = AxFooter;

AxModal.displayName = "AxModal";
