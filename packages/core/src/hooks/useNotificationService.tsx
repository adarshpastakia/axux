// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isObject, isString } from "@axux/utilities";
import { useMemo } from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { createRoot } from "react-dom";
import { AxMessage, MessageProps } from "../overlays/Message";
import { AxToast, ToastProps } from "../overlays/Toast";

/**
 * Service hook for displaying application notifications
 */
export const useAxNotificationService = () => {
  const makeProps = (obj: AnyObject): AnyObject => {
    if (isString(obj)) {
      return { text: obj };
    } else if (isObject(obj)) {
      return { ...obj };
    }
    return { text: "" };
  };

  const messageContainer = useMemo(() => {
    let el = document.body.querySelector(
      ".ax-overlay__container[data-mode='message']"
    ) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "ax-overlay__container";
      el.dataset.mode = "message";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  const toastContainer = useMemo(() => {
    let el = document.body.querySelector(
      ".ax-overlay__container[data-mode='toast']"
    ) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "ax-overlay__container";
      el.dataset.mode = "toast";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  const message = (props: string | MessageProps, timeout = 5000) => {
    const obj: MessageProps = makeProps(props);
    return new Promise<void>((resolve) => {
      let timerRef: AnyObject = null;
      const el = document.createElement("div");
      messageContainer.appendChild(el);
      const root = createRoot(el);
      const onClose = () => {
        el.dataset.show = "";
        setTimeout(() => {
          root.unmount();
          el.remove();
        }, 500);
        clearTimeout(timerRef);
        resolve();
      };
      root.render(<AxMessage {...obj} onClose={onClose} />, el);
      setTimeout(() => (el.dataset.show = "true"), 10);
      if (timeout > 0) {
        timerRef = setTimeout(onClose, timeout);
      }
    });
  };

  const toast = (props: string | ToastProps, timeout = 5000) => {
    const obj: ToastProps = makeProps(props);
    return new Promise<boolean>((resolve) => {
      let timerRef: AnyObject = null;
      const el = document.createElement("div");
      toastContainer.appendChild(el);
      const root = createRoot(el);
      const onClose = (b = false) => {
        el.dataset.show = "";
        setTimeout(() => {
          root.unmount();
          el.remove();
        }, 500);
        clearTimeout(timerRef);
        resolve(b);
      };
      root.render(<AxToast {...obj} onClose={onClose} />, el);
      setTimeout(() => (el.dataset.show = "true"), 10);
      if (obj.type !== "confirm" && timeout > 0) {
        timerRef = setTimeout(onClose, timeout);
      }
    });
  };

  return { message, toast };
};
