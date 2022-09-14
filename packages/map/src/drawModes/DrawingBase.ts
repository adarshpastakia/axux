/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { DRAG_MODES } from ".";

type MapDrawContext = MapboxDraw.DrawCustomModeThis & { map: mapboxgl.Map };

export const DrawingBase: KeyValue = {
  startDrawing: (ctx: MapDrawContext, id: string, label: string) => {
    ctx.updateUIClasses({ mouse: "add" });
    ctx.setActionableState({
      trash: true,
      combineFeatures: false,
      uncombineFeatures: false,
    });
    ctx.map.dragPan.disable();
    ctx.addFeature(
      ctx.newFeature({
        id,
        type: "Feature",
        properties: {
          meta: "feature",
          label,
        },
        geometry: {
          coordinates: [],
          type: "Polygon",
        },
      } as GeoJSON.Feature)
    );
    ctx.map.fire("draw.start", { drawType: label });
  },
  stopDrawing: (ctx: MapDrawContext, id: string) => {
    id && ctx.deleteFeature(id);
    ctx.map.dragPan.enable();
    ctx.updateUIClasses({ mouse: "drag" });
    ctx.map.fire("draw.stop");
    return ctx.changeMode(DRAG_MODES.DRAG_CIRCLE as AnyObject);
  },
};
