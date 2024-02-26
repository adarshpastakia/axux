/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type GraphProps } from "../types";
import { DEFAULT_EDGE_COLOR, DEFAULT_NODE_COLOR } from "../types/constants";
import { makeSvg, shadeColor } from "../utils";

export const styleSpec = (
  bgColor: string,
  styleMap: GraphProps["styleMap"] = {}
) => {
  return {
    combo: {
      type: {
        fields: ["id", "isManualGroup"],
        formatter: (model: KeyValue) =>
          model.data.isManualGroup ? "manual-combo" : "auto-combo",
      },
      keyShape: {
        strokeColor: {
          fields: ["id", "nodeType", "color"],
          formatter: (model: KeyValue) =>
            model.data.color ??
            styleMap?.[model.data.nodeType]?.color ??
            styleMap?.defaultNode?.color,
        },
        fillColor: {
          fields: ["id", "nodeType", "color"],
          formatter: (model: KeyValue) =>
            shadeColor(
              model.data.color ??
                styleMap?.[model.data.nodeType]?.color ??
                styleMap?.defaultNode?.color,
              bgColor === "#ffffff" ? 88 : -88
            ),
        },
      },
      labelShape: {
        text: {
          fields: ["id", "nodeType", "label"],
          formatter: (model: KeyValue) =>
            model.data.label ??
            styleMap?.[model.data.nodeType]?.label ??
            styleMap?.defaultNode?.label,
        },
        dy: 4,
        fontSize: 12,
        maxWidth: "110%",
        position: "bottom",
      },
      labelBackgroundShape: {},
      iconShape: {
        width: 38,
        height: 38,
        cursor: "pointer",
        pointerEvents: "none",
        clipCfg: {
          type: "circle",
          r: 16,
          cx: 16,
          cy: 16,
          show: true,
          fill: "#f00",
        },
        src: {
          fields: ["id", "nodeType", "avatar", "color"],
          formatter: (model: KeyValue) =>
            model.data.avatar
              ? model.data.avatar
              : makeSvg(
                  model.data.iconPath ??
                    styleMap?.[model.data.nodeType]?.iconPath ??
                    styleMap?.defaultNode?.iconPath,
                  model.data.color ??
                    styleMap?.[model.data.nodeType]?.color ??
                    styleMap?.defaultNode?.color ??
                    DEFAULT_NODE_COLOR
                ),
        },
      },
      badgeShapes: [],
      otherShapes: {},
      animates: {
        buildIn: [
          {
            fields: ["opacity"],
            duration: 500,
            delay: 500 + Math.random() * 500,
          },
        ],
        buildOut: [
          {
            fields: ["opacity"],
            duration: 200,
          },
        ],
        update: [
          {
            fields: ["lineWidth", "r"],
            shapeId: "keyShape",
          },
          {
            fields: ["opacity"],
            shapeId: "haloShape",
          },
        ],
      },
    },
    node: {
      type: {
        fields: ["id", "nodeType"],
        formatter: (model: KeyValue) =>
          styleMap?.[model.data.nodeType]?.shape
            ? `${styleMap?.[model.data.nodeType]?.shape ?? ""}-node`
            : "donut-node",
      },
      keyShape: {
        r: 32,
        zIndex: 2,
        lineWidth: 6,
        cursor: "pointer",
        stroke: {
          fields: ["id", "nodeType", "color"],
          formatter: (model: KeyValue) =>
            model.data.color ??
            styleMap?.[model.data.nodeType]?.color ??
            styleMap?.defaultNode?.color ??
            DEFAULT_NODE_COLOR,
        },
        lineDash: {
          fields: ["id", "nodeType", "strokeType"],
          formatter: (model: KeyValue) => {
            if (
              (model.data.strokeType ??
                styleMap?.[model.data.nodeType]?.strokeType ??
                styleMap?.defaultNode?.strokeType) === "dashed"
            )
              return [8, 4];
            if (
              (model.data.strokeType ??
                styleMap?.[model.data.nodeType]?.strokeType ??
                styleMap?.defaultNode?.strokeType) === "dotted"
            )
              return [4, 4];

            return [];
          },
        },
        fill: {
          fields: ["id", "nodeType", "fill"],
          formatter: (model: KeyValue) =>
            model.data.fill ??
            styleMap?.[model.data.nodeType]?.fill ??
            styleMap?.defaultNode?.fill ??
            bgColor,
        },
      },
      badgeShapes: {
        fields: ["id", "isImportant"],
        formatter: (model: KeyValue) => {
          const ret = [];
          if (model.data.isImportant)
            ret.push({
              position: "topRight",
              text: "★",
              fontSize: 18,
              r: 24,
              color: "#f59e0b",
              textColor: "#fff",
            });
          return ret;
        },
      },
      labelShape: {
        text: {
          fields: ["id", "nodeType", "label"],
          formatter: (model: KeyValue) =>
            model.data.label ??
            styleMap?.[model.data.nodeType]?.label ??
            styleMap?.defaultNode?.label,
        },
        dy: 4,
        fontSize: 12,
        maxWidth: "110%",
        position: "bottom",
      },
      labelBackgroundShape: {},
      iconShape: {
        width: 38,
        height: 38,
        zIndex: 5,
        cursor: "pointer",
        pointerEvents: "none",
        clipCfg: {
          type: "circle",
          r: 16,
          cx: 16,
          cy: 16,
          show: true,
          fill: "#f00",
        },
        src: {
          fields: ["id", "nodeType", "avatar", "color"],
          formatter: (model: KeyValue) =>
            model.data.avatar
              ? model.data.avatar
              : makeSvg(
                  model.data.iconPath ??
                    styleMap?.[model.data.nodeType]?.iconPath ??
                    styleMap?.defaultNode?.iconPath,
                  model.data.color ??
                    styleMap?.[model.data.nodeType]?.color ??
                    styleMap?.defaultNode?.color ??
                    DEFAULT_NODE_COLOR
                ),
        },
      },
      donutShapes: {
        innerSize: 0.8,
        cursor: "pointer",
        attrs: {
          fields: ["id", "colorMap"],
          formatter: (model: KeyValue) =>
            model.data.colorMap?.map(() => 100 / model.data.colorMap.length),
        },
        colorMap: {
          fields: ["id", "colorMap"],
          formatter: (model: KeyValue) => model.data.colorMap?.sort(),
        },
      },
    },
    nodeState: {
      selected: {
        keyShape: {
          r: 36,
          stroke: "#f00",
        },
        haloShape: {
          r: 42,
          stroke: "#f00",
        },
      } as AnyObject,
      active: {
        haloShape: {
          r: 42,
          opacity: 0.5,
          lineWidth: 6,
          stroke: {
            fields: ["id", "nodeType", "color"],
            formatter: (model: KeyValue) =>
              model.data.color ??
              styleMap?.[model.data.nodeType]?.color ??
              styleMap?.defaultNode?.color ??
              DEFAULT_NODE_COLOR,
          },
        },
      } as AnyObject,
      focus: {
        keyShape: {
          opacity: 0.9,
        },
        iconShape: {
          opacity: 0.9,
        },
        donutShapes: {
          innerSize: 0.8,
        },
      },
      blur: {
        keyShape: {
          opacity: 0.1,
        },
        iconShape: {
          opacity: 0.1,
        },
        labelShape: {
          opacity: 0.1,
        },
        donutShapes: {
          innerSize: 1,
        },
      },
      islocked: {
        anchorShapes: [
          {
            position: [0, 0],
            r: 8,
          },
        ],
      },
    },
    edge: {
      keyShape: {
        lineWidth: 6,
        lineDash: {
          fields: ["id", "edgeType", "strokeType"],
          formatter: (model: KeyValue) => {
            if (
              (model.data.strokeType ??
                styleMap?.[model.data.edgeType]?.strokeType ??
                styleMap?.defaultEdge?.strokeType) === "dashed"
            )
              return [8, 4];
            if (
              (model.data.strokeType ??
                styleMap?.[model.data.edgeType]?.strokeType ??
                styleMap?.defaultEdge?.strokeType) === "dotted"
            )
              return [4, 4];
          },
        },
        cursor: "pointer",
        stroke: {
          fields: ["id", "edgeType", "color"],
          formatter: (model: KeyValue) =>
            model.data.color ??
            styleMap?.[model.data.edgeType]?.color ??
            styleMap?.defaultEdge?.color ??
            DEFAULT_EDGE_COLOR,
        },
      },
      labelShape: {
        text: {
          fields: ["id", "edgeType", "label"],
          formatter: (model: KeyValue) =>
            model.data.label ??
            styleMap?.[model.data.edgeType]?.label ??
            styleMap?.defaultEdge?.label,
        },
        dy: -8,
        fontSize: 12,
        maxWidth: "110%",
        position: "top",
      },
    },
    edgeState: {
      active: {
        keyShape: { lineWidth: 6 },
        haloShape: { lineWidth: 22 },
      },
      hilight: {
        haloShape: {
          opacity: 0.5,
          lineWidth: 12,
          stroke: "#f00",
        },
      } as AnyObject,
      blur: {
        keyShape: {
          opacity: 0.1,
          stroke: "#8888",
        },
      },
    },
  };
};
