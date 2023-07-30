/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import Graphic from "@arcgis/core/Graphic";
import { type FC, useEffect } from "react";
import { ICON_MARKER, type LngLatLike } from "../constants/types";
import { useMapContext } from "../context/MapContext";
import { colorArray, convertLatLng } from "../utils";

export interface MarkerProps {
  location: LngLatLike;
  color?: string;
  marker?: string;
}

export const Marker: FC<MarkerProps> = ({
  location,
  color = "#8b5cf6",
  marker = ICON_MARKER,
}) => {
  const { view } = useMapContext();

  useEffect(() => {
    try {
      const [lon, lat] = convertLatLng(location);
      const point = {
        type: "point", // autocasts as new Point()
        longitude: lon,
        latitude: lat,
      } as AnyObject;

      // Create a symbol for drawing the point
      const markerSymbol = {
        type: "simple-marker",
        color: colorArray(color),
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
        size: 32,
        xoffset: 0,
        yoffset: 16,
        path: marker,
      };

      // Create a graphic and add the geometry and symbol to it
      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
      });

      const graphic = view?.graphics.add(pointGraphic);
      view?.on("layerview-create", () => {
        void view?.goTo({ center: [lon, lat], zoom: 11 });
      });

      return () => {
        graphic?.removeAll();
      };
    } catch {
      //
    }
  }, [location, color, marker, view]);

  return null;
};
