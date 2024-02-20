/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type IG6GraphEvent } from "@antv/g6";
import { AxButton } from "@axux/core";
import { Fragment, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

export const ActionDelete = () => {
  const { t } = useTranslation("graph");
  const { graph } = useGraphInternal();

  useEffect(() => {
    graph.ref?.on("keydown", (e: IG6GraphEvent) => {
      e.key === "Delete" && graph.removeSelected();
    });
    return () => {
      graph.ref?.off("keydown");
    };
  }, [graph.ref]);

  return (
    <Fragment>
      <AxButton
        color="danger"
        icon={GraphIcons.toolDelete}
        isDisabled={graph.isClear || !graph.selectedItems.length}
        onClick={graph.removeSelected}
        tooltip={{ content: t("action.delete"), placement: "right" }}
      />
    </Fragment>
  );
};
