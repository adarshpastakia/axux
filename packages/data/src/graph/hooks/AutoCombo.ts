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

export class AutoCombo extends G6.Extensions.CircleCombo {
  getMergedStyles(model: AnyObject) {
    const ret: AnyObject = super.getMergedStyles(model);
    model.data.childCount = this.graph.getComboChildrenData(model.id).length;
    if (ret.keyShape) {
      model.data.collapsed && (ret.keyShape.r = 48);
      ret.keyShape.lineWidth = 4;
      ret.keyShape.zIndex = 4;
      ret.keyShape.fill = ret.keyShape.fillColor;
      ret.keyShape.stroke = ret.keyShape.strokeColor;
    }
    if (ret.iconShape) {
      ret.iconShape.text = undefined;
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

    const keyShapeBBox = shapeMap.keyShape.getGeometryBounds();

    if (model.data.isImportant) {
      const xl = keyShapeBBox.min[0];
      const xr = keyShapeBBox.max[0];
      const y = keyShapeBBox.min[1];
      const bgHeight = 32;
      const pos = {
        xl: xl - xl * 0.25,
        xr: xr - xr * 0.25,
        y: y - y * 0.25,
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
          fill: "#64748b",
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
          stroke: "#64748b",
          lineWidth: 1,
          zIndex: 9,
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
