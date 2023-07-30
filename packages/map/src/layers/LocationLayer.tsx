/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import GeoJSONLayer from "@arcgis/core/layers/GeoJSONLayer";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import {
  useEffect,
  useImperativeHandle,
  useRef,
  type FC,
  type RefObject,
} from "react";
import { ICON_MARKER, type MapEvent } from "../constants/types";
import { useMapContext } from "../context/MapContext";
import { makeFeatures } from "../utils";

export interface LocationProps {
  layerRef?: RefObject<{
    hilight: (ids: string) => void;
    unhilight: () => void;
  }>;
  /**
   * map title
   */
  title?: string;
  /**
   * events
   */
  events: MapEvent[];
  /**
   * marker svg path
   */
  marker?: string;
  /**
   * default color from simple renderer
   */
  defaultColor?: string;
  /**
   * field for uniq color renderer
   */
  uniqField?: string;
  /**
   * colors by uniq value
   */
  colors?: Array<{ value: string; color: string; label?: string }>;
  onClick?: (id: string) => void;
}

export const LocationLayer: FC<LocationProps> = ({
  layerRef,
  title,
  events,
  colors,
  defaultColor = "#e11d48",
  uniqField,
  marker = ICON_MARKER,
}) => {
  const { view, map } = useMapContext();
  const refLayer = useRef<GeoJSONLayer>();
  const refLayerView = useRef<AnyObject>();
  const refHilight = useRef<AnyObject>();

  useImperativeHandle(
    layerRef,
    () => ({
      hilight: (ids: AnyObject) => {
        if (refHilight.current) {
          refHilight.current.feature.visible = true;
          view?.graphics.remove(refHilight.current.clone);
        }
        const layer = refLayer.current;
        if (layer) {
          const query = layer.createQuery();
          query.objectIds = [ids];
          void layer.queryFeatures(query).then((feats) => {
            refHilight.current = {
              feature: feats.features[0],
              clone: feats.features[0].clone(),
            };
            refHilight.current.feature.visible = false;
            refHilight.current.clone.symbol = {
              type: "simple-marker",
              outline: {
                color: [255, 255, 255],
                width: 1,
              },
              color: "#cc0000",
              size: 48,
              xoffset: 0,
              yoffset: 24,
              path: marker,
            } as AnyObject;
            view?.graphics.add(refHilight.current.clone);
          });
        }
      },
      unhilight: () => {
        if (refHilight.current) {
          refHilight.current.feature.visible = true;
          view?.graphics.remove(refHilight.current.clone);
        }
      },
    }),
    []
  );

  useEffect(() => {
    if (view && map && events.length > 0) {
      const blob = new Blob([JSON.stringify(makeFeatures(events))], {
        type: "application/json",
      });
      const markerSymbol = {
        type: "simple-marker",
        outline: {
          color: [255, 255, 255],
          width: 1,
        },
        color: defaultColor,
        size: 32,
        xoffset: 0,
        yoffset: 16,
        path: marker,
      } as AnyObject;
      const url = URL.createObjectURL(blob);
      const layer = new GeoJSONLayer({
        url,
        title,
        outFields: ["*"],
        objectIdField: "id",
        renderer: uniqField
          ? new UniqueValueRenderer({
              field: uniqField,
              defaultSymbol: markerSymbol,
              legendOptions: {
                title: "Colors extracted from data",
              },
              uniqueValueInfos: colors?.map(({ color, value, label }) => ({
                value,
                label: label ?? value,
                symbol: { ...markerSymbol, color },
              })),
            })
          : new SimpleRenderer({ symbol: markerSymbol }),
      });

      layer.on("layerview-create", () => {
        void view.goTo(layer.fullExtent);
      });
      void view.whenLayerView(layer).then((layerView) => {
        refLayerView.current = layerView;
      });
      const clickHandle = view.on("click", console.log);
      map.add(layer);
      refLayer.current = layer;

      return () => {
        try {
          URL.revokeObjectURL(url);
        } catch (_) {
          //
        }
        clickHandle.remove();
        map?.remove(layer);
      };
    }
  }, [events, marker, view, colors, uniqField]);

  return null;
};
