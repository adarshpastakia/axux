/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import { useEffect } from "react";
import { useMapContext } from "../context/MapContext";

export const Basemap = () => {
  const { view, basemaps } = useMapContext();

  useEffect(() => {
    const basemapGallery = new BasemapGallery({
      view,
      source: Array.from(basemaps.values()),
    });
    const layerExpand = new Expand({
      view,
      content: basemapGallery,
      autoCollapse: true,
      group: "geomap",
      expandTooltip: "Open Basemap list",
      collapseTooltip: "Hide Basemap list",
    });
    view.ui?.add(layerExpand, { index: 1, position: "top-trailing" });

    return () => {
      view.ui?.remove(layerExpand);
    };
  }, [view, basemaps]);

  return null;
};