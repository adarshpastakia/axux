/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Clustermap } from "./layers/Clustermap";
import { Heatmap } from "./layers/Heatmap";
import { MapViewer } from "./viewer/MapViewer";

export const AxMap = {
  Viewer: MapViewer,
  Heatmap,
  Clustermap,
};
