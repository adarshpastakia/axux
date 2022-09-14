/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { Fragment, useCallback, useEffect, useState } from "react";
import { useMapContext } from "../viewer/MapViewer";

export const Zoom = () => {
  const { map, draw, viewport } = useMapContext();
  const [zoomLevel, setZoomLevel] = useState(0);

  useEffect(() => {
    const cb = (e: KeyValue) => {
      const z = map.getZoom();
      const x = map.getMaxZoom();
      const n = map.getMinZoom();
      setZoomLevel(z <= n ? -1 : z >= x ? 1 : 0);
    };
    map.on("zoom", cb);

    map.on("wheel", (e) => {
      e.originalEvent.shiftKey
        ? map.scrollZoom.enable()
        : map.scrollZoom.disable();
    });

    return () => {
      map.off("zoom", cb);
    };
  }, [map]);

  const resetView = useCallback(() => {
    map.easeTo(viewport, { resetView: true });
  }, [viewport, map]);

  return (
    <Fragment>
      <AxButton.Group isVertical>
        <AxButton
          isDisabled={zoomLevel === 1}
          icon="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
          className="flush"
          onClick={() => !!map.zoomIn()}
        />
        <AxButton
          isDisabled={zoomLevel === -1}
          icon="M19,13H5V11H19V13Z"
          className="flush"
          onClick={() => !!map.zoomOut()}
        />
      </AxButton.Group>

      <AxButton
        icon="M12 5.69L17 10.19V18H15V12H9V18H7V10.19L12 5.69M12 3L2 12H5V20H11V14H13V20H19V12H22"
        className="flush"
        onClick={resetView}
      />
    </Fragment>
  );
};
