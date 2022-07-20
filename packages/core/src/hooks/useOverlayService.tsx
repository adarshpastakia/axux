/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, ReactElement, useState } from "react";
import { createPortal } from "react-dom";

type OverlayComponent = FC<{
  onClose: () => void;
  [key: string]: AnyObject;
}>;

export const useOverlayService = (
  ModalOrFlyout: OverlayComponent
): [Overlay: ReactElement, openOverlay: (props?: KeyValue) => void] => {
  const [Overlay, setOverlay] = useState<AnyObject>();
  const openOverlay = (props: KeyValue = {}) => {
    const el = document.createElement("div");
    document.body.appendChild(el);
    return new Promise<void>((resolve) => {
      const handleClose = () => {
        (el.firstElementChild as HTMLElement).dataset.show = "";
        setTimeout(() => {
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

  return [Overlay, openOverlay];
};
