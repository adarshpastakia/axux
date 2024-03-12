/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useMemo, useState, type FC, type ReactPortal } from "react";
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
  const overlayContainer = useMemo(() => {
    return document.body.querySelector<HTMLElement>(
      ".ax-overlay__container[data-mode='overlay']",
    );
  }, []);

  const openOverlay = async ({ onClose, ...props }: KeyValue = {}) => {
    if (!overlayContainer) return;
    return await new Promise((resolve) => {
      const handleClose = (args: AnyObject) => {
        setOverlay(null);
        resolve(args);
        onClose?.(args);
      };
      setOverlay(
        createPortal(
          <ModalOrFlyout {...props} onClose={handleClose} />,
          overlayContainer,
        ),
      );
    });
  };

  return [Overlay, openOverlay];
};
