/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  FC,
  Fragment,
  ReactNode,
  RefObject,
  useImperativeHandle,
  useState,
} from "react";

export interface OverlayRef {
  showAlert: (key: string, alert: ReactNode) => void;
  closeAlert: (key: string) => void;
  showOverlay: (key: string, overlay: ReactNode) => void;
  closeOverlay: (key: string) => void;
  closeAll: () => void;
}

export const OverlayContainer: FC<{ itemRef: RefObject<OverlayRef> }> = ({
  itemRef,
}) => {
  const [overlays, setOverlays] = useState<KeyValue<ReactNode>>({});
  const [alerts, setAlerts] = useState<KeyValue<ReactNode>>({});

  useImperativeHandle(
    itemRef,
    () => ({
      showAlert: (key: string, alert: ReactNode) =>
        setAlerts({ ...overlays, [key]: alert }),
      showOverlay: (key: string, overlay: ReactNode) =>
        setOverlays({ ...alerts, [key]: overlay }),
      closeAlert: (key: string) => {
        setAlerts(
          Object.fromEntries(
            Object.entries(overlays).filter(([k]) => k !== key)
          )
        );
      },
      closeOverlay: (key: string) => {
        setOverlays(
          Object.fromEntries(Object.entries(alerts).filter(([k]) => k !== key))
        );
      },
      closeAll: () => {
        setAlerts({});
        setOverlays({});
      },
    }),
    [overlays, alerts]
  );

  return (
    <Fragment>
      <div className="ax-overlay__container" data-mode="overlay">
        {Object.values(overlays)}
      </div>
      <div className="ax-overlay__container" data-mode="alert">
        {Object.values(alerts)}
      </div>
    </Fragment>
  );
};
OverlayContainer.displayName = "OverlayContainer";
