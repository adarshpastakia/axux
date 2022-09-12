import { uuid } from "@axux/utilities";
import { DrawingBase } from "./DrawingBase";

const DragRectangleMode: KeyValue = {};

DragRectangleMode.onSetup = function (opts: KeyValue) {
  const currentId = uuid();
  DrawingBase.startDrawing(this, currentId, "rectangle");
  return {
    currentId,
    startPoint: [],
    initiallySelectedFeatureIds: opts.featureIds || [],
  };
};

DragRectangleMode.onMouseDown = function (state: KeyValue, e: KeyValue) {
  state.startPoint = [e.lngLat.lng, e.lngLat.lat];
};

DragRectangleMode.onDrag = function (state: KeyValue, e: KeyValue) {
  const startPoint = state.startPoint;
  if (startPoint?.length > 0) {
    const feature = this.getFeature(state.currentId);
    if (feature) {
      feature.updateCoordinate("0.0", startPoint[0], startPoint[1]); //minX, minY - the starting point
      feature.updateCoordinate("0.1", e.lngLat.lng, startPoint[1]); // maxX, minY
      feature.updateCoordinate("0.2", e.lngLat.lng, e.lngLat.lat); // maxX, maxY
      feature.updateCoordinate("0.3", startPoint[0], e.lngLat.lat); // minX,maxY
      feature.updateCoordinate("0.4", startPoint[0], startPoint[1]); //minX,minY - ending point (equals to starting point)
    }
  }
};

DragRectangleMode.onMouseUp = function (state: KeyValue, e: KeyValue) {
  state.startPoint = [];
  const feature = this.getFeature(state.currentId);
  this.map.fire("draw.create", {
    features: [feature],
  });
  return DrawingBase.stopDrawing(this);
};

DragRectangleMode.onClick = function (state: KeyValue, e: KeyValue) {
  state.startPoint = [];
  return DrawingBase.stopDrawing(this, state.currentId);
};

DragRectangleMode.onKeyUp = function (state: KeyValue, e: KeyValue) {
  if (e.keyCode === 27) {
    state.startPoint = [];
    return DrawingBase.stopDrawing(this, state.currentId);
  }
};

DragRectangleMode.toDisplayFeatures = function (
  state: KeyValue,
  geojson: KeyValue,
  display: AnyObject
) {
  const isActivePolygon = geojson.properties.id === state.currentId;
  geojson.properties.active = `${isActivePolygon}`;
  return display(geojson);
};

export const DrawRectangle = DragRectangleMode as MapboxDraw.DrawCustomMode;
