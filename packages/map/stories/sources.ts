import { MapSource } from "../src/constants/types";
import ras from "/assets/thumbs/thumb-ras.png";
import vec from "/assets/thumbs/thumb-vec.png";

export const MapSources: MapSource[] = [
  {
    id: "roads",
    title: "Roads",
    type: "vector",
    thumb: vec,
    url: "https://demotiles.maplibre.org/style.json",
  },
  {
    id: "color",
    title: "Watercolor",
    type: "raster",
    thumb: ras,
    url: "https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg",
  },
];
