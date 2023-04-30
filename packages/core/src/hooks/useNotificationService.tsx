/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isObject, isString, uuid } from "@axux/utilities";
import { useGlobals } from "../context/Global";
import { AxAlert, type AlertProps } from "../overlays/Alert";
import { AxMessage, type MessageProps } from "../overlays/Message";
import { AxToast, type ToastProps } from "../overlays/Toast";

export const useNotificationService = () => {
  const { overlayRef, notificationRef } = useGlobals();

  /** ***************** refactor props *******************/
  const makeProps = (obj: AnyObject): AnyObject => {
    if (isString(obj)) {
      return { message: obj };
    } else if (isObject(obj)) {
      return { ...obj };
    }
    return { message: "" };
  };

  /** ***************** alert dialog *******************/
  const alert = async (props: Omit<AlertProps, "onClose" | "rootRef">) => {
    return await new Promise<string | boolean>((resolve) => {
      const key = uuid();
      let rootEl: HTMLElement;
      const show = (el: AnyObject) => {
        rootEl = el;
        el &&
          requestAnimationFrame(
            () => ((el.firstElementChild as HTMLElement).dataset.show = "true")
          );
      };
      const handleClose = (b: string | boolean = false) => {
        rootEl?.firstElementChild &&
          ((rootEl.firstElementChild as HTMLElement).dataset.show = "");
        setTimeout(() => {
          overlayRef.current?.closeAlert(key);
          resolve(b);
        }, 250);
      };
      overlayRef.current?.showAlert(
        key,
        <div key={key} ref={show} className="contents">
          <AxAlert {...props} onClose={handleClose} />
        </div>
      );
    });
  };

  /** ***************** message *******************/
  const message = async (
    props: string | Omit<MessageProps, "onClose" | "rootRef">,
    timeout = 5000
  ) => {
    const obj: MessageProps = makeProps(props);
    return await new Promise<boolean>((resolve) => {
      const key = uuid();
      let timerRef: AnyObject = null;
      let rootEl: HTMLElement;
      const show = (el: AnyObject) => {
        rootEl = el;
        el &&
          requestAnimationFrame(() => {
            (el as HTMLElement).dataset.show = "true";
          });
      };
      const handleClose = (b = false) => {
        rootEl && (rootEl.dataset.show = "false");
        setTimeout(() => {
          notificationRef.current?.closeMessage(key);
          clearTimeout(timerRef);
          resolve(b);
        }, 250);
      };
      notificationRef.current?.showMessage(
        key,
        <div key={key} ref={show}>
          <AxMessage {...obj} onClose={handleClose} />
        </div>
      );
      if (timeout > 0) {
        timerRef = setTimeout(handleClose, timeout);
      }
    });
  };

  /** ***************** toasts *******************/
  const onCloseAll = () => {
    notificationRef.current?.closeAllToasts();
  };

  const toast = async (
    props: string | Omit<ToastProps, "onClose" | "onCloseAll" | "rootRef">,
    timeout = 5000
  ) => {
    const obj: ToastProps = makeProps(props);
    return await new Promise<boolean>((resolve) => {
      const key = uuid();
      let timerRef: AnyObject = null;
      let rootEl: HTMLElement;
      const show = (el: AnyObject) => {
        rootEl = el;
        el &&
          requestAnimationFrame(() => {
            (el as HTMLElement).dataset.show = "true";
          });
      };
      const handleClose = (b = false) => {
        rootEl && (rootEl.dataset.show = "false");
        setTimeout(() => {
          notificationRef.current?.closeToast(key);
          clearTimeout(timerRef);
          resolve(b);
        }, 250);
      };
      notificationRef.current?.showToast(
        key,
        <div key={key} ref={show}>
          <AxToast {...obj} onClose={handleClose} onCloseAll={onCloseAll} />
        </div>
      );
      if (obj.type !== "confirm" && timeout > 0) {
        timerRef = setTimeout(handleClose, timeout);
      }
    });
  };

  const toastError = async (
    props: string | Omit<ToastProps, "color" | "onClose" | "onCloseAll" | "rootRef">,
    timeout = 30000
  ) => {
    const obj: ToastProps = makeProps(props);
    return await toast({ ...obj, color: "danger" }, timeout);
  };

  return { alert, message, toast, toastError, closeAll: onCloseAll };
};
