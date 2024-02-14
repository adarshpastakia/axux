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
  type GraphData,
  type IG6GraphEvent,
  type LayoutOptions,
} from "@antv/g6";
import { type ComboShapeMap } from "@antv/g6/lib/types/combo";
import { useIsDark } from "@axux/core";
import { debounce } from "@axux/utilities";
import { useCallback, useEffect, useState } from "react";
import { type GraphProps } from "../types";
import { makeSvg, shadeColor } from "../utils";

const DEFAULT_NODE_COLOR = "#94a3b8";
const DEFAULT_EDGE_COLOR = "#6b7280";

const getLayout = (layout: GraphProps["defaultLayout"]) => {
  let type: LayoutOptions = {
    type: "force-layout",
    center: [0, 0],
    nodeSize: 196,
    // factor: 9,
    // damping: 1,
    // nodeSpacing: 120,
    // linkDistance: 120,
    // clustering: true,
    // nodeClusterBy: "cluster",
    presetLayout: {
      type: "circular-layout",
      nodeSize: 32,
      nodeSpacing: 120,
      linkDistance: 120,
      preventOverlap: true,
    },
    kr: 20,
    kg: 0.1,
    preventOverlap: true,
    animated: true,
    workerEnabled: false,
  };
  if (layout === "grid")
    type = {
      type: "grid-layout",
      center: [0, 0],
      nodeSize: 120,
      gravity: 0.1,
      linkDistance: 120,
      preventOverlap: true,
      animated: true,
      workerEnabled: false,
    };
  if (layout === "circular")
    type = {
      type: "circular-layout",
      center: [0, 0],
      nodeSize: 32,
      nodeSpacing: 120,
      linkDistance: 120,
      preventOverlap: true,
      animated: true,
      workerEnabled: false,
    };
  if (layout === "radial")
    type = {
      type: "radial-layout",
      center: [0, 0],
      nodeSize: 32,
      unitRadius: 240,
      nodeSpacing: 120,
      linkDistance: 240,
      sortBy: "degree",
      preventOverlap: true,
      animated: true,
      workerEnabled: false,
    };
  if (layout === "hierarchy")
    type = {
      type: "dagre-layout",
      nodeSize: 32,
      nodesep: 100,
      ranksep: 70,
      preventOverlap: true,
      animated: true,
      workerEnabled: false,
    };
  return type;
};

