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

export const ActionLayout = () => {
  const { graph } = useGraphInternal();

  return (
    <AxButton.Group isVertical variant="flat">
      <AxButton
        icon={GraphIcons.layoutAuto}
        onClick={() => graph.applyLayout("auto")}
      />
      <AxButton
        icon={GraphIcons.layoutRadial}
        onClick={() => graph.applyLayout("radial")}
      />
      <AxButton
        icon={GraphIcons.layoutGrid}
        onClick={() => graph.applyLayout("grid")}
      />
      <AxButton
        icon={GraphIcons.layoutHierarchial}
        onClick={() => graph.applyLayout("hierarchy")}
      />
    </AxButton.Group>
  );
};
