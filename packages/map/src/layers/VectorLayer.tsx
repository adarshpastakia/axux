/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import { type FC, useEffect, useRef } from "react";
import { useMapContext } from "../context/MapContext";

export interface Props {
  source: string;
  title?: string;
  opacity?: number;
}

export const VectorLayer: FC<Props> = ({ source, opacity, title }) => {
  const { map } = useMapContext();
  const refLayer = useRef<VectorTileLayer>({} as VectorTileLayer);

  useEffect(() => {
    if (map) {
      const layer = new VectorTileLayer({
        url: source,
        opacity,
        title,
      });
      map?.add(layer);
      refLayer.current = layer;

      return () => {
        !map.destroyed && map.remove(layer);
      };
    }
  }, [map, source]);

  useEffect(() => {
    title !== undefined && refLayer.current.set?.("title", title);
  }, [title]);

  useEffect(() => {
    opacity !== undefined && refLayer.current.set?.("opacity", opacity);
  }, [opacity]);

  return null;
};
