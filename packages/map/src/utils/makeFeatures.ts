/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type MapEvent } from "../constants/types";
import { convertLatLng } from "./convertLatLng";

export const makeFeatures = (events: MapEvent[]) => {
  return {
    type: "FeatureCollection",
    features: events.map(({ location, ...rest }) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [...convertLatLng(location), 0.0],
      },
      properties: {
        location: convertLatLng(location).toString(),
        ...rest,
      },
    })),
  };
};
