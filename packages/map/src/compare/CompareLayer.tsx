/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer";
import { type FC, useCallback, useEffect, useRef, useState } from "react";
import { type MapEvent } from "../constants/types";
import { useMapContext } from "../context/MapContext";
import { makeFeatures } from "../utils";

export interface ComparisonProps {
  events?: MapEvent[];
  color?: string;
  countField?: string;
  compareCountField?: string;
  compareEvents?: MapEvent[];
  compareColor?: string;
}

export const CompareLayer: FC<ComparisonProps> = ({
  events,
  color = "#b91c1c",
  compareEvents,
  countField,
  compareCountField,
  compareColor = "#047857",
}) => {
  const { map, view } = useMapContext();
  const refWidget = useRef<HTMLDivElement>(null);
  const refLayer = useRef<GeoJSONLayer>();
  const refCompareLayer = useRef<GeoJSONLayer>();

  const [compareOpacity, setCompareOpacity] = useState(0.5);

  const createLayer = useCallback(
    (events: MapEvent[], color: string, field?: string, compare = false) => {
      const blob = new Blob([JSON.stringify(makeFeatures(events))], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const layer = new GeoJSONLayer({
        url,
        blendMode: compare ? "multiply" : "normal",
        popupEnabled: false,
        listMode: "hide",
        visible: true,
        opacity: 0.75,
        renderer: new HeatmapRenderer({
          field,
          colorStops: [
            {
              ratio: 0,
              color: "rgba(0,0,0,0)",
            },
            {
              ratio: 1,
              color,
            },
          ],
          minDensity: 0,
          maxDensity: 0.25,
          radius: 12,
        }),
      });
      return { url, layer };
    },
    []
  );

  useEffect(() => {
    if (map && view && events) {
      const { url, layer } = createLayer(events, color, countField);
      map.add(layer);
      refLayer.current = layer;

      return () => {
        URL.revokeObjectURL(url);
        map?.remove(layer);
      };
    }
  }, [events]);

  useEffect(() => {
    if (map && view && compareEvents) {
      const { url, layer } = createLayer(
        compareEvents,
        compareColor,
        compareCountField,
        true
      );
      map.add(layer);
      refCompareLayer.current = layer;

      return () => {
        URL.revokeObjectURL(url);
        map?.remove(layer);
      };
    }
  }, [compareEvents]);

  useEffect(() => {
    setCompareOpacity(0.5);
  }, [events, compareEvents]);

  useEffect(() => {
    if (refLayer.current && refCompareLayer.current) {
      refLayer.current.opacity = compareOpacity + 0.25;
      refCompareLayer.current.opacity = 1.25 - compareOpacity;
    }
  }, [compareOpacity]);

  useEffect(() => {
    if (view && events) {
      const widget = refWidget.current as HTMLElement;
      view.ui.add(widget, { index: -3, position: "bottom-trailing" });

      view.on("layerview-create", () => {
        if (refLayer.current && refCompareLayer.current) {
          refLayer.current.visible = true;
          refCompareLayer.current.visible = true;
          const newExtent = refLayer.current.fullExtent.union(
            refCompareLayer.current.fullExtent
          );
          if (newExtent) void view.goTo(newExtent);
        }
      });

      return () => {
        view.ui.remove(widget);
      };
    }
  }, [events]);

  useEffect(() => {
    map?.layers.forEach((layer) => (layer.visible = !events));
  }, [map, events]);

  return (
    <div className="esri-widget compare-slider" ref={refWidget}>
      {map && view && events && (
        <input
          type="range"
          min={0}
          max={1}
          step={0.05}
          value={compareOpacity}
          style={
            { "--leftColor": color, "--rightColor": compareColor } as AnyObject
          }
          onChange={(e) => setCompareOpacity(e.target.valueAsNumber)}
        />
      )}
    </div>
  );
};
