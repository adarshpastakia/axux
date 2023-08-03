/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  type FC,
  Fragment,
  type ReactNode,
  type RefObject,
  useImperativeHandle,
  useState,
} from "react";
import { createPortal } from "react-dom";

export interface NotificationRef {
  showToast: (key: string, toast: ReactNode) => void;
  closeToast: (key: string) => void;
  showMessage: (key: string, message: ReactNode) => void;
  closeMessage: (key: string) => void;
  closeAllToasts: () => void;
  closeAll: () => void;
}

export const NotificationContainer: FC<{
  itemRef: RefObject<NotificationRef>;
}> = ({ itemRef }) => {
  const [toasts, setToasts] = useState<KeyValue<ReactNode>>({});
  const [messages, setMessages] = useState<KeyValue<ReactNode>>({});

  useImperativeHandle(
    itemRef,
    () => ({
      showToast: (key: string, toast: ReactNode) =>
        setToasts({ ...toasts, [key]: toast }),
      showMessage: (key: string, message: ReactNode) =>
        setMessages({ ...messages, [key]: message }),
      closeToast: (key: string) => {
        setToasts(
          Object.fromEntries(Object.entries(toasts).filter(([k]) => k !== key))
        );
      },
      closeMessage: (key: string) => {
        setMessages(
          Object.fromEntries(
            Object.entries(messages).filter(([k]) => k !== key)
          )
        );
      },
      closeAll: () => {
        setMessages({});
        setToasts({});
      },
      closeAllToasts: () => setToasts({}),
    }),
    [toasts, messages]
  );

  return createPortal(
    <Fragment>
      <div className="ax-notification__container" data-mode="toast">
        {Object.values(toasts)}
      </div>
      <div className="ax-notification__container" data-mode="message">
        {Object.values(messages)}
      </div>
    </Fragment>,
    document.body
  );
};
NotificationContainer.displayName = "NotificationContainer";
