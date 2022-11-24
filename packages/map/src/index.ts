/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Basemap } from "./tools/Basemap";
import { Navigation } from "./tools/Navigation";
import { Zoom } from "./tools/Zoom";
import { MapViewer } from "./viewer/MapViewer";

export { setMapAssets } from "./utils";

export const AxMap = {
  Viewer: MapViewer,
  tools: { Zoom, Basemap, Navigation },
};
