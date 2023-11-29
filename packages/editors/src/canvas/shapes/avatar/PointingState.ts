/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { StateNode, type TLEventHandlers } from "@tldraw/editor";
import { createShapeId } from "@tldraw/tldraw";
import { type AvatarShape } from "./type";

export class Pointing extends StateNode {
  static override id = "pointing";

  shape?: AvatarShape;

  markId = "";

  override onPointerUp: TLEventHandlers["onPointerUp"] = () => {
    this.cancel();
  };

  override onCancel: TLEventHandlers["onCancel"] = () => {
    this.cancel();
  };

  override onComplete: TLEventHandlers["onComplete"] = () => {
    this.cancel();
  };

  override onInterrupt: TLEventHandlers["onInterrupt"] = () => {
    this.cancel();
  };

  override onPointerMove: TLEventHandlers["onPointerMove"] = (info) => {
    if (this.editor.inputs.isDragging) {
      const { originPagePoint } = this.editor.inputs;

      const id = createShapeId();

      this.markId = `creating:${id}`;

      this.editor.mark(this.markId);

      this.editor
        .createShapes<AvatarShape>([
          {
            id,
            type: "avatar",
            x: originPagePoint.x,
            y: originPagePoint.y,
            props: {
              color: "black",
              fill: "none",
              dash: "draw",
              size: "m",
              font: "draw",
              text: "person",
              align: "middle",
            } as AnyObject,
          },
        ])
        .select(id)
        .setCurrentTool("select.resizing", {
          ...info,
          target: "selection",
          handle: "bottom_right",
          isCreating: true,
          creationCursorOffset: { x: 1, y: 1 },
          onInteractionEnd: "avatar",
        });
    }
  };

  cancel() {
    if (this.shape) {
      // the arrow might not have been created yet!
      this.editor.bailToMark(this.markId);
    }
    this.editor.setHintingShapes([]);
    this.parent.transition("idle", {});
  }
}
