/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import Basemap from "@arcgis/core/Basemap";
import Layer from "@arcgis/core/layers/Layer";
import VectorTileLayer from "@arcgis/core/layers/VectorTileLayer";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";
import { isEmpty } from "@axux/utilities";
import { MapSource } from "../constants/types";

export const makeBasemap = ({ id, title, type, thumbnail, url }: MapSource) => {
  let layer;

  if (isEmpty(url)) {
    throw Error(`Map source [${id}] url not provided`);
  }

  if (type === "raster") {
    layer = new WebTileLayer({
      urlTemplate: url,
    });
  }
  if (type === "vector") {
    layer = new VectorTileLayer({
      url,
    });
  }

  return new Basemap({
    baseLayers: [layer as Layer],
    thumbnailUrl: thumbnail,
    id: `base:${id}`,
    title,
  });
};
