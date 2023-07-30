/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { Comparison } from "./compare/Comparison";
import { ClusterLayer as Cluster } from "./layers/ClusterLayer";
import { HeatmapLayer as Heatmap } from "./layers/HeatmapLayer";
import { LocationLayer as Locations } from "./layers/LocationLayer";
import { Marker } from "./layers/Marker";
import { Action } from "./tools/Action";
import { Basemap } from "./tools/Basemap";
import { Layers } from "./tools/Layers";
import { Navigation } from "./tools/Navigation";
import { Selection } from "./tools/Selection";
import { Zoom } from "./tools/Zoom";
import { MapViewer } from "./viewer/MapViewer";

export {
  convertGeoHash,
  getLocationAsText,
  setMapAssets,
  setMapFonts,
} from "./utils";

export const AxMap = {
  Viewer: MapViewer,
  Marker,
  layers: { Cluster, Heatmap, Locations },
  tools: { Zoom, Basemap, Navigation, Selection, Comparison, Action, Layers },
};
MapViewer.displayName = "AxMap.Viewer";
Marker.displayName = "AxMap.Marker";
Action.displayName = "AxMap.tools.Action";
Basemap.displayName = "AxMap.tools.Basemap";
Navigation.displayName = "AxMap.tools.Navigation";
Layers.displayName = "AxMap.tools.Layers";
Comparison.displayName = "AxMap.tools.Comparison";
Selection.displayName = "AxMap.tools.Selection";
Zoom.displayName = "AxMap.tools.Zoom";
Cluster.displayName = "AxMap.layers.Cluster";
Heatmap.displayName = "AxMap.layers.Heatmap";
Locations.displayName = "AxMap.layers.Locations";
