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
  type FC,
} from "react";
import { createRoot } from "react-dom/client";
import { ContextMenu } from "../components/ContextMenu";
import { useGraph } from "../hooks/useGraph";
import { type GraphProps } from "../types";

const GraphContext = createContext<{
  graph: ReturnType<typeof useGraph>;
  changeMode: (mode?: "brush" | "lasso") => void;
  onNodeExpand: GraphProps["onNodeExpand"];
  handleExpand: (nodes: NodeModel[]) => void;
}>({} as AnyObject);

export const GraphProvider: FC<GraphProps> = ({
  data,
  styleMap,
  defaultLayout = "auto",
  readOnly,
  useWorker,
  children,
  graphRef,
  renderTooltip: TooltipEl,
  onDataLoad,
  onClear,
  onNodeExpand,
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const graph = useGraph(container, { useWorker });
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
    data && graph.loadData(data as AnyObject);
  }, [graph.loadData, data]);

  useEffect(() => {
    graph.isClear && onClear?.();
  }, [graph.isClear, onClear]);

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
      void onNodeExpand?.(nodes)
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

  const [contextMenu, setContextMenu] = useState<KeyValue>();
  useEffect(() => {
    graph.ref?.addPlugins([
      {
        key: "contextmenu",
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
          if (e.itemType === "combo") item = graph.ref?.getComboData(e.itemId);
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
          setTimeout(() => {
            setContextMenu({ type: e.itemType, ...item });
          }, 100);
          return "<div class='ax-graph__menu-portal'/>";
        },
      },
    ]);
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
                ).render(<TooltipEl {...item} itemType={e.itemType} />);
              }, 200) as AnyObject;
            }

            container.querySelector(".ax-graph__tooltip-portal")?.remove();
            return `<div class='ax-graph__tooltip-portal' data-id="${e.itemId}"></div>`;
          },
        },
      ]);

      return () => {
        graph.ref?.removePlugins(["default-tooltip"]);
      };
    }
  }, [graph.ref, container, TooltipEl]);

  return (
    <GraphContext.Provider
      value={{ graph, changeMode, onNodeExpand, handleExpand }}
    >
      <div className="ax-graph-viewer">
        <div className="ax-graph__container" ref={setContainer} />
        {children}
      </div>

      {contextMenu && (
        <ContextMenu
          root={container?.querySelector(".ax-graph__menu-portal")}
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
