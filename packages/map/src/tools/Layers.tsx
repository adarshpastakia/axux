/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import Expand from "@arcgis/core/widgets/Expand";
import LayerList from "@arcgis/core/widgets/LayerList";
import { type FC, useEffect } from "react";
import { useMapContext } from "../context/MapContext";

/**
 * AxMap toolbar basemap selector
 */
export const Layers: FC = () => {
  const { view } = useMapContext();

  useEffect(() => {
    if (view) {
      const layerList = new LayerList({
        view,
      });
      const layerExpand = new Expand({
        view,
        content: layerList,
        autoCollapse: true,
        group: "geomap",
        expandTooltip: "Open Layers list",
        collapseTooltip: "Hide Layers list",
      });
      view.ui.add(layerExpand, { index: 2, position: "top-trailing" });

      return () => {
        view.ui.remove(layerExpand);
      };
    }
  }, [view]);

  return null;
};
