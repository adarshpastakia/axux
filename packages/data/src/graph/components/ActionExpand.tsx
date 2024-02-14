/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent, type NodeModel } from "@antv/g6";
import { AxButton } from "@axux/core";
import { useCallback, useEffect, useState } from "react";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

export const ActionExpand = () => {
  const { graph, onNodeExpand } = useGraphInternal();

  const [selected, setSelected] = useState<NodeModel[]>([]);

  const handleExpand = useCallback(
    (nodes: NodeModel[]) => {
      void onNodeExpand?.(nodes).then((newData) => {
        graph.addData(newData);
      });
    },
    [graph.ref, onNodeExpand]
  );

  useEffect(() => {
    graph.ref?.on("select", (e: IG6GraphEvent) => {
      setSelected(
        graph.ref
          ?.getAllNodesData()
          .filter((node) => graph.ref?.getItemState(node.id, "selected")) ?? []
      );
    });
    graph.ref?.on("node:dblclick", (e: IG6GraphEvent) => {
      const node = graph.ref?.getNodeData(e.itemId);
      node && handleExpand([node]);
    });
    return () => {
      graph.ref?.off("ode:dblclick");
      graph.ref?.off("select");
    };
  }, [graph.ref]);

  return (
    <AxButton
      icon={GraphIcons.toolExpand}
      isDisabled={graph.isClear || !selected.length}
      onClick={() => {
        handleExpand(selected);
      }}
    />
  );
};
