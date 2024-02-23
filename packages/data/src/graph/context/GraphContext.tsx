/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent, type NodeModel } from "@antv/g6";
import { useNotificationService } from "@axux/core";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type PropsWithChildren,
} from "react";
import { createRoot } from "react-dom/client";
import { ContextMenu } from "../components/ContextMenu";
import { useGraph } from "../hooks/useGraph";
import { type GraphNode, type GraphProps } from "../types";

const GraphContext = createContext<{
  graph: ReturnType<typeof useGraph>;
  changeMode: (mode?: "brush" | "lasso") => void;
  onNodeExpand: GraphProps["onNodeExpand"];
  renderDetail: (node: NodeModel) => JSX.Element;
  handleExpand: (nodes: NodeModel[]) => void;
}>({} as AnyObject);

export const GraphProvider = <N extends KeyValue, E extends KeyValue>({
  data,
  styleMap,
  defaultLayout = "auto",
  readOnly,
  useWorker,
  children,
  graphRef,
  renderTooltip: TooltipEl,
  renderDetail: DetailEl,
  onDataLoad,
  onClear,
  onNodeExpand,
  onNodeSelected,
  onContextMenu,
}: PropsWithChildren<GraphProps<N, E>>) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const graph = useGraph<N>(container, { useWorker, onClear, onNodeSelected });
  const { message } = useNotificationService();

  useImperativeHandle(graphRef, () => graph, [graph]);

  useEffect(() => {
    graph.restyle(styleMap);
  }, [graph.restyle, styleMap]);

  useEffect(() => {
    graph.resetLayout(defaultLayout);
  }, [graph.resetLayout, defaultLayout]);

  useEffect(() => {
    graph.ref?.setMode(readOnly ? "default" : "edit");
  }, [graph.ref, readOnly]);

  useEffect(() => {
    data && graph.loadData(data);
  }, [graph.loadData, data]);

  useEffect(() => {
    graph.ref?.on("dataloaded", () => {
      graph.ref && onDataLoad?.(graph.ref);
    });

    return () => {
      graph.ref?.off("dataloaded");
    };
  }, [graph.ref, onDataLoad]);

  const changeMode = useCallback(
    (mode?: "brush" | "lasso") => {
      graph.ref?.setMode(mode ?? (readOnly ? "default" : "edit"));
      container && (container.dataset.brush = mode ? "true" : "false");
    },
    [graph.ref, container, readOnly]
  );

  const handleExpand = useCallback(
    (nodes: NodeModel[]) => {
      void onNodeExpand?.(nodes as Array<GraphNode<N>>)
        .then((newData) => {
          graph.addData(newData);
        })
        .catch(() => {
          void message({
            message: "Unable to fetch node data",
            color: "danger",
          });
        });
    },
    [graph.ref, onNodeExpand]
  );

  const [contextMenu, setContextMenu] = useState<AnyObject>();
  useEffect(() => {
    if (graph.ref) {
      graph.ref?.addPlugins([
        {
          key: "default-contextmenu",
          type: "contextmenu",
          trigger: "contextmenu",
          offsetX: -1 * (container?.offsetLeft ?? 0),
          className: "ax-graph__menu-container",
          itemTypes: ["node", "edge", "canvas"],
          shouldBegin: () => {
            return !!graph.ref?.getAllNodesData()?.length;
          },
          onHide: () => {
            container?.querySelector(".ax-graph__menu-portal")?.remove();
          },
          /** async string menu */
          getContent: (e: IG6GraphEvent) => {
            let item: AnyObject = { type: "canvas" };
            if (e.itemType === "node") item = graph.ref?.getNodeData(e.itemId);
            if (e.itemType === "edge") item = graph.ref?.getEdgeData(e.itemId);
            if (e.itemType === "combo")
              item = graph.ref?.getComboData(e.itemId);
            if (e.itemId && !graph.ref?.getItemState(e.itemId, "selected")) {
              const nodes =
                graph.ref?.findIdByState("node", "selected", true) ?? [];
              const edges =
                graph.ref?.findIdByState("edge", "selected", true) ?? [];
              const combos =
                graph.ref?.findIdByState("combo", "selected", true) ?? [];
              nodes?.length &&
                graph.ref?.setItemState(
                  [...nodes, ...edges, ...combos],
                  "selected",
                  false
                );
            }
            e.itemId && graph.ref?.setItemState(e.itemId, "selected", true);
            graph.updateSelectedList();
            setTimeout(() => {
              setContextMenu({ type: e.itemType, ...item });
            }, 100);
            return "<div class='ax-graph__menu-portal'/>";
          },
        },
      ]);

      return () => {
        try {
          graph.ref?.removePlugins(["default-contextmenu"]);
        } catch {
          //
        }
      };
    }
  }, [graph.ref, container]);

  const timerRef = useRef();
  useEffect(() => {
    if (TooltipEl && container) {
      graph.ref?.addPlugins([
        {
          key: "default-tooltip",
          type: "tooltip",
          className: "ax-graph__tooltip-container",
          itemTypes: ["node", "edge", "combo"],
          shouldBegin: (e: AnyObject) => {
            return !!graph.ref?.getAllNodesData()?.length;
          },
          /** async string menu */
          getContent: (e: IG6GraphEvent) => {
            let item: AnyObject;
            clearTimeout(timerRef.current);
            if (e.itemType === "node") item = graph.ref?.getNodeData(e.itemId);
            if (e.itemType === "edge") {
              item = graph.ref?.getEdgeData(e.itemId);
              item = {
                ...item,
                source: item.source && graph.ref?.getNodeData(item.source),
                target: item.target && graph.ref?.getNodeData(item.target),
              };
              if (item.source)
                item.source.style = styleMap?.[item.source.data?.nodeType] ??
                  styleMap?.defaultNode ?? {
                    color: "#6b7280",
                  };
              if (item.target)
                item.target.style = styleMap?.[item.target.data?.nodeType] ??
                  styleMap?.defaultNode ?? {
                    color: "#6b7280",
                  };
            }
            if (e.itemType === "combo") {
              item = graph.ref?.getComboData(e.itemId);
              item = {
                children: graph.ref?.getComboChildrenData(e.itemId),
              };
            }
            if (item) {
              timerRef.current = setTimeout(() => {
                createRoot(
                  container.querySelector(
                    ".ax-graph__tooltip-portal"
                  ) as HTMLDivElement
                ).render(
                  <TooltipEl
                    item={item}
                    itemType={e.itemType as AnyObject}
                    style={
                      styleMap?.[item.data?.nodeType ?? item.data?.edgeType] ??
                      styleMap?.[
                        e.itemType === "edge" ? "defaultEdge" : "defaultNode"
                      ] ?? { color: "#6b7280" }
                    }
                  />
                );
              }, 200) as AnyObject;
            }

            container.querySelector(".ax-graph__tooltip-portal")?.remove();
            return `<div class='ax-graph__tooltip-portal' data-id="${e.itemId}"></div>`;
          },
        },
      ]);

      return () => {
        try {
          graph.ref?.removePlugins(["default-tooltip"]);
        } catch {
          //
        }
      };
    }
  }, [graph.ref, container, styleMap, TooltipEl]);

  const renderDetail = useCallback(
    (item: AnyObject) => {
      if (DetailEl) {
        return (
          <DetailEl
            item={item as GraphNode<N>}
            style={
              styleMap?.[item.data?.nodeType ?? "defaultNode"] ??
              styleMap?.defaultNode ?? { color: "#6b7280" }
            }
          />
        );
      }

      return <div className="border rounded p-2">No renderer available</div>;
    },
    [styleMap, DetailEl]
  );

  return (
    <GraphContext.Provider
      value={{ graph, changeMode, onNodeExpand, handleExpand, renderDetail }}
    >
      <div className="ax-graph-viewer">
        <div className="ax-graph__container" ref={setContainer} />
        {children}
      </div>

      {contextMenu && (
        <ContextMenu
          root={container?.querySelector(".ax-graph__menu-portal")}
          custom={onContextMenu?.({ type: contextMenu.type })}
          {...contextMenu}
        />
      )}
    </GraphContext.Provider>
  );
};

export const useGraphInternal = () => useContext(GraphContext);

export const useGraphContext = () => {
  const { graph } = useContext(GraphContext);
  return graph;
};
