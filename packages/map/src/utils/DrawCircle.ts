import { uuid } from "@axux/utilities";
import circle from "@turf/circle";
import distance from "@turf/distance";
import { point } from "@turf/helpers";

const DragCircleMode: KeyValue = {};

DragCircleMode.onSetup = function (opts: KeyValue) {
  this.updateUIClasses({ mouse: "drag" });
  this.activateUIButton("polygon");
  this.setActionableState({
    trash: true,
  });
  return {
    currentId: undefined,
    currentCenter: [],
    initiallySelectedFeatureIds: opts.featureIds || [],
  };
};

DragCircleMode.onMouseDown = DragCircleMode.onTouchStart = function (
  state: KeyValue,
  e: KeyValue
) {
  if (e.originalEvent.ctrlKey) {
    state.currentId = uuid();
    state.currentCenter = [e.lngLat.lng, e.lngLat.lat];
    this.addFeature(
      this.newFeature({
        type: "Feature",
        id: state.currentId,
        properties: {},
        geometry: {
          coordinates: [],
          type: "Polygon",
        },
      } as GeoJSON.Feature)
    );
    this.updateUIClasses({ mouse: "add" });
    e.originalEvent.stopPropagation();
    e.originalEvent.preventDefault();
    return false;
  }
};

DragCircleMode.onDrag = DragCircleMode.onMouseMove = function (
  state: KeyValue,
  e: KeyValue
) {
  const center = state.currentCenter;
  if (center?.length > 0) {
    const distanceInKm = distance(
      point(center),
      point([e.lngLat.lng, e.lngLat.lat]),
      { units: "kilometers" }
    );
    const circleFeature = circle(center, distanceInKm);
    const feature = this.getFeature(state.currentId);
    if (feature) {
      this.updateUIClasses({ mouse: "add" });
      feature.properties.distance = distanceInKm.toFixed(2);
      feature.incomingCoords(circleFeature.geometry.coordinates);
    }
  } else {
    this.updateUIClasses({ mouse: "drag" });
  }
};

DragCircleMode.onMouseUp = DragCircleMode.onTouchEnd = function (
  state: KeyValue,
  e: KeyValue
) {
  state.currentCenter = [];
  this.updateUIClasses({ mouse: "drag" });
  const feature = this.getFeature(state.currentId);
  this.map.fire("draw.create", {
    action: "move",
    features: feature,
  });
  return this.changeMode("draw-circle", {
    featureIds: [...state.initiallySelectedFeatureIds, state.currentId],
  });
};

DragCircleMode.onClick = DragCircleMode.onTap = function (
  state: KeyValue,
  e: KeyValue
) {
  // don't draw the circle if its a tap or click event
  state.currentCenter = [];
  this.updateUIClasses({ mouse: "drag" });
};

DragCircleMode.toDisplayFeatures = function (
  state: KeyValue,
  geojson: KeyValue,
  display: AnyObject
) {
  const isActivePolygon = geojson.properties.id === state.currentId;
  geojson.properties.active = `${isActivePolygon}`;
  return display(geojson);
};

export const DrawCircle = DragCircleMode as MapboxDraw.DrawCustomMode;
