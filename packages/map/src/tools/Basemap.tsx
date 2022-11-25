/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import { FC, useEffect } from "react";
import { useMapContext } from "../context/MapContext";

/**
 * AxMap toolbar basemap selector
 */
export const Basemap: FC = () => {
  const { view, basemaps } = useMapContext();

  useEffect(() => {
    if (view) {
      const basemapGallery = new BasemapGallery({
        view,
        source: Array.from(basemaps.values()),
      });
      const basemapExpand = new Expand({
        view,
        content: basemapGallery,
        autoCollapse: true,
        group: "geomap",
        expandTooltip: "Open Basemap list",
        collapseTooltip: "Hide Basemap list",
      });
      view.ui.add(basemapExpand, { index: 1, position: "top-trailing" });

      return () => {
        view.ui.remove(basemapExpand);
      };
    }
  }, [view, basemaps]);

  return null;
};
