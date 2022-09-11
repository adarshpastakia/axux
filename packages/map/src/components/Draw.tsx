/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import MapboxDraw from "@mapbox/mapbox-gl-draw";
import { useEffect } from "react";
import { DrawCircle } from "../utils/DrawCircle";
import { useMapContext } from "../viewer/MapViewer";

export const Draw = () => {
  const { map } = useMapContext();

  useEffect(() => {
    if (map) {
      var draw = new MapboxDraw({
        displayControlsDefault: false,
        boxSelect: false,
        defaultMode: "draw-circle",
        modes: {
          "draw-circle": DrawCircle,
          ...MapboxDraw.modes,
        },
      });
      map.addControl(draw as AnyObject);
    }
  }, [map]);

  return null;
};
