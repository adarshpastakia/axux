/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  Fragment,
  useImperativeHandle,
  useRef,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
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
  const refItems = useRef<KeyValue>({ toasts: {}, messages: {} });
  const [toasts, setToasts] = useState<KeyValue<ReactNode>>({});
  const [messages, setMessages] = useState<KeyValue<ReactNode>>({});

  useImperativeHandle(
    itemRef,
    () => ({
      showToast: (key: string, toast: ReactNode) => {
        refItems.current.toasts[key] = toast;
        setToasts({ ...refItems.current.toasts });
      },
      showMessage: (key: string, message: ReactNode) => {
        refItems.current.messages[key] = message;
        console.log(refItems.current.messages);
        setMessages({ ...refItems.current.messages });
      },
      closeToast: (key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete refItems.current.toasts[key];
        setToasts({ ...refItems.current.toasts });
      },
      closeMessage: (key: string) => {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete refItems.current.messages[key];
        setMessages({ ...refItems.current.messages });
      },
      closeAll: () => {
        refItems.current.messages = {};
        refItems.current.toasts = {};
        setMessages(refItems.current.messages);
        setToasts(refItems.current.toasts);
      },
      closeAllToasts: () => setToasts({}),
    }),
    [],
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
