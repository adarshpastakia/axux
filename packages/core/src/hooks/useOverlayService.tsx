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
      let rootEl: HTMLElement;
      const show = (el: AnyObject) => {
        rootEl = el;
        el &&
          requestAnimationFrame(
            () => ((el.firstElementChild as HTMLElement).dataset.show = "true")
          );
      };
      const handleClose = (args: AnyObject) => {
        rootEl?.firstElementChild &&
          ((rootEl.firstElementChild as HTMLElement).dataset.show = "");
        setTimeout(() => {
          overlayRef.current?.closeOverlay(key);
          resolve(args);
        }, 250);
      };
      overlayRef.current?.showOverlay(
        key,
        <div key={key} ref={show} className="contents">
          <ModalOrFlyout {...props} onClose={handleClose} />
        </div>
      );
    });
  };

  return openOverlay;
};