class CustomCombo extends G6.Extensions.CircleCombo {
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
          fill: "#fff",
          path: data.collapsed
            ? stdLib.markers.expand(
                keyShapeBBox.center[0],
                keyShapeBBox.max[1],
                10
              )
            : stdLib.markers.collapse(
                keyShapeBBox.center[0],
                keyShapeBBox.max[1],
                10
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

const ExtGraph = G6.extend(G6.Graph, {
  combos: {
    "custom-combo": CustomCombo,
  },
  nodes: {
    "donut-node": G6.Extensions.DonutNode,
  },
  edges: {
    "quadratic-edge": G6.Extensions.QuadraticEdge,
  },
  layouts: {
    "force-layout": G6.Extensions.ForceAtlas2Layout,
    "circular-layout": G6.Extensions.ConcentricLayout,
    "radial-layout": G6.Extensions.RadialLayout,
    "dagre-layout": G6.Extensions.DagreLayout,
    "grid-layout": G6.Extensions.GridLayout,
  },
  transforms: {
    "process-parallel-edges": G6.Extensions.ProcessParallelEdges,
  },
  behaviors: {
    "lasso-select": G6.Extensions.LassoSelect,
    "brush-select": G6.Extensions.BrushSelect,
    "hover-state": G6.Extensions.HoverActivate,
    "activate-relations": G6.Extensions.ActivateRelations,
  },
  plugins: {
    legend: G6.Extensions.Legend,
    contextmenu: G6.Extensions.Menu,
  },
} as AnyObject);

export const useGraph = (container: HTMLDivElement | null) => {
  const [graph, setGraph] = useState<InstanceType<typeof G6.Graph>>();
  const [isClear, setClear] = useState(true);
  const isDark = useIsDark();

  useEffect(() => {
    if (container) {
      const readonlyMode: AnyObject = [
        {
          key: "zoom",
          type: "zoom-canvas",
          optimize: true,
          minZoom: 0.2,
          maxZoom: 18,
        },
        {
          key: "drag",
          type: "drag-canvas",
          optimize: true,
          scalableRange: 0,
        },
        {
          key: "relations",
          type: "activate-relations",
          trigger: "pointerenter",
          activeState: "focus",
        },
        {
          key: "hover",
          type: "hover-state",
          activateState: "active",
        },
      ];

      const graph = new ExtGraph({
        container,
        renderer: "canvas",
        autoFit: "view",
        modes: {
          default: readonlyMode,
          edit: [
            ...readonlyMode,
            { type: "drag-node", enableTransient: true },
            { type: "drag-combo", enableTransient: true },
            { key: "click", type: "click-select", eventName: "select" },
          ],
          brush: [
            {
              key: "brush",
              type: "brush-select",
              itemTypes: ["node"],
              eventName: "select",
              trigger: "drag",
              selectSetMode: "union",
            },
          ],
          lasso: [
            {
              key: "lasso",
              type: "lasso-select",
              itemTypes: ["node"],
              eventName: "select",
              trigger: "drag",
              selectSetMode: "union",
            },
          ],
        } as AnyObject,
        plugins: [],
        transforms: [
          {
            type: "process-parallel-edges",
            multiEdgeType: "quadratic-edge",
          } as AnyObject,
        ],
      });

      const handleEnter = debounce((e: IG6GraphEvent) => {
        const { itemId } = e;
        const allNodesId = graph.getAllNodesData().map((node) => node.id);
        const allEdgesIds = graph.getAllEdgesData().map((edge) => edge.id);
        const highlightIds = [itemId];
        graph.setItemState(itemId, "blur", false);
        graph.getAllEdgesData().forEach((edge) => {
          const sourceId = edge.source;
          const targetId = edge.target;
          if (sourceId === itemId) {
            graph.setItemState([sourceId, edge.id], "blur", false);
            highlightIds.push(targetId, edge.id);
          } else if (targetId === itemId) {
            graph.setItemState([targetId, edge.id], "blur", false);
            highlightIds.push(sourceId, edge.id);
          }
        });
        graph.setItemState(
          [...allNodesId, ...allEdgesIds].filter(
            (id) => !highlightIds.includes(id)
          ),
          "blur",
          true
        );
      }, 500);
      graph.on("node:pointerenter", handleEnter);

      graph.on("node:pointerleave", () => {
        handleEnter.cancel();
        const allNodesIds = graph.getAllNodesData().map((node) => node.id);
        const allEdgesIds = graph.getAllEdgesData().map((edge) => edge.id);
        graph.setItemState([...allNodesIds, ...allEdgesIds], "blur", false);
      });

      /** Click the bottom marker to collapse/expand the combo. */
      graph.on("combo:click", (event: IG6GraphEvent) => {
        const { itemId, target } = event;
        // @ts-expect-error ignore
        if (target?.id === "markerShape") {
          const model = graph.getComboData(itemId);
          if (model?.data.collapsed) {
            graph.expandCombo(itemId);
          } else {
            graph.collapseCombo(itemId);
          }
        }
      });

      graph.on(
        "afteritemchange",
        debounce(() => {
          setClear(graph.getAllNodesData().length === 0);
        })
      );

      const ob = new ResizeObserver(() => {
        graph.setSize([container.offsetWidth, container.offsetHeight]);
        resetView();
      });
      ob.observe(container);

      setGraph(graph as AnyObject);

      // @ts-expect-error ignore
      window.graph = graph;

      return () => {
        ob.disconnect();
        graph.destroy();
      };
    }
  }, [container]);

  useEffect(() => {
    graph?.updateTheme({
      type: "spec",
      // @ts-expect-error ignore
      base: isDark ? "dark" : "light",
    });
  }, [isDark, graph]);

  const loadData = useCallback(
    (data: GraphData) => {
      void graph?.read(data).then(() => {
        resetView();
      });
    },
    [graph]
  );

  const addData = useCallback(
    (data: GraphData) => {
      data.nodes?.map((node) => graph?.addData("node", node));
      data.edges?.map((edge) => graph?.addData("edge", edge));
      void graph?.layout().then(() => {
        resetView();
      });
    },
    [graph]
  );

  const resetView = useCallback(() => {
    void graph?.fitView({
      padding: 24,
      rules: {
        boundsType: "layout",
      },
    });
  }, [graph]);

  const resetLayout = useCallback(
    (layout: GraphProps["defaultLayout"]) => {
      void graph?.updateSpecification({
        layout: getLayout(layout),
      });
    },
    [graph]
  );

  const applyLayout = useCallback(
    (layout: GraphProps["defaultLayout"]) => {
      graph?.once("afterlayout", () => resetView());
      void graph?.layout(getLayout(layout));
    },
    [graph]
  );

  const restyle = useCallback(
    (colorMap: GraphProps["colorMap"]) => {
      graph?.updateSpecification({
        combo: {
          type: "custom-combo",
          keyShape: {
            r: 50,
          },
          labelShape: {
            text: {
              fields: ["id", "label"],
              formatter: (model: KeyValue) => model.data.label,
            },
            position: "bottom",
          },
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
          type: "donut-node",
          keyShape: {
            r: 32,
            lineWidth: 6,
            cursor: "pointer",
            stroke: {
              fields: ["id", "nodeType", "color"],
              formatter: (model: KeyValue) =>
                model.data.color ??
                colorMap?.[model.data.nodeType] ??
                DEFAULT_NODE_COLOR,
            },
            fill: {
              fields: ["id", "nodeType", "color"],
              formatter: (model: KeyValue) =>
                shadeColor(
                  (model.data.color as string) ??
                    colorMap?.[model.data.nodeType] ??
                    DEFAULT_NODE_COLOR,
                  50
                ),
            },
          },
          labelShape: {
            text: {
              fields: ["id", "label"],
              formatter: (model: KeyValue) => model.data.label,
            },
            dy: 4,
            fontSize: 12,
            maxWidth: "110%",
            position: "bottom",
          },
          // @ts-expect-error ignore
          labelBackgroundShape: {},
          iconShape: {
            width: 32,
            height: 32,
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
              fields: ["id", "path", "avatar"],
              formatter: (model: KeyValue) =>
                model.data.avatar
                  ? model.data.avatar
                  : makeSvg(model.data.path),
            },
          },
          donutShapes: {
            innerSize: 0.7,
            cursor: "pointer",
            attrs: {
              fields: ["id", "colorMap"],
              formatter: (model: KeyValue) =>
                model.data.colorMap?.map(
                  () => 100 / model.data.colorMap.length
                ),
            },
            colorMap: {
              fields: ["id", "colorMap"],
              formatter: (model: KeyValue) => model.data.colorMap?.sort(),
            },
          },
          animates: {
            update: [
              {
                fields: ["opacity", "lineWidth", "r"],
                shapeId: "haloShape",
                states: ["selected", "active"],
              },
              {
                fields: ["lineWidth"],
                shapeId: "keyShape",
                states: ["selected", "active"],
              },
            ],
          },
        },
        nodeState: {
          selected: {
            keyShape: {
              r: 42,
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
                  colorMap?.[model.data.nodeType] ??
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
            // @ts-expect-error ignore
            donutShapes: {
              innerSize: 0.7,
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
            // @ts-expect-error ignore
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
            lineWidth: 3,
            lineDash: {
              fields: ["id", "dashed"],
              formatter: (model: KeyValue) => {
                return model.data.dashed ? [8, 4] : 0;
              },
            },
            cursor: "pointer",
            stroke: {
              fields: ["id", "edgeType", "color"],
              formatter: (model: KeyValue) =>
                model.data.color ??
                colorMap?.[model.data.edgeType] ??
                DEFAULT_EDGE_COLOR,
            },
          },
        },
        edgeState: {
          blur: {
            keyShape: {
              opacity: 0.1,
              stroke: "#8888",
            },
          },
        },
      });
    },
    [graph]
  );

  return {
    ref: graph,
    isClear,
    loadData,
    addData,
    restyle,
    resetView,
    applyLayout,
    resetLayout,
  };
};
