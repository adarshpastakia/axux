// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxButton, AxIcon } from "@axux/core";
import { DragEventHandler, FC, memo } from "react";
import { iconDelete, iconDrag } from "../../utils/icons";

export const EditHead: FC<{
  title: string;
  onRemove: () => void;
  onDragStart: DragEventHandler;
}> = memo(({ title, onRemove, onDragStart }) => (
  <div className="page-maker__head" draggable onDragStart={onDragStart}>
    <AxIcon icon={iconDrag} />
    <small>{title}</small>
    <AxButton
      size="sm"
      style="link"
      color="danger"
      className="flush"
      icon={iconDelete}
      stopPropagation
      onClick={onRemove}
    />
  </div>
));
EditHead.displayName = "AxPageMaker.EditHead";
