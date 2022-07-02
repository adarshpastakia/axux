/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { EmptyCallback } from "../types";

type OverlayComponent = FC<{
  onClose: (returnValue?: AnyObject) => void;
  [key: string]: AnyObject;
}>;

export const useOverlayService = () => {
  const openOverlay = (
    ModalOrFlyout: OverlayComponent,
    props: KeyValue = {}
  ) => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    return new Promise<void>((resolve) => {
      const handleClose = (returnValue?: AnyObject) => {
        (el.firstElementChild as HTMLElement).dataset.show = "";
        setTimeout(() => {
          unmountComponentAtNode(el);
          el.remove();
          resolve(returnValue);
        }, 250);
      };
      render(<ModalOrFlyout {...props} onClose={handleClose} />, el);
      requestAnimationFrame(
        () => ((el.firstElementChild as HTMLElement).dataset.show = "true")
      );
    });
  };

  return { openOverlay };
};
