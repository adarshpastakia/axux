/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, useState } from "react";
import { createPortal, unmountComponentAtNode } from "react-dom";

type OverlayComponent = FC<{
  onClose: () => void;
  [key: string]: AnyObject;
}>;

export const useOverlayService = () => {
  const [Overlay, setOverlay] = useState<AnyObject>();
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
          setOverlay(undefined);
          el.remove();
          resolve();
        }, 250);
      };
      setOverlay(
        createPortal(<ModalOrFlyout {...props} onClose={handleClose} />, el)
      );
      requestAnimationFrame(
        () => ((el.firstElementChild as HTMLElement).dataset.show = "true")
      );
    });
  };

  return { openOverlay, Overlay };
};
