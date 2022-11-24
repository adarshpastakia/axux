/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import ZoomWidget from "@arcgis/core/widgets/Zoom";
import { useEffect } from "react";
import { useMapContext } from "../context/MapContext";

export const Zoom = () => {
  const { view, basemaps } = useMapContext();

  useEffect(() => {
    if (view) {
      const zoomTool = new ZoomWidget({
        view,
      });
      view?.ui.add(zoomTool, { index: -1, position: "top-leading" });

      return () => {
        view?.ui.remove(zoomTool);
      };
    }
  }, [view, basemaps]);

  return null;
};
