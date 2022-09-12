type MapDrawContext = MapboxDraw.DrawCustomModeThis & { map: mapboxgl.Map };

export const DrawingBase: KeyValue = {
  startDrawing: (ctx: MapDrawContext, id: string, type: string) => {
    ctx.activateUIButton(type);
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
        type,
        properties: {
          type: "circle",
        },
        geometry: {
          coordinates: [],
          type: "Polygon",
        },
      } as GeoJSON.Feature)
    );
    ctx.map.fire("draw.start", { drawType: type });
  },
  stopDrawing: (ctx: MapDrawContext, id: string) => {
    id && ctx.deleteFeature(id);
    ctx.activateUIButton();
    ctx.map.dragPan.enable();
    ctx.updateUIClasses({ mouse: "drag" });
    ctx.map.fire("draw.stop");
    return ctx.changeMode("simple_select");
  },
};
