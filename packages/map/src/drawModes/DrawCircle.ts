/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { uuid } from "@axux/utilities";
import circle from "@turf/circle";
import distance from "@turf/distance";
import { point } from "@turf/helpers";
import { DrawingBase } from "./DrawingBase";

const DrawCircleMode: KeyValue = {};

DrawCircleMode.onSetup = function (opts: KeyValue) {
  const currentId = uuid();
  DrawingBase.startDrawing(this, currentId, "circle");
  return {
    currentId,
    startPoint: [],
    initiallySelectedFeatureIds: opts.featureIds || [],
  };
};

DrawCircleMode.onMouseDown = function (state: KeyValue, e: KeyValue) {
  state.startPoint = [e.lngLat.lng, e.lngLat.lat];
};

DrawCircleMode.onDrag = function (state: KeyValue, e: KeyValue) {
  const center = state.startPoint;
  if (center?.length > 0) {
    const distanceInKm = distance(
      point(center),
      point([e.lngLat.lng, e.lngLat.lat]),
      { units: "kilometers" }
    );
    const circleFeature = circle(center, distanceInKm);
    const feature = this.getFeature(state.currentId);
    if (feature) {
      feature.properties.distance = distanceInKm.toFixed(2);
      feature.incomingCoords(circleFeature.geometry.coordinates);
    }
  }
};

DrawCircleMode.onMouseUp = function (state: KeyValue, e: KeyValue) {
  state.startPoint = [];
  const feature = this.getFeature(state.currentId);
  this.map.fire("draw.create", {
    features: [feature],
  });
  return DrawingBase.stopDrawing(this);
};

DrawCircleMode.onClick = function (state: KeyValue, e: KeyValue) {
  state.startPoint = [];
  return DrawingBase.stopDrawing(this, state.currentId);
};

DrawCircleMode.onKeyUp = function (state: KeyValue, e: KeyValue) {
  if (e.keyCode === 27) {
    state.startPoint = [];
    return DrawingBase.stopDrawing(this, state.currentId);
  }
};

DrawCircleMode.toDisplayFeatures = function (
  state: KeyValue,
  geojson: KeyValue,
  display: AnyObject
) {
  const isActivePolygon = geojson.properties.id === state.currentId;
  geojson.properties.active = isActivePolygon ? "true" : "false";
  return display(geojson);
};

export const DrawCircle = DrawCircleMode as MapboxDraw.DrawCustomMode;
