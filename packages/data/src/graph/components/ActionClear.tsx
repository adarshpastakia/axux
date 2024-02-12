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

export const ActionClear = () => {
  const { graph } = useGraphInternal();

  return (
    <AxButton.Confirm
      color="danger"
      placement="right"
      actionType="danger"
      message={(<div className="text-center">Clear graph?</div>) as AnyObject}
      icon={GraphIcons.toolErase}
      onClick={(b) => b && graph.ref?.clear()}
    />
  );
};
