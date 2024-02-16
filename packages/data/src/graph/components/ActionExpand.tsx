/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent, type NodeModel } from "@antv/g6";
import { AxButton } from "@axux/core";
import { useCallback, useEffect } from "react";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";
import { useTranslation } from "react-i18next";

export const ActionExpand = () => {
  const { t } = useTranslation("graph");
  const { graph, onNodeExpand } = useGraphInternal();

  const handleExpand = useCallback(
    (nodes: NodeModel[]) => {
      void onNodeExpand?.(nodes).then((newData) => {
        graph.addData(newData);
      });
    },
    [graph.ref, onNodeExpand]
  );

  useEffect(() => {
    graph.ref?.on("node:dblclick", (e: IG6GraphEvent) => {
      const node = graph.ref?.getNodeData(e.itemId);
      node && handleExpand([node]);
    });
    return () => {
      graph.ref?.off("ode:dblclick");
    };
  }, [graph.ref]);

  return (
    <AxButton
      icon={GraphIcons.toolExpand}
      isDisabled={graph.isClear || !graph.selectedItems.length}
      onClick={() => {
        handleExpand(graph.selectedItems);
      }}
      tooltip={{ content: t("action.expand"), placement: "right" }}
    />
  );
};
