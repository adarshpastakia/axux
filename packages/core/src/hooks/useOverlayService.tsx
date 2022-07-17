/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { unmountComponentAtNode } from "react-dom";
import { createRoot } from "react-dom/client";

type OverlayComponent = FC<{
  onClose: () => void;
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
      const handleClose = () => {
        (el.firstElementChild as HTMLElement).dataset.show = "";
        setTimeout(() => {
          unmountComponentAtNode(el);
          el.remove();
          resolve();
        }, 250);
      };
      createRoot(el).render(<ModalOrFlyout {...props} onClose={handleClose} />);
      requestAnimationFrame(
        () => ((el.firstElementChild as HTMLElement).dataset.show = "true")
      );
    });
  };

  return { openOverlay };
};
