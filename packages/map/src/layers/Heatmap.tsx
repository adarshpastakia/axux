/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isArray } from "@axux/utilities";
import { GeoJSONSource, LngLat, LngLatLike, PointLike } from "maplibre-gl";
import { FC, useCallback, useEffect } from "react";
import { PALETTES } from "../constants/Palette";
import { useMapContext } from "../viewer/MapViewer";

export interface HeatmapProps {
  data:
    | ({ coords: LngLatLike } & KeyValue)[]
    | GeoJSON.FeatureCollection
    | string;

  palette?: string[];
}

export const Heatmap: FC<HeatmapProps> = ({
  data,
  palette = PALETTES.GlobalWarming,
}) => {
  const { map } = useMapContext();

  const loadLayers = useCallback(() => {
    if (map) {
      map.addSource("ax-geojson", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.addLayer(
        {
          id: "ax-geojson",
          type: "heatmap",
          source: "ax-geojson",
          maxzoom: 11,
          paint: {
            "heatmap-weight": 1,
            // Increase the heatmap color weight weight by zoom level
            // heatmap-intensity is a multiplier on top of heatmap-weight
            "heatmap-intensity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              0,
              11,
              3,
            ],
            // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
            // Begin color ramp at 0-stop with a 0-transparancy color
            // to create a blur-like effect.
            "heatmap-color": [
              "interpolate",
              ["linear"],
              ["heatmap-density"],
              0,
              "rgba(0,0,0,0)",
              ...palette
                .map((color, i) => [(i + 1) / palette.length, color])
                .flat(),
            ],
            // Adjust the heatmap radius by zoom level
            "heatmap-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              0,
              2,
              11,
              20,
            ],
            // Transition from heatmap to circle layer by zoom level
            "heatmap-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              7,
              1,
              11,
              0,
            ],
          },
        },
        "fill.cold"
      );

      map.addLayer(
        {
          id: "ax-points",
          type: "circle",
          source: "ax-geojson",
          minzoom: 9,
          paint: {
            "circle-radius": 16,
            "circle-color": "rgb(178,24,43)",
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            "circle-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              0,
              11,
              1,
            ],
          },
        },
        "fill.cold"
      );

      map.on("click", "ax-points", (e) => {
        const bounds: [PointLike, PointLike] = [
          [e.point.x - 8, e.point.y - 8],
          [e.point.x + 8, e.point.y + 8],
        ];
        var features = map.queryRenderedFeatures(bounds, {
          layers: ["ax-points"],
        });
        console.log(features);
      });
    }
  }, [map]);

  const loadData = useCallback(() => {
    const source = map.getSource("ax-geojson") as GeoJSONSource;
    if (source) {
      let sourceData = {
        type: "FeatureCollection",
        features: [] as AnyObject,
      };
      if (isArray(data)) {
        sourceData.features = data.map(({ coords, timestamp, ...rest }) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [LngLat.convert(coords), 0.0],
          },
          properties: { ...rest, timestamp: Date.parse(timestamp) },
        }));
      } else {
        sourceData = data as AnyObject;
      }

      source.once("data", () => {
        map.setZoom(1);
      });
      source.setData(sourceData as GeoJSON.GeoJSON);
    }
  }, [map, data]);

  useEffect(() => {
    loadLayers();
  }, [loadLayers]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  useEffect(() => {
    const cb = () => {
      loadLayers();
      loadData();
    };
    map.on("basemap.change", cb);

    return () => {
      map.off("basemap.change", cb);
    };
  }, [loadLayers, loadData]);

  return null;
};
