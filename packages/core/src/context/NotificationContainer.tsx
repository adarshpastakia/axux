/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  FC,
  Fragment,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useState,
} from "react";

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

  return (
    <Fragment>
      <div className="ax-notification__container" data-mode="toast">
        {Object.values(toasts)}
      </div>
      <div className="ax-notification__container" data-mode="message">
        {Object.values(messages)}
      </div>
    </Fragment>
  );
};
NotificationContainer.displayName = "NotificationContainer";
