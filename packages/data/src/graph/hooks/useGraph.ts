/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { findShortestPath } from "@antv/algorithm";
import G6, {
  stdLib,
  type ComboDisplayModel,
  type ComboModelData,
  type GraphData,
  type ID,
  type IG6GraphEvent,
  type LayoutOptions,
} from "@antv/g6";
import { createReactNode } from "@antv/g6-react-node";
import { type ComboShapeMap } from "@antv/g6/lib/types/combo";
import { useIsDark, useNotificationService } from "@axux/core";
import { debounce, dedupe } from "@axux/utilities";
import { useCallback, useEffect, useRef, useState } from "react";
import { type GraphNode, type GraphProps } from "../types";
import { makeSvg } from "../utils";

const DEFAULT_NODE_COLOR = "#94a3b8";
const DEFAULT_EDGE_COLOR = "#6b7280";

const getLayout = (layout: GraphProps["defaultLayout"], useWorker = false) => {
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
    workerEnabled: useWorker,
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
      workerEnabled: useWorker,
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
      workerEnabled: useWorker,
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
      workerEnabled: useWorker,
    };
  if (layout === "hierarchy")
    type = {
      type: "hierarchy-layout",
      nodeSize: 32,
      nodesep: 100,
      ranksep: 70,
      align: undefined,
      preventOverlap: true,
      animated: true,
      workerEnabled: useWorker,
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
const Node = ({ model }: KeyValue) => {
  return model.data.renderDetail({ id: model.id, data: model.data.data });
};

const ExtGraph = G6.extend(G6.Graph, {
  combos: {
    "custom-combo": CustomCombo,
  },
  nodes: {
    "donut-node": G6.Extensions.DonutNode,
    "react-node": createReactNode(Node),
  },
  edges: {
    "quadratic-edge": G6.Extensions.QuadraticEdge,
  },
  layouts: {
    "force-layout": G6.Extensions.ForceAtlas2Layout,
    "circular-layout": G6.Extensions.ConcentricLayout,
    "radial-layout": G6.Extensions.RadialLayout,
    "hierarchy-layout": G6.Extensions.DagreLayout,
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
    tooltip: G6.Extensions.Tooltip,
    contextmenu: G6.Extensions.Menu,
  },
} as AnyObject);

export const useGraph = <N extends KeyValue>(
  container: HTMLDivElement | null,
  opts: KeyValue
) => {
  const [graph, setGraph] = useState<InstanceType<typeof G6.Graph>>();
  const [isClear, setClear] = useState(true);
  const [selectedItems, setSelectedItems] = useState<Array<GraphNode<N>>>([]);
  const styleMap = useRef<GraphProps["styleMap"]>();
  const bgColor = useRef<"#fff" | "#222">("#fff");
  const { message } = useNotificationService();
  const isDark = useIsDark();

  const options: KeyValue = Object.assign(
    {
      useWorker: false,
      onClear: undefined,
      onNodeSelected: undefined,
    },
    opts
  );

  const clearHilights = useCallback((g: InstanceType<typeof G6.Graph>) => {
    g.clearItemState(
      g.getAllEdgesData().map((edge) => edge.id),
      ["hilight"]
    );
  }, []);

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
            {
              key: "click",
              type: "click-select",
              itemTypes: ["node"],
              eventName: "select",
            },
            {
              key: "brush",
              type: "brush-select",
              itemTypes: ["node"],
              selectSetMode: "latest",
              trigger: "shift",
              eventName: "dragZoom",
              selectedState: "__zoom__",
            },
            {
              key: "lasso",
              type: "lasso-select",
              itemTypes: ["node"],
              eventName: "brush-select",
              trigger: "ctrl",
              selectSetMode: "union",
            },
          ],
          brush: [
            {
              key: "brush",
              type: "brush-select",
              itemTypes: ["node"],
              eventName: "brush-select",
              trigger: "drag",
              selectSetMode: "union",
            },
          ],
          lasso: [
            {
              key: "lasso",
              type: "lasso-select",
              itemTypes: ["node"],
              eventName: "brush-select",
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
        ...(getStyleSpec() as AnyObject),
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

      graph.on("dragZoom", (e: KeyValue) => {
        e.selectedIds.nodes.length && graph.focusItem(e.selectedIds.nodes);
      });

      const doSelectEdge = (action: string, edgeId: ID) => {
        const edgeData = graph.getEdgeData(edgeId);
        edgeData &&
          graph.setItemState(
            [edgeData.source, edgeData.target],
            "selected",
            action === "select"
          );
      };
      const doSelectCombo = (action: string, comboId: ID) => {
        const nodes = graph
          .getComboChildrenData(comboId)
          .map((node) => node.id);
        nodes.length &&
          graph.setItemState(nodes, "selected", action === "select");
      };

      graph.on(
        "select",
        (e: IG6GraphEvent & { action: "select" | "unselect" }) => {
          clearHilights(graph);
          if (e.itemType === "edge") {
            doSelectEdge(e.action, e.itemId);
          }
          if (e.itemType === "combo") {
            doSelectCombo(e.action, e.itemId);
          }
        }
      );
      graph.on(
        "brush-select",
        (e: {
          action: "select" | "deselect";
          selectedIds: KeyValue<ID[]>;
          deselectedIds: KeyValue<ID[]>;
        }) => {
          clearHilights(graph);
          e.selectedIds?.edges.forEach((edgeId) =>
            doSelectEdge(e.action, edgeId)
          );
          e.selectedIds?.combos.forEach((comboId) =>
            doSelectEdge(e.action, comboId)
          );
          e.deselectedIds?.edges.forEach((edgeId) =>
            doSelectEdge(e.action, edgeId)
          );
          e.deselectedIds?.combos.forEach((comboId) =>
            doSelectEdge(e.action, comboId)
          );
        }
      );

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
        "afteritemstatechange",
        debounce((e) => {
          const selectedItemsRef =
            graph
              ?.getAllNodesData()
              .filter((node) => graph?.getItemState(node.id, "selected")) ?? [];
          setSelectedItems(selectedItemsRef as Array<GraphNode<N>>);
        })
      );

      container.addEventListener("contextmenu", (e: MouseEvent) => {
        e.stopPropagation();
        e.preventDefault();
        return false;
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
      };
    }
  }, [container]);

  useEffect(() => {
    bgColor.current = isDark ? "#222" : "#fff";
    graph?.updateTheme({
      type: "spec",
      // @ts-expect-error ignore
      base: isDark ? "dark" : "light",
    });
  }, [isDark, graph]);

  useEffect(() => {
    if (graph) {
      const handler = debounce(() => {
        clearHilights(graph);
        const cleared = graph.getAllNodesData().length === 0;
        setClear(cleared);
        cleared && options.onClear?.();
      });
      graph?.on("afteritemchange", handler);

      return () => {
        graph?.off("afteritemchange", handler);
      };
    }
  }, [graph, options.onClear]);

  useEffect(() => {
    if (graph) {
      const handler = (e: KeyValue) => {
        if (e.action === "updateState" && e.states?.includes("selected")) {
          const selectedItemsRef =
            graph
              ?.getAllNodesData()
              .filter((node) => graph?.getItemState(node.id, "selected")) ?? [];
          setSelectedItems(selectedItemsRef as Array<GraphNode<N>>);
          options.onNodeSelected?.(selectedItemsRef);
        }
      };
      graph?.on("afteritemstatechange", handler);

      return () => {
        graph?.off("afteritemstatechange", handler);
      };
    }
  }, [graph, options.onNodeSelected]);

  const loadData = useCallback(
    (data: GraphData) => {
      void graph?.read(data).then(() => {
        resetView();
        graph.emit("dataloaded");
      });
    },
    [graph]
  );

  const addData = useCallback(
    (data: GraphData) => {
      data.nodes && graph?.addData("node", data.nodes);
      data.edges && graph?.addData("edge", data.edges);
      void graph?.layout().then(() => {
        resetView();
        graph.emit("dataloaded");
      });
    },
    [graph]
  );

  const removeSelected = useCallback(() => {
    const edges: ID[] = [];
    const items = graph?.findIdByState("node", "selected", true) ?? [];
    items.forEach((id) => {
      edges.push(...(graph?.getRelatedEdgesData(id)?.map((ed) => ed.id) ?? []));
    });
    graph?.setItemState([...edges, ...items], "selected", false);
    edges.length && graph?.removeData("edge", dedupe(edges));
    items.length && graph?.removeData("node", dedupe(items));
  }, [graph]);

  const selectByProp = useCallback(
    (prop: string, value: unknown) => {
      const ids = graph
        ?.getAllNodesData()
        .filter((node) => node.data?.[prop] === value)
        .map((node) => node.id);
      ids?.length && graph?.setItemState(ids, "selected", true);
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
        layout: getLayout(layout, options.useWorker),
      });
    },
    [graph, options.useWorker]
  );

  const applyLayout = useCallback(
    (layout: GraphProps["defaultLayout"]) => {
      graph?.once("afterlayout", () => resetView());
      void graph?.layout(getLayout(layout), options.useWorker);
    },
    [graph, options.useWorker]
  );

  const hilightNode = useCallback(
    (nodeId: ID, hilight = true) => {
      graph?.setItemState(nodeId, "hilight", hilight);
    },
    [graph]
  );

  const selectNode = useCallback(
    (nodeId: ID, selected = true) => {
      graph?.setItemState(nodeId, "selected", selected);
    },
    [graph]
  );

  const updateSelectedList = useCallback(() => {
    const selectedItemsRef =
      graph
        ?.getAllNodesData()
        .filter((node) => graph?.getItemState(node.id, "selected")) ?? [];
    setSelectedItems(selectedItemsRef as Array<GraphNode<N>>);
  }, [graph]);

  const hilightPath = useCallback(() => {
    if (selectedItems.length === 2) {
      const { path = [] } = findShortestPath(
        {
          nodes: graph?.getAllNodesData() as AnyObject,
          edges: graph?.getAllEdgesData() as AnyObject,
        },
        selectedItems[0].id.toString(),
        selectedItems[1].id.toString()
      );
      graph && clearHilights(graph);
      const edges = (
        graph
          ?.getAllEdgesData()
          .filter(
            (edge) => path.includes(edge.source) && path.includes(edge.target)
          ) ?? []
      ).map((edge) => edge.id);
      if (edges.length) {
        graph?.setItemState(path, "selected", true);
        graph?.setItemState(edges, "hilight", true);
        graph?.frontItem([...path, ...edges]);
      }
      if (edges.length === 0) {
        void message("Path between nodes not found");
      }
    }
  }, [graph, selectedItems]);

  const restyle = useCallback((map: GraphProps["styleMap"]) => {
    styleMap.current = map;
  }, []);

  const getStyleSpec = useCallback(() => {
    return {
      combo: {
        type: {
          fields: ["id", "nodeType"],
          formatter: (model: KeyValue) =>
            styleMap.current?.[model.data.nodeType]?.shape
              ? `${styleMap.current?.[model.data.nodeType]?.shape ?? ""}-node`
              : "custom-combo",
        },
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
        type: {
          fields: ["id", "nodeType"],
          formatter: (model: KeyValue) =>
            styleMap.current?.[model.data.nodeType]?.shape
              ? `${styleMap.current?.[model.data.nodeType]?.shape ?? ""}-node`
              : "donut-node",
        },
        keyShape: {
          r: 32,
          lineWidth: 6,
          cursor: "pointer",
          stroke: {
            fields: ["id", "nodeType", "color"],
            formatter: (model: KeyValue) =>
              model.data.color ??
              styleMap.current?.[model.data.nodeType]?.color ??
              styleMap.current?.defaultNode?.color ??
              DEFAULT_NODE_COLOR,
          },
          lineDash: {
            fields: ["id", "nodeType", "strokeType"],
            formatter: (model: KeyValue) => {
              if (
                (model.data.strokeType ??
                  styleMap.current?.[model.data.nodeType]?.strokeType ??
                  styleMap.current?.defaultNode?.strokeType) === "dashed"
              )
                return [8, 4];
              if (
                (model.data.strokeType ??
                  styleMap.current?.[model.data.nodeType]?.strokeType ??
                  styleMap.current?.defaultNode?.strokeType) === "dotted"
              )
                return [4, 4];

              return [];
            },
          },
          fill: {
            fields: ["id", "nodeType", "fill"],
            formatter: (model: KeyValue) =>
              model.data.fill ??
              styleMap.current?.[model.data.nodeType]?.fill ??
              styleMap.current?.defaultNode?.fill ??
              bgColor.current,
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
              styleMap.current?.[model.data.nodeType]?.label ??
              styleMap.current?.defaultNode?.label,
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
                      styleMap.current?.[model.data.nodeType]?.iconPath ??
                      styleMap.current?.defaultNode?.iconPath,
                    model.data.color ??
                      styleMap.current?.[model.data.nodeType]?.color ??
                      styleMap.current?.defaultNode?.color ??
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
                styleMap.current?.[model.data.nodeType]?.color ??
                styleMap.current?.defaultNode?.color ??
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
                  styleMap.current?.[model.data.edgeType]?.strokeType ??
                  styleMap.current?.defaultEdge?.strokeType) === "dashed"
              )
                return [8, 4];
              if (
                (model.data.strokeType ??
                  styleMap.current?.[model.data.edgeType]?.strokeType ??
                  styleMap.current?.defaultEdge?.strokeType) === "dotted"
              )
                return [4, 4];
            },
          },
          cursor: "pointer",
          stroke: {
            fields: ["id", "edgeType", "color"],
            formatter: (model: KeyValue) =>
              model.data.color ??
              styleMap.current?.[model.data.edgeType]?.color ??
              styleMap.current?.defaultEdge?.color ??
              DEFAULT_EDGE_COLOR,
          },
        },
        labelShape: {
          text: {
            fields: ["id", "edgeType", "label"],
            formatter: (model: KeyValue) =>
              model.data.label ??
              styleMap.current?.[model.data.edgeType]?.label ??
              styleMap.current?.defaultEdge?.label,
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
  }, []);

  const exportImage = useCallback(async () => {
    return await graph?.toFullDataURL("image/png", { padding: [0, 0, -24, 0] });
  }, [graph]);

  return {
    ref: graph,
    isClear,
    selectedItems,
    loadData,
    addData,
    removeSelected,
    restyle,
    resetView,
    applyLayout,
    resetLayout,
    selectNode,
    selectByProp,
    hilightNode,
    hilightPath,
    exportImage,
    updateSelectedList,
  };
};
