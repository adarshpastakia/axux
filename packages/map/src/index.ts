/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ClusterLayer } from "./layers/ClusterLayer";
import { VectorLayer } from "./layers/VectorLayer";
import { Action } from "./tools/Action";
import { Basemap } from "./tools/Basemap";
import { Layers } from "./tools/Layers";
import { Navigation } from "./tools/Navigation";
import { Zoom } from "./tools/Zoom";
import { MapViewer } from "./viewer/MapViewer";

export { setMapAssets } from "./utils";

export const AxMap = {
  Viewer: MapViewer,
  layers: { VectorLayer, ClusterLayer },
  tools: { Zoom, Basemap, Navigation, Action, Layers },
};
MapViewer.displayName = "AxMap.Viewer";
Action.displayName = "AxMap.tools.Action";
Basemap.displayName = "AxMap.tools.Basemap";
Navigation.displayName = "AxMap.tools.Navigation";
Layers.displayName = "AxMap.tools.Layers";
Zoom.displayName = "AxMap.tools.Zoom";
ClusterLayer.displayName = "AxMap.layers.ClusterLayer";
VectorLayer.displayName = "AxMap.layers.VectorLayer";
