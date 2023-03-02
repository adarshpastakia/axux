/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isObject, isString } from "@axux/utilities";
import { useCallback } from "react";
import { render } from "react-dom";
import { AlertProps, AxAlert } from "../overlays/Alert";
import { AxMessage, MessageProps } from "../overlays/Message";
import { AxToast, ToastProps } from "../overlays/Toast";

export const useNotificationService = () => {
  /** ***************** refactor props *******************/
  const makeProps = (obj: AnyObject): AnyObject => {
    if (isString(obj)) {
      return { message: obj };
    } else if (isObject(obj)) {
      return { ...obj };
    }
    return { message: "" };
  };

  /** ***************** overlay container *******************/
  const overlayContainer = useCallback(() => {
    return document.body.querySelector(".ax-overlay__container") as HTMLElement;
  }, []);

  /** ***************** message container *******************/
  const messageContainer = useCallback(() => {
    return document.body.querySelector(
      ".ax-notification__container[data-mode='message']"
    ) as HTMLElement;
  }, []);

  /** ***************** toast container *******************/
  const toastContainer = useCallback(() => {
    return document.body.querySelector(
      ".ax-notification__container[data-mode='toast']"
    ) as HTMLElement;
  }, []);

  /** ***************** alert dialog *******************/
  const alert = async (props: Omit<AlertProps, "onClose" | "rootRef">) => {
    const el = document.createElement("div");
    overlayContainer().appendChild(el);
    return await new Promise<boolean | string>((resolve) => {
      let rootEl: HTMLElement;
      const handleClose = (b: string | boolean = false) => {
        rootEl.dataset.show = "";
        setTimeout(() => {
          el.remove();
        }, 250);
        resolve(b);
      };
      const show = (el: AnyObject) => {
        rootEl = el;
        el &&
          requestAnimationFrame(() => {
            (el as HTMLElement).dataset.show = "true";
          });
      };
      render(<AxAlert {...props} rootRef={show} onClose={handleClose} />, el);
    });
  };

  /** ***************** message *******************/
  const message = async (
    props: string | Omit<MessageProps, "onClose" | "rootRef">,
    timeout = 5000
  ) => {
    const obj: MessageProps = makeProps(props);
    const el = document.createElement("div");
    messageContainer().appendChild(el);
    return await new Promise<boolean>((resolve) => {
      let timerRef: AnyObject = null;
      const handleClose = (b = false) => {
        el.dataset.show = "false";
        setTimeout(() => {
          clearTimeout(timerRef);
          el.remove();
          resolve(b);
        }, 250);
      };
      const show = () => {
        el &&
          requestAnimationFrame(() => {
            (el as HTMLElement).dataset.show = "true";
          });
      };
      render(<AxMessage {...obj} onClose={handleClose} rootRef={show} />, el);
      if (timeout > 0) {
        timerRef = setTimeout(handleClose, timeout);
      }
    });
  };

  /** ***************** toasts *******************/
  const onCloseAll = () => {
    toastContainer()
      .querySelectorAll<HTMLButtonElement>(
        ".ax-toast__close > .close-x:last-child"
      )
      .forEach((b) => b.click());
  };

  const toast = async (
    props: string | Omit<ToastProps, "onClose" | "onCloseAll" | "rootRef">,
    timeout = 5000
  ) => {
    const obj: ToastProps = makeProps(props);
    const el = document.createElement("div");
    toastContainer().appendChild(el);
    return await new Promise<boolean>((resolve) => {
      let timerRef: AnyObject = null;
      const handleClose = (b = false) => {
        el.dataset.show = "false";
        setTimeout(() => {
          clearTimeout(timerRef);
          el.remove();
          resolve(b);
        }, 250);
      };
      const show = () => {
        el &&
          requestAnimationFrame(() => {
            (el as HTMLElement).dataset.show = "true";
          });
      };
      render(<AxToast {...obj} onClose={handleClose} rootRef={show} />, el);
      if (obj.type !== "confirm" && timeout > 0) {
        timerRef = setTimeout(handleClose, timeout);
      }
    });
  };

  const toastError = async (
    props:
      | string
      | Omit<ToastProps, "color" | "onClose" | "onCloseAll" | "rootRef">,
    timeout = 30000
  ) => {
    const obj: ToastProps = makeProps(props);
    return await toast({ ...obj, color: "danger" }, timeout);
  };

  return { alert, message, toast, toastError, closeAll: onCloseAll };
};
