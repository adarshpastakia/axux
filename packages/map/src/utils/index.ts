/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import esriConfig from "@arcgis/core/config.js";

export { convertLatLng } from "./convertLatLng";
export { makeBasemap } from "./makeBasemap";
export { makeFeatures } from "./makeFeatures";

export const setMapAssets = (path: string) => {
  esriConfig.assetsPath = path;
};

export const transparentize = (color: string, opacity = 0.5) => {
  const [r, g, b] = color.match(/(\w\w)/g) ?? ["0", "0", "0"];

  return `rgba(${parseInt(r, 16)}, ${parseInt(g, 16)}, ${parseInt(
    b,
    16
  )}, ${opacity})`;
};
