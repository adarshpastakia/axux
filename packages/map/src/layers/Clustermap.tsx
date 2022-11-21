/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isArray } from "@axux/utilities";
import { GeoJSONSource, LngLat, LngLatLike } from "maplibre-gl";
import { FC, useCallback, useEffect } from "react";
import { PALETTES } from "../constants/Palette";
import { useMapContext } from "../viewer/MapViewer";

export interface ClustermapProps {
  data: Array<{ coords: LngLatLike } & KeyValue> | GeoJSON.FeatureCollection;

  palette?: string[];
}

const CLUSTER_BUCKETS = [
  20, 50, 75, 100, 150, 250, 375, 500, 750, 1000, 1250, 1500, 1750, 2000,
];

export const Clustermap: FC<ClustermapProps> = ({
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
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer(
        {
          id: "ax-geojson",
          type: "circle",
          source: "ax-geojson",
          filter: ["has", "point_count"],
          paint: {
            "circle-color": [
              "step",
              ["get", "point_count"],
              ...palette
                .map((color, i) => [color, CLUSTER_BUCKETS[i]])
                .flat()
                .slice(0, -1),
            ] as AnyObject,
            "circle-radius": [
              "step",
              ["get", "point_count"],
              20,
              100,
              30,
              750,
              40,
            ],
          },
        },
        "fill.cold"
      );

      map.addLayer(
        {
          id: "ax-counts",
          type: "symbol",
          source: "ax-geojson",
          filter: ["has", "point_count"],
          layout: {
            "text-field": "{point_count_abbreviated}",
            "text-size": 16,
          },
          paint: {
            "text-color": "white",
          },
        },
        "fill.cold"
      );

      map.addLayer(
        {
          id: "ax-points",
          type: "circle",
          source: "ax-geojson",
          filter: ["!", ["has", "point_count"]],
          paint: {
            "circle-radius": 8,
            "circle-color": "rgb(178,24,43)",
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
          },
        },
        "fill.cold"
      );

      map.on("click", "ax-geojson", (e) => {
        const features = map.queryRenderedFeatures(e.point, {
          layers: ["ax-geojson"],
        });
        const clusterId = features[0].properties.cluster_id;
        const pointCount = features[0].properties.point_count;
        (map.getSource("ax-geojson") as GeoJSONSource).getClusterLeaves(
          clusterId,
          pointCount,
          0,
          (err, zoom) => {
            if (err) return;
            console.log("===", zoom);

            // map.easeTo({
            //   center: (features[0].geometry as AnyObject).coordinates,
            //   zoom: Math.min(maxZoom, zoom ?? 1),
            // });
          }
        );
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
        sourceData.features = data.map(({ coords, ...rest }) => ({
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [LngLat.convert(coords), 0.0],
          },
          properties: { ...rest },
        }));
      } else {
        sourceData = data;
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
