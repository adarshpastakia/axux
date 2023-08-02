/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC, type ReactPortal, useCallback, useState } from "react";
import { createPortal } from "react-dom";

type OverlayComponent = FC<{
  onClose: (args?: AnyObject) => void;
  [key: string]: AnyObject;
}>;

export const useOverlayService = (
  ModalOrFlyout: OverlayComponent
): [
  Overlay: ReactPortal | null,
  openOverlay: (props?: KeyValue) => Promise<AnyObject>
] => {
  const [Overlay, setOverlay] = useState<ReactPortal | null>(null);

  /** ***************** overlay container *******************/
  const overlayContainer = useCallback(() => {
    return document.body.querySelector(
      ".ax-overlay__container[data-mode='overlay']"
    ) as HTMLElement;
  }, []);

  const openOverlay = async ({ onClose, ...props }: KeyValue = {}) => {
    return await new Promise((resolve) => {
      const handleClose = (args: AnyObject) => {
        setOverlay(null);
        resolve(args);
        onClose?.(args);
      };
      setOverlay(
        createPortal(
          <ModalOrFlyout {...props} onClose={handleClose} />,
          overlayContainer()
        )
      );
    });
  };

  return [Overlay, openOverlay];
};
