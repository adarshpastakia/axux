/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import * as projection from "@arcgis/core/geometry/projection";
import { useCallback } from "react";

export const useProjection = () => {
  const getGeometry = useCallback(async (geometry: __esri.Geometry) => {
    return await Promise.resolve()
      .then(async () => {
        if (projection && !projection.isLoaded()) {
          return await projection.load();
        }
      })
      .then(() => {
        if (projection) {
          return projection.project(geometry, {
            wkid: 4326,
          }) as __esri.Geometry;
        }
      });
  }, []);

  return { getGeometry };
};
