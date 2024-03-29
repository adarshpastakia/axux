/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { StateNode, type TLEventHandlers } from "@tldraw/editor";

export class Idle extends StateNode {
  static override id = "idle";

  override onPointerDown: TLEventHandlers["onPointerDown"] = (info) => {
    this.parent.transition("pointing", info);
  };

  override onEnter = () => {
    this.editor.setCursor({ type: "cross", rotation: 0 });
  };

  override onCancel = () => {
    this.editor.setCurrentTool("select");
  };

  override onKeyUp: TLEventHandlers["onKeyUp"] = (info) => {
    if (info.key === "Enter") {
      if (this.editor.instanceState.isReadonly) return null;
      const { onlySelectedShape } = this.editor;
      // If the only selected shape is editable, start editing it
      if (
        onlySelectedShape &&
        this.editor.getShapeUtil(onlySelectedShape).canEdit(onlySelectedShape)
      ) {
        this.editor.setCurrentTool("select");
        this.editor.setEditingShape(onlySelectedShape.id);
        // @ts-expect-error ignore
        this.editor.root.value?.transition("editing_shape", {
          ...info,
          target: "shape",
          shape: onlySelectedShape,
        });
      }
    }
  };
}
