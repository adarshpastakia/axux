/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { useTranslation } from "react-i18next";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

export const ActionHilight = () => {
  const { t } = useTranslation("graph");
  const { graph } = useGraphInternal();

  return (
    <AxButton
      icon={GraphIcons.toolHilight}
      isDisabled={graph.isClear || graph.selectedItems.length !== 2}
      onClick={() => {
        graph.hilightPath();
      }}
      tooltip={{ content: t("action.hilight"), placement: "right" }}
    />
  );
};
