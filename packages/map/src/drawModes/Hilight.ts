/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

const HilightMode: KeyValue = {};

HilightMode.onSetup = function (opts: KeyValue) {
  const featureId = opts.featureId;
  const feature = this.getFeature(featureId);

  if (!feature) {
    throw new Error("You must provide a featureId to enter hilight mode");
  }

  return {
    currentId: featureId,
  };
};

HilightMode.toDisplayFeatures = function (
  state: KeyValue,
  geojson: KeyValue,
  display: AnyObject
) {
  const isActivePolygon = geojson.properties.id === state.currentId;
  geojson.properties.active = `${isActivePolygon}`;
  return display(geojson);
};

export const Hilight = HilightMode as MapboxDraw.DrawCustomMode;
