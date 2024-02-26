/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import G6, {
  stdLib,
  type ComboDisplayModel,
  type ComboModelData,
  type NodeDisplayModel,
} from "@antv/g6";
import { type ComboShapeMap } from "@antv/g6/lib/types/combo";
import { type State } from "@antv/g6/lib/types/item";
import {
  type NodeShapeMap,
  type NodeUserModelData,
} from "@antv/g6/lib/types/node";

export class ManualCombo extends G6.Extensions.RectCombo {
  getMergedStyles(model: AnyObject) {
    const ret: AnyObject = super.getMergedStyles(model);
    model.data.childCount = this.graph.getComboChildrenData(model.id).length;
    if (ret.keyShape) {
      if (model.data.collapsed) {
        ret.keyShape.width = 96;
        ret.keyShape.height = 96;
        ret.keyShape.x = -48;
        ret.keyShape.y = -48;
      }
      ret.keyShape.lineWidth = 4;
      ret.keyShape.zIndex = 4;
      ret.keyShape.fill = ret.keyShape.fillColor;
      ret.keyShape.stroke = ret.keyShape.strokeColor;
    }
    if (ret.iconShape) {
      ret.iconShape.text = undefined;
      ret.iconShape.src = `data:image/svg+xml,${encodeURIComponent(
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder-open</title><path fill="#1e293b" d="M19,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4H10L12,6H19A2,2 0 0,1 21,8H21L4,8V18L6.14,10H23.21L20.93,18.5C20.7,19.37 19.92,20 19,20Z" /></svg>'
      )}`;
      ret.iconShape.zIndex = 5;
      ret.iconShape.width = 48;
      ret.iconShape.height = 48;
    }
    return ret;
  }

  drawBadgeShapes(
    model: ComboDisplayModel | NodeDisplayModel,
    shapeMap: NodeShapeMap,
    diffData?:
      | {
          previous: ComboModelData | NodeUserModelData;
          current: ComboModelData | NodeUserModelData;
        }
      | undefined,
    diffState?: { previous: State[]; current: State[] } | undefined
  ) {
    const shapes: KeyValue = {};

    const keyShapeBBox = shapeMap.keyShape.getRenderBounds();

    if (model.data.isImportant) {
      const xl = keyShapeBBox.min[0] - keyShapeBBox.center[0];
      const xr = keyShapeBBox.max[0] - keyShapeBBox.center[0];
      const y = keyShapeBBox.min[1] - keyShapeBBox.center[1];
      const bgHeight = 32;
      const pos = {
        xl,
        xr,
        y: y - bgHeight / 2,
      };

      shapes.topRightBadgeShape = this.upsertShape(
        "text",
        "topRightBadgeShape",
        Object.assign(
          Object.assign({
            text: "★",
            fill: "#fff",
            fontSize: 24,
            x: pos.xr,
            y: pos.y + bgHeight / 2,
          }),
          { textAlign: "center", textBaseline: "middle", zIndex: 5 }
        ),
        {
          shapeMap,
          model,
          diffData,
          diffState,
        }
      );
      shapes.topRightBadgeBackgroundShape = this.upsertShape(
        "rect",
        "topRightBadgeBackgroundShape",
        Object.assign({
          fill: "#fc0",
          height: bgHeight,
          width: bgHeight,
          radius: bgHeight / 2,
          zIndex: 4,
          x: pos.xr - bgHeight / 2,
          y: pos.y,
        }),
        {
          shapeMap,
          model,
          diffData,
          diffState,
        }
      );

      shapes.topLeftBadgeShape = this.upsertShape(
        "text",
        "topLeftBadgeShape",
        Object.assign(
          Object.assign({
            text: model.data.childCount?.toString() ?? "0",
            fill: "#fff",
            fontSize: 24,
            x: pos.xl,
            y: pos.y + bgHeight / 2,
          }),
          { textAlign: "center", textBaseline: "middle", zIndex: 5 }
        ),
        {
          shapeMap,
          model,
          diffData,
          diffState,
        }
      );
      shapes.topLeftBadgeBackgroundShape = this.upsertShape(
        "rect",
        "topLeftBadgeBackgroundShape",
        Object.assign({
          fill: "#475569",
          height: bgHeight,
          width: bgHeight,
          radius: bgHeight / 2,
          zIndex: 4,
          x: pos.xl - bgHeight / 2,
          y: pos.y,
        }),
        {
          shapeMap,
          model,
          diffData,
          diffState,
        }
      );
    }

    return shapes;
  }

  drawOtherShapes(
    model: ComboDisplayModel,
    shapeMap: ComboShapeMap,
    diffData?: {
      previous: ComboModelData;
      current: ComboModelData;
    },
    diffState?: AnyObject
  ) {
    const { data } = model;
    const keyShapeBBox = shapeMap.keyShape.getLocalBounds();
    const otherShapes = {
      markerShape: this.upsertShape(
        "path",
        "markerShape",
        {
          cursor: "pointer",
          stroke: "#666",
          lineWidth: 1,
          zIndex: 5,
          fill: shapeMap.keyShape?.config.style.fill,
          path: data.collapsed
            ? stdLib.markers.expand(
                keyShapeBBox.center[0],
                keyShapeBBox.max[1],
                16
              )
            : stdLib.markers.collapse(
                keyShapeBBox.center[0],
                keyShapeBBox.max[1],
                16
              ),
        } as AnyObject,
        {
          model,
          shapeMap,
          diffData,
          diffState,
        }
      ),
    };
    return otherShapes;
  }
}
