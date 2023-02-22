/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { uuid } from "@axux/utilities";
import { FC } from "react";
import { useGlobals } from "../context/Global";

type OverlayComponent = FC<{
  onClose: (args: AnyObject) => void;
  [key: string]: AnyObject;
}>;

export const useOverlayService = (
  ModalOrFlyout: OverlayComponent
): ((props?: KeyValue) => Promise<AnyObject>) => {
  const { overlayRef } = useGlobals();

  if (!overlayRef)
    throw Error(
      "To use overlay service wrap application in AxApplicationProvider"
    );

  const openOverlay = async (props: KeyValue = {}) => {
    return await new Promise((resolve) => {
      const key = uuid();
      const handleClose = (args: AnyObject) => {
        overlayRef.current?.closeOverlay(key);
        resolve(args);
      };
      overlayRef.current?.showOverlay(
        key,
        <ModalOrFlyout key={key} {...props} onClose={handleClose} />
      );
    });
  };

  return openOverlay;
};
