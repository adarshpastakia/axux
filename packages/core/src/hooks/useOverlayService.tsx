/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useCallback, useState, type FC, type ReactPortal } from "react";
import { createPortal } from "react-dom";

type OverlayComponent = FC<{
  onClose: (args?: AnyObject) => void;
  [key: string]: AnyObject;
}>;

export const useOverlayService = (
  ModalOrFlyout: OverlayComponent,
): [
  Overlay: ReactPortal | null,
  openOverlay: (props?: KeyValue) => Promise<AnyObject>,
] => {
  const [Overlay, setOverlay] = useState<ReactPortal | null>(null);

  /** ***************** overlay container *******************/
  const overlayContainer = useCallback(() => {
    return document.body.querySelector<HTMLElement>(
      ".ax-overlay__container[data-mode='overlay']",
    );
  }, []);

  const openOverlay = async ({ onClose, ...props }: KeyValue = {}) => {
    const el = overlayContainer();
    if (!el) return;
    return await new Promise((resolve) => {
      const handleClose = (args: AnyObject) => {
        setOverlay(null);
        resolve(args);
        onClose?.(args);
      };
      setOverlay(
        createPortal(<ModalOrFlyout {...props} onClose={handleClose} />, el),
      );
    });
  };

  return [Overlay, openOverlay];
};
