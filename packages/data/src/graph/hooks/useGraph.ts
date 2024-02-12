/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import G6, {
  type GraphData,
  type IG6GraphEvent,
  type LayoutOptions,
} from "@antv/g6";
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
    nodeSize: 32,
    factor: 9,
    nodeSpacing: 120,
    linkDistance: 120,
    clustering: true,
    nodeClusterBy: "cluster",
    preventOverlap: true,
    workerEnabled: true,
  };
  if (layout === "grid")
    type = {
      type: "grid-layout",
      nodeSize: 32,
      gravity: 0.1,
      linkDistance: 120,
      preventOverlap: true,
      workerEnabled: true,
    };
  if (layout === "circular")
    type = {
      type: "circular-layout",
      nodeSize: 32,
      nodeSpacing: 120,
      linkDistance: 120,
      preventOverlap: true,
      workerEnabled: true,
    };
  if (layout === "radial")
    type = {
      type: "radial-layout",
      nodeSize: 32,
      unitRadius: 240,
      nodeSpacing: 120,
      linkDistance: 240,
      sortBy: "degree",
      preventOverlap: true,
      workerEnabled: true,
    };
  if (layout === "hierarchy")
    type = {
      type: "dagre-layout",
      nodeSize: 32,
      nodesep: 100,
      ranksep: 70,
      preventOverlap: true,
      workerEnabled: true,
    };
  return type;
};

export const useGraph = (container: HTMLDivElement | null) => {
  const [graph, setGraph] = useState<InstanceType<typeof G6.Graph>>();
  const isDark = useIsDark();

  useEffect(() => {
    if (container) {
      console.log("create graph");
      const ExtGraph = G6.extend(G6.Graph, {
        nodes: {
          "donut-node": G6.Extensions.DonutNode,
        },
        edges: {
          "quadratic-edge": G6.Extensions.QuadraticEdge,
        },
        layouts: {
          "force-layout": G6.Extensions.ForceLayout,
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
        },
      } as AnyObject);

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
          scalableRange: 0.5,
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
            "drag-node",
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
        layout: getLayout("auto"),
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
    void graph
      ?.fitView({
        padding: 24,
        rules: {
          boundsType: "layout",
        },
      })
      .then(() => {
        void graph?.fitCenter("layout");
      });
  }, [graph]);

  const resetLayout = useCallback(
    (layout: GraphProps["defaultLayout"]) => {
      void graph?.updateSpecification({ layout: getLayout(layout) });
    },
    [graph]
  );

  const applyLayout = useCallback(
    (layout: GraphProps["defaultLayout"]) => {
      void graph?.layout(getLayout(layout)).then(() => {
        resetView();
      });
    },
    [graph]
  );

  const restyle = useCallback(
    (colorMap: GraphProps["colorMap"]) => {
      graph?.updateSpecification({
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
              stroke: "#f00",
            },
            haloShape: {
              r: 32,
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
            // @ts-expect-error ignore
            donutShapes: {
              innerSize: 1,
            },
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
    loadData,
    addData,
    restyle,
    resetView,
    applyLayout,
    resetLayout,
  };
};
