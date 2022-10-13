/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isObject, isString } from "@axux/utilities";
import { useMemo } from "react";
import { createPortal } from "react-dom";
import { createRoot } from "react-dom/client";
import { AlertProps, AxAlert } from "../overlays/Alert";
import { AxMessage, MessageProps } from "../overlays/Message";
import { AxToast, ToastProps } from "../overlays/Toast";

export const useNotificationService = () => {
  /******************* refactor props *******************/
  const makeProps = (obj: AnyObject): AnyObject => {
    if (isString(obj)) {
      return { message: obj };
    } else if (isObject(obj)) {
      return { ...obj };
    }
    return { message: "" };
  };

  /******************* message container *******************/
  const overlayContainer = useMemo(() => {
    let el = document.body.querySelector(
      ".ax-overlay__container"
    ) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "ax-overlay__container";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  /******************* message container *******************/
  const messageContainer = useMemo(() => {
    let el = document.body.querySelector(
      ".ax-notification__container[data-mode='message']"
    ) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "ax-notification__container";
      el.dataset.mode = "message";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  /******************* toast container *******************/
  const toastContainer = useMemo(() => {
    let el = document.body.querySelector(
      ".ax-notification__container[data-mode='toast']"
    ) as HTMLElement;
    if (!el) {
      el = document.createElement("div");
      el.className = "ax-notification__container";
      el.dataset.mode = "toast";
      document.body.appendChild(el);
    }
    return el;
  }, []);

  /******************* alert dialog *******************/
  const alert = (props: AlertProps) => {
    const el = document.createElement("div");
    el.className = "ax-overlay__mask";
    overlayContainer.appendChild(el);
    const root = createRoot(el);
    return new Promise<boolean>((resolve) => {
      const onClose = (b = false) => {
        el.dataset.show = "";
        setTimeout(() => {
          el.remove();
        }, 250);
        resolve(b);
      };
      el.onclick = () => onClose();
      // @ts-ignore
      root.render(<AxAlert {...props} onClose={onClose} />);
      requestAnimationFrame(() => (el.dataset.show = "true"));
    });
  };

  /******************* message *******************/
  const message = (props: string | MessageProps, timeout = 5000) => {
    const obj: MessageProps = makeProps(props);
    return new Promise<boolean>((resolve) => {
      let timerRef: AnyObject = null;
      const el = document.createElement("div");
      messageContainer.appendChild(el);
      const root = createRoot(el);
      const onClose = (b = true) => {
        el.dataset.show = "";
        setTimeout(() => {
          root.unmount();
          el.remove();
        }, 250);
        clearTimeout(timerRef);
        resolve(b);
      };
      // @ts-ignore
      root.render(<AxMessage {...obj} onClose={onClose} />);
      requestAnimationFrame(() => (el.dataset.show = "true"));
      if (timeout > 0) {
        timerRef = setTimeout(onClose, timeout);
      }
    });
  };

  /******************* toasts *******************/
  const onCloseAll = () => {
    toastContainer
      .querySelectorAll<HTMLButtonElement>(
        ".ax-toast__close > .close-x:last-child"
      )
      .forEach((b) => b.click());
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
        }, 250);
        clearTimeout(timerRef);
        resolve(b);
      };
      root.render(
        // @ts-ignore
        <AxToast {...obj} onClose={onClose} onCloseAll={onCloseAll} />
      );
      requestAnimationFrame(() => (el.dataset.show = "true"));
      if (obj.type !== "confirm" && timeout > 0) {
        timerRef = setTimeout(onClose, timeout);
      }
    });
  };

  const toastError = (
    props: string | Omit<ToastProps, "color">,
    timeout = 30000
  ) => {
    const obj: ToastProps = makeProps(props);
    return toast({ ...obj, color: "danger" }, timeout);
  };

  return { alert, message, toast, toastError };
};
