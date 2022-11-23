/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import esriConfig from "@arcgis/core/config.js";

export { makeBasemap } from "./makeBasemap";

export const setMapAssets = (path: string) => {
  esriConfig.assetsPath = path;
};
