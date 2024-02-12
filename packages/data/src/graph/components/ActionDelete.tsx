/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent, type NodeModel } from "@antv/g6";
import { AxButton } from "@axux/core";
import { useEffect, useState } from "react";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

export const ActionDelete = () => {
  const { graph } = useGraphInternal();
  const [selected, setSelected] = useState<NodeModel[]>([]);

  useEffect(() => {
    graph.ref?.on("select", (e: IG6GraphEvent) => {
      setSelected(
        graph.ref
          ?.getAllNodesData()
          .filter((node) => graph.ref?.getItemState(node.id, "selected")) ?? []
      );
    });
    return () => {
      graph.ref?.off("select");
    };
  }, [graph.ref]);
  return (
    <AxButton
      color="danger"
      icon={GraphIcons.toolDelete}
      isDisabled={!selected.length}
      onClick={() => (
        graph.ref?.removeData(
          "node",
          selected.map((node) => node.id)
        ),
        setSelected([])
      )}
    />
  );
};
