/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  Fragment,
  useImperativeHandle,
  useState,
  type FC,
  type ReactNode,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";

export interface OverlayRef {
  showAlert: (key: string, alert: ReactNode) => void;
  closeAlert: (key: string) => void;
  closeAll: () => void;
}

export const OverlayContainer: FC<{ itemRef: RefObject<OverlayRef> }> = ({
  itemRef,
}) => {
  const [alerts, setAlerts] = useState<KeyValue<ReactNode>>({});

  useImperativeHandle(
    itemRef,
    () => ({
      showAlert: (key: string, alert: ReactNode) => setAlerts({ [key]: alert }),
      closeAlert: (key: string) => {
        setAlerts(
          Object.fromEntries(Object.entries(alerts).filter(([k]) => k !== key))
        );
      },
      closeAll: () => {
        setAlerts({});
        document.body
          .querySelectorAll(".ax-overlay__container[data-mode='overlay']>div")
          // @ts-expect-error ignore
          .forEach((node) => (node.close ? node.close() : node.remove()));
      },
    }),
    [alerts]
  );

  return createPortal(
    <Fragment>
      <div className="ax-overlay__container" data-mode="overlay" />
      <div className="ax-overlay__container" data-mode="alert">
        {Object.values(alerts)}
      </div>
    </Fragment>,
    document.body
  );
};
OverlayContainer.displayName = "OverlayContainer";
