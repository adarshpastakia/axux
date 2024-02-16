/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";
import { useTranslation } from "react-i18next";

export const ActionLayout = () => {
  const { t } = useTranslation("graph");
  const { graph } = useGraphInternal();

  return (
    <AxButton.Group isVertical variant="flat">
      <AxButton
        icon={GraphIcons.layoutAuto}
        isDisabled={graph.isClear}
        onClick={() => graph.applyLayout("auto")}
        tooltip={{ content: t("action.layoutAuto"), placement: "right" }}
      />
      <AxButton
        icon={GraphIcons.layoutRadial}
        isDisabled={graph.isClear}
        onClick={() => graph.applyLayout("radial")}
        tooltip={{ content: t("action.layoutRadial"), placement: "right" }}
      />
      <AxButton
        icon={GraphIcons.layoutGrid}
        isDisabled={graph.isClear}
        onClick={() => graph.applyLayout("grid")}
        tooltip={{ content: t("action.layoutGrid"), placement: "right" }}
      />
      <AxButton
        icon={GraphIcons.layoutHierarchial}
        isDisabled={graph.isClear}
        onClick={() => graph.applyLayout("hierarchy")}
        tooltip={{ content: t("action.layoutHierarchy"), placement: "right" }}
      />
    </AxButton.Group>
  );
};
