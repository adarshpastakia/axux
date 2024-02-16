/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type ID, type IG6GraphEvent } from "@antv/g6";
import { AxButton } from "@axux/core";
import { Fragment, useCallback, useEffect } from "react";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";
import { useTranslation } from "react-i18next";

export const ActionDelete = () => {
  const { t } = useTranslation("graph");
  const { graph } = useGraphInternal();

  const handleRemove = useCallback(() => {
    const edges: ID[] = [];
    const items = graph.ref?.findIdByState("node", "selected", true) ?? [];
    items.forEach((id) => {
      edges.push(
        ...(graph.ref?.getRelatedEdgesData(id)?.map((ed) => ed.id) ?? [])
      );
    });
    graph.ref?.setItemState([...edges, ...items], "selected", false);
    edges.length && graph.ref?.removeData("edge", edges);
    items.length && graph.ref?.removeData("node", items);
  }, [graph.ref]);

  useEffect(() => {
    graph.ref?.on("keydown", (e: IG6GraphEvent) => {
      e.key === "Delete" && handleRemove();
    });
    return () => {
      graph.ref?.off("select");
      graph.ref?.off("keydown");
    };
  }, [graph.ref]);

  return (
    <Fragment>
      <AxButton
        color="danger"
        icon={GraphIcons.toolDelete}
        isDisabled={graph.isClear || !graph.selectedItems.length}
        onClick={handleRemove}
        tooltip={{ content: t("action.delete"), placement: "right" }}
      />
    </Fragment>
  );
};
