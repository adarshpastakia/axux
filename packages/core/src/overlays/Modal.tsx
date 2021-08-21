// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isNumber } from "@axux/utilities";
import { Children, cloneElement, FC, forwardRef, ReactElement, useMemo } from "react";
import { AxFooter } from "../appbars/Footer";
import { AxHeader } from "../appbars/Header";
import { AxButton } from "../buttons/Button";
import { ElementProps, EmptyCallback, IconProps, RefProp, Size } from "../types";
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
  onClose?: EmptyCallback;
  onNavigate?: (dir: "prev" | "next") => void;
}

interface ExtendedFC extends FC<ModalProps> {
  Header: typeof AxHeader;
  Footer: typeof AxFooter;
}

export const AxModal: ExtendedFC = forwardRef<HTMLDivElement, ModalProps>(
  ({ children, icon, title, onClose, onNavigate, size, height, width }, ref) => {
    const header = useMemo(() => {
      const head = Children.toArray(children).find(
        (child) =>
          child &&
          "type" in (child as KeyValue) &&
          (child as KeyValue).type.displayName === "AxModal.Header"
      ) as ReactElement;

      const actions = <AxButton type="link" icon={AppIcons.iconClose} onClick={onClose} />;

      if (head) {
        const childs = Array.isArray(head.props.children)
          ? head.props.children
          : [head.props.children];
        return cloneElement(head as ReactElement, {
          children: [...childs, actions]
        });
      } else {
        return (
          <AxHeader title={title} icon={icon}>
            {actions}
          </AxHeader>
        );
      }
    }, [children, icon, onClose, title]);

    const childs = useMemo(
      () =>
        Children.toArray(children).filter(
          (child) =>
            child &&
            "type" in (child as KeyValue) &&
            (child as KeyValue).type.displayName !== "AxModal.Header"
        ),
      [children]
    );

    const styles = useMemo(() => {
      return {
        height: isNumber(height) ? `${height}rem` : height,
        width: isNumber(width) ? `${width}rem` : width
      };
    }, [height, width]);

    return (
      <div className="ax-modal" ref={ref} data-size={size} style={styles}>
        <div className="ax-modal__header">{header}</div>
        <div className="ax-modal__wrapper">
          {onNavigate && (
            <AxButton
              type="link"
              tabIndex={-1}
              icon={AppIcons.iconPrev}
              onClick={() => onNavigate("prev")}
            />
          )}
          <div className="ax-modal__body" tabIndex={0}>
            {childs}
          </div>
          {onNavigate && (
            <AxButton
              data-end="true"
              tabIndex={-1}
              type="link"
              icon={AppIcons.iconNext}
              onClick={() => onNavigate("next")}
            />
          )}
        </div>
      </div>
    );
  }
) as AnyObject;
AxModal.Header = AxHeader;
AxModal.Footer = AxFooter;

AxModal.displayName = "AxModal";
AxModal.Header.displayName = "AxModal.Header";
AxModal.Footer.displayName = "AxModal.Footer";
