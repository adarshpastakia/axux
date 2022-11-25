/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import Point from "@arcgis/core/geometry/Point";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";
import SimpleMarker from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { FC, useEffect, useRef } from "react";
import { PALETTES } from "../constants/Palette";
import { MapEvent } from "../constants/types";
import { useMapContext } from "../context/MapContext";
import { makeFeatures, transparentize } from "../utils";

interface Props {
  events: MapEvent[];

  /**
   * cluster popup title
   * template variable
   * {cluster_count}
   * {cluster_avg_[FIELD]}
   * @default 'This cluster contains {cluster_count} events'
   */
  clusterTitle?: string;
  clusterContent?: __esri.ContentProperties[];

  eventTitle?: string;
  eventContent?: __esri.ContentProperties[];
  fieldInfos?: __esri.FieldInfoProperties[];

  defaultColor?: string;
  colorMap?: __esri.ColorStopProperties[];

  actions?: __esri.ActionButtonProperties[];
  clusterActions?: __esri.ActionButtonProperties[];
  onActionClick?: (id: string) => void;
}

const DEFAULT_CLUSTER_TITLE = "This cluster contains {cluster_count} events";
const DEFAULT_COLORMAP = (() => {
  return PALETTES.GlobalWarming.map((color, idx) => ({
    value: idx * 100 + 2,
    color,
  }));
})();

export const ClusterLayer: FC<Props> = ({
  events,
  actions,
  onActionClick,
  defaultColor = "#007A99",
  colorMap = DEFAULT_COLORMAP,
  clusterTitle = DEFAULT_CLUSTER_TITLE,
  clusterContent = [],
  clusterActions,
  eventTitle,
  eventContent = [],
  fieldInfos,
}) => {
  const { map, view } = useMapContext();
  const refLayer = useRef<GeoJSONLayer>();

  useEffect(() => {
    if (map) {
      const blob = new Blob([JSON.stringify(makeFeatures(events))], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const layer = new GeoJSONLayer({
        url,
        popupTemplate: {
          title: eventTitle,
          content: [
            ...eventContent,
            {
              type: "fields",
              fieldInfos,
            },
          ],
          actions: actions as AnyObject,
        },
        featureReduction: {
          type: "cluster",
          clusterMinSize: "24px",
          clusterMaxSize: "96px",
          clusterRadius: "128px",
          labelsVisible: true,
          popupEnabled: true,
          popupTemplate: {
            title: clusterTitle,
            content: clusterContent,
            actions: clusterActions as AnyObject,
          },
          labelingInfo: [
            {
              deconflictionStrategy: "none",
              labelExpressionInfo: {
                expression: "Text($feature.cluster_count, '#,###')",
              },
              symbol: {
                type: "text",
                color: "#ffffff",
                font: {
                  weight: "bold",
                  family: "Noto Sans",
                  size: "16px",
                },
              },
              labelPlacement: "center-center",
            },
          ],
          renderer: new SimpleRenderer({
            symbol: new SimpleMarker({
              color: defaultColor,
              size: 16,
              outline: {
                color: transparentize(defaultColor),
                width: 4,
              },
            }),
            visualVariables: [
              new ColorVariable({
                field: "cluster_count",
                stops: [{ value: 1, color: defaultColor }, ...colorMap],
              }),
            ],
          }),
        },
      });
      map.add(layer);
      view?.popup.on("trigger-action", (e) => {
        console.log(view.popup.selectedFeature);

        const { latitude, longitude } = view.popup.selectedFeature
          .geometry as AnyObject;
        const screen = view.toScreen(new Point({ longitude, latitude }));
        const { latitude: x1, longitude: y1 } = view.toMap({
          x: screen.x - 64,
          y: screen.y - 64,
        });
        const { latitude: x2, longitude: y2 } = view.toMap({
          x: screen.x + 64,
          y: screen.y + 64,
        });

        console.log([
          [y1, x1],
          [y2, x1],
          [y2, x2],
          [y1, x2],
        ]);

        onActionClick?.(e.action.id);
      });
      refLayer.current = layer;

      return () => {
        URL.revokeObjectURL(url);
        map?.remove(layer);
      };
    }
  }, [map, events]);

  return null;
};
