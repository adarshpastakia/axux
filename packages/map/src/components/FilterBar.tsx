/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxTag } from "@axux/core";
import { LngLatBounds } from "maplibre-gl";
import { useCallback, useEffect, useState } from "react";
import { DRAG_MODES } from "../drawModes";
import { useMapContext } from "../viewer/MapViewer";

export const FilterBar = () => {
  const { map, draw } = useMapContext();
  const [features, setFeatures] = useState<GeoJSON.Feature[]>([]);

  useEffect(() => {
    const cb = () => {
      setFeatures(draw.getAll()?.features ?? []);
    };

    map.on("draw.create", cb);

    return () => {
      map.off("draw.create", cb);
    };
  }, [draw, map]);

  const onDelete = useCallback(
    (id: string) => {
      setFeatures(draw.delete(id).getAll().features ?? []);
    },
    [draw]
  );

  const onFeatureClick = useCallback(
    (id: string) => {
      const feature = draw.get(id) as GeoJSON.Feature<GeoJSON.Polygon>;
      if (feature) {
        const coordinates = feature.geometry.coordinates[0];
        const bounds = coordinates.reduce((bounds: LngLatBounds, coord) => {
          return bounds.extend(coord as AnyObject);
        }, new LngLatBounds(coordinates[0], coordinates[1]));

        map.fitBounds(bounds, {
          padding: 64,
        });
      }
    },
    [draw]
  );
  const onMouseOver = useCallback(
    (id: string) => {
      const feature = draw.get(id);
      if (feature) {
        draw.changeMode(DRAG_MODES.HILIGHT, { featureId: id });
      }
    },
    [draw]
  );
  const onMouseOut = useCallback(
    (id: string) => {
      const feature = draw.get(id);
      if (feature) {
        draw.changeMode(DRAG_MODES.DRAG_CIRCLE);
      }
    },
    [draw]
  );

  return (
    <div className="ax-mapviewer__tools" data-align="head">
      {features.map((feature) => (
        <AxTag
          key={feature.id}
          onRemove={() => onDelete(`${feature.id}`)}
          onClick={() => onFeatureClick(`${feature.id}`)}
        >
          {
            (
              <span
                onMouseOver={() => onMouseOver(`${feature.id}`)}
                onMouseOut={() => onMouseOut(`${feature.id}`)}
              >
                {feature.properties?.label}
              </span>
            ) as AnyObject
          }
        </AxTag>
      ))}
    </div>
  );
};
