/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer";
import { type FC, useEffect, useRef } from "react";
import { PALETTES } from "../constants/Palette";
import { type MapEvent } from "../constants/types";
import { useMapContext } from "../context/MapContext";
import { makeFeatures } from "../utils";

export interface HeatmapProps {
  /**
   * map events
   */
  events: MapEvent[];
  /**
   * layer zIndex
   */
  zIndex?: number;
  /**
   * layer opacity
   */
  opacity?: number;
  /**
   * layer visibility
   */
  visible?: boolean;
  /**
   * layer title
   */
  title?: __esri.GeoJSONLayerProperties["title"];
  /**
   * layer list view mode
   */
  listMode?: __esri.GeoJSONLayerProperties["listMode"];
  /**
   * base color for color stops
   */
  baseColor?: string;
  /**
   * heatmap count field
   */
  countField?: string;
  /**
   * color stops
   */
  colorStops?: __esri.ColorStopProperties[];
}

const DEFAULT_COLORMAP = (() => {
  return PALETTES.GlobalWarming.map((color, idx) => ({
    ratio: (idx + 1) / 7,
    color,
  }));
})();

export const HeatmapLayer: FC<HeatmapProps> = ({
  events,
  title,
  opacity,
  visible,
  countField,
  listMode = "hide",
  colorStops = DEFAULT_COLORMAP,
  zIndex,
  baseColor,
}) => {
  const { map, view } = useMapContext();
  const refLayer = useRef<GeoJSONLayer>();

  useEffect(() => {
    if (map && view) {
      const blob = new Blob([JSON.stringify(makeFeatures(events))], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const layer = new GeoJSONLayer({
        url,
        title,
        listMode,
        visible,
        opacity,
        outFields: ["*"],
        objectIdField: "id",
        popupEnabled: false,
        renderer: new HeatmapRenderer({
          field: countField,
          colorStops: [
            {
              ratio: 0,
              color: "rgba(0,0,0,0)",
            },
            ...colorStops,
          ],
          minDensity: 0,
          maxDensity: 0.25,
          radius: 8,
        }),
      });
      layer.on("layerview-create", () => {
        zIndex !== undefined && map.reorder(layer, zIndex);
      });
      map.add(layer);
      refLayer.current = layer;

      return () => {
        URL.revokeObjectURL(url);
        map?.remove(layer);
      };
    }
  }, [events]);

  return null;
};
