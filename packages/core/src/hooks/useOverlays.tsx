// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2022
// @license   : MIT

import { getChildProps } from "@axux/utilities/dist/react";
import { cloneElement, ReactNode } from "react";
import { render, unmountComponentAtNode } from "react-dom";

export const useAxOverlays = () => {
  const openOverlay = (modalOrFlyout: ReactNode) => {
    if (!["AxModal", "AxFlyout"].includes((modalOrFlyout as AnyObject).type.displayName ?? "")) {
      throw Error("Invalid overlay element");
    }

    const el = document.createElement("div");
    document.body.appendChild(el);

    return new Promise<void>((resolve) => {
      const onClose = getChildProps(modalOrFlyout)?.onClose;
      const handleClose = () => {
        const ret = onClose?.();
        if (ret instanceof Promise) {
          ret.then((b) => {
            if (b !== false) {
              unmountComponentAtNode(el);
              el.remove();
              resolve();
            }
          });
        } else if (ret !== false) {
          unmountComponentAtNode(el);
          el.remove();
          resolve();
        }
      };
      render(cloneElement(modalOrFlyout as AnyObject, { onClose: handleClose }), el);
    });
  };

  return { openOverlay };
};
