/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import Multipoint from "@arcgis/core/geometry/Multipoint";
import Polygon from "@arcgis/core/geometry/Polygon";
import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";
import SimpleMarker from "@arcgis/core/symbols/SimpleMarkerSymbol";
import { debounce } from "@axux/utilities";
import { type FC, useEffect, useMemo, useRef } from "react";
import { PALETTES } from "../constants/Palette";
import { type MapEvent } from "../constants/types";
import { useMapContext } from "../context/MapContext";
import { makeFeatures, transparentize } from "../utils";

export interface ClusterProps {
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

  fields?: __esri.FieldProperties[];
  fieldInfos?: __esri.FieldInfoProperties[];

  defaultColor?: string;
  colorMap?: __esri.ColorStopProperties[];

  actions?: __esri.ActionButtonProperties[];
  clusterActions?: __esri.ActionButtonProperties[];
  onActionClick?: (
    id: string,
    options?: { polygon?: number[][]; features?: KeyValue[] } & KeyValue
  ) => void;
}

const DEFAULT_CLUSTER_TITLE = "This cluster contains {cluster_count} events";
const DEFAULT_COLORMAP = (() => {
  return PALETTES.GlobalWarming.slice(0, 7).map((color, idx) => ({
    value: idx * 100 + 2,
    color,
  }));
})();

export const ClusterLayer: FC<ClusterProps> = ({
  events,
  title,
  visible,
  listMode = "hide",
  actions = [],
  onActionClick,
  defaultColor = "#e84118",
  colorMap = DEFAULT_COLORMAP,
  clusterTitle = DEFAULT_CLUSTER_TITLE,
  clusterContent = [],
  clusterActions = [],
  eventTitle,
  eventContent = [],
  fields,
  zIndex,
  fieldInfos = [],
}) => {
  const { map, view } = useMapContext();
  const refLayer = useRef<GeoJSONLayer>();

  const actionMap = useMemo(
    () => [
      ...actions.map((act) => act.id),
      ...clusterActions.map((act) => act.id),
    ],
    [actions, clusterActions]
  );

  useEffect(() => {
    const eventHandle = view?.popup.on?.("trigger-action", (e) => {
      if (!actionMap?.includes(e.action.id)) return;

      const feature = view.popup.selectedFeature;
      if (feature.isAggregate) {
        void view
          .whenLayerView(feature.layer)
          .then(async (layerView: __esri.LayerView) => {
            const { features } = await (
              layerView as __esri.GeoJSONLayerView
            ).queryFeatures({
              aggregateIds: [feature.getObjectId()],
            });

            const multipoint = new Multipoint({
              points: features.map((feat) =>
                feat.attributes.location.split(",")
              ),
            });
            onActionClick?.(e.action.id, {
              polygon: Polygon.fromExtent(multipoint.extent.expand(1.01))
                .rings[0],
              events: features.map((feature) => feature.attributes),
            });
          });
      } else {
        onActionClick?.(e.action.id, {
          ...feature.attributes,
        });
      }
      view.popup.close();
    });

    return () => {
      eventHandle?.remove();
    };
  }, [actionMap, view, onActionClick]);

  useEffect(() => {
    if (map && view && events.length > 0) {
      const blob = new Blob([JSON.stringify(makeFeatures(events))], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const layer = new GeoJSONLayer({
        url,
        title,
        fields,
        listMode,
        visible,
        outFields: ["*"],
        objectIdField: "id",
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
            content: [...clusterContent],
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
      layer.on("layerview-create", () => {
        zIndex !== undefined && map.reorder(layer, zIndex);
        void view.goTo(layer.fullExtent);
      });
      map.add(layer);
      refLayer.current = layer;

      const calculateRatio = debounce(async () => {
        void view
          .whenLayerView(layer)
          .then(async (layerView: __esri.LayerView) => {
            const set = await (
              layerView as __esri.GeoJSONLayerView
            ).queryFeatures();
            const maxCluster = Math.max(
              ...set.features.map((feature) =>
                feature.getAttribute("cluster_count")
              )
            );
            set.features.forEach((feature) => {
              feature.setAttribute(
                "cluster_ratio",
                feature.isAggregate
                  ? feature.getAttribute("cluster_count") / maxCluster
                  : 0
              );
            });
          })
          .catch(() => {
            //
          });
      });
      const watchHandle = view.watch("extent", calculateRatio);
      calculateRatio();

      return () => {
        try {
          URL.revokeObjectURL(url);
        } catch (_) {
          //
        }
        watchHandle.remove();
        map?.remove(layer);
      };
    }
  }, [events]);

  return null;
};
