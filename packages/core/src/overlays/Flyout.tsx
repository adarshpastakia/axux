// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

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
  useRef,
  useState
} from "react";
import { AxHeader } from "../appbars/Header";
import { AxButton } from "../buttons/Button";
import { AxHotKeyWrapper } from "../hotkeys/HotKeyWrapper";
import { AxLoader } from "../loader/Loader";
import { ElementProps, EmptyCallback, IconProps, Size } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface FlyoutProps extends ElementProps, IconProps<JSX.Element> {
  /**
   * Panel title
   */
  title?: string;
  size?: Size;
  isLoading?: boolean;
  onClose?: EmptyCallback;
}

export const AxFlyout: FC<FlyoutProps> = forwardRef<HTMLDivElement, FlyoutProps>(
  ({ children, className, icon, title, size, isLoading, onClose }, ref) => {
    const maskRef = useRef<HTMLDivElement>(null);
    const [isOpen, setOpen] = useState(false);

    const handleClose = useCallback(() => {
      requestAnimationFrame(() => {
        setOpen(false);
        setTimeout(() => {
          onClose?.();
        }, 500);
      });
    }, [onClose]);

    const header = useMemo(() => {
      const head = Children.toArray(children).find(
        (child) => child && "type" in (child as KeyValue) && (child as KeyValue).type === AxHeader
      ) as ReactElement;

      const actions = (
        <AxButton key="close-link" type="link" icon={AppIcons.iconClose} onClick={handleClose} />
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
    }, [children, icon, handleClose, title]);

    const childs = useMemo(
      () =>
        Children.toArray(children).filter(
          (child) => child && "type" in (child as KeyValue) && (child as KeyValue).type !== AxHeader
        ),
      [children]
    );

    useLayoutEffect(() => {
      if (maskRef.current) {
        const el = maskRef.current;
        requestAnimationFrame(() => {
          (el.firstElementChild as HTMLElement).focus();
          setOpen(true);
          el.dataset.show = "true";
        });
      }
    }, []);

    const keyHandler = useCallback(
      (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          handleClose();
        }
      },
      [handleClose]
    );

    return (
      <AxHotKeyWrapper>
        <div
          className="ax-overlay__mask ax-root"
          ref={maskRef}
          onKeyDown={keyHandler}
          onClick={(e) => !(e.target as HTMLElement).closest(".ax-flyout") && handleClose()}
        >
          <div
            className={`ax-flyout ${className ?? ""}`}
            ref={ref}
            data-size={size}
            data-show={isOpen}
            tabIndex={0}
          >
            <div className="ax-flyout__header">{header}</div>
            <div className="ax-flyout__body">{childs}</div>
            {isLoading && <AxLoader />}
          </div>
        </div>
      </AxHotKeyWrapper>
    );
  }
);
AxFlyout.displayName = "AxFlyout";
