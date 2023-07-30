/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { isArray, isObject, isString } from "@axux/utilities";
import { type LngLatLike } from "../constants/types";

export const convertLatLng = (lonLat: LngLatLike) => {
  if (
    (isArray(lonLat) && lonLat.length === 2) ||
    (isArray(lonLat) && lonLat.length === 3)
  ) {
    return [Number(lonLat[0]), Number(lonLat[1])];
  }

  if (isObject(lonLat)) {
    if ("longitude" in lonLat) {
      return [lonLat.longitude, lonLat.latitude];
    }
    return ["lon" in lonLat ? lonLat.lon : lonLat.lng, lonLat.lat];
  }

  if (isString(lonLat)) {
    const [lat, lon] = lonLat.split(",");
    return [+lon, +lat];
  }

  throw Error("Invalid geo cooredinates");
};

export const convertToDMS = (coord: number, isLat = false) => {
  const degree = Math.floor(coord);
  const hour = (coord - degree) * 60;
  const minute = (hour - Math.floor(hour)) * 60;

  return `${degree}˚${Math.floor(hour)}'${minute.toFixed(2)}"${
    coord < 0 ? (isLat ? "S" : "W") : isLat ? "N" : "E"
  }`;
};

export const getLocationAsText = (latlon: LngLatLike) => {
  const [lon, lat] = convertLatLng(latlon);
  return `${convertToDMS(lat, true)}, ${convertToDMS(lon)}`;
};
