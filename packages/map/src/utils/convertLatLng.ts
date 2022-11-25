/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isArray, isObject, isString } from "@axux/utilities";
import { LngLatLike } from "../constants/types";

export const convertLatLng = (lonLat: LngLatLike) => {
  if (
    (isArray(lonLat) && lonLat.length === 2) ||
    (isArray(lonLat) && lonLat.length === 3)
  ) {
    return [Number(lonLat[0]), Number(lonLat[1])];
  }

  if (isObject(lonLat)) {
    return ["lon" in lonLat ? lonLat.lon : lonLat.lng, lonLat.lat];
  }

  if (isString(lonLat)) {
    const [lat, lon] = lonLat.split(",");
    return [lon, lat];
  }

  throw Error("Invalid geo cooredinates");
};
