// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxButton, AxIcon } from "@axux/core";
import { type DragEventHandler, type FC, memo } from "react";
import { iconDelete, iconDrag } from "../../utils/icons";

interface Props {
  title: string;
  isLocked?: boolean;
  onRemove: () => void;
  onDragStart: DragEventHandler;
}

export const EditHead: FC<Props> = memo(
  ({ title, isLocked, onRemove, onDragStart }: Props) => (
    <div
      className="page-maker__head"
      ref={(el) =>
        el &&
        (el.dataset.top =
          el?.parentElement && el.parentElement?.offsetTop < 32
            ? "true"
            : "false")
      }
      draggable
      onDragStart={onDragStart}
    >
      <AxIcon icon={iconDrag} />
      <small>{title}</small>
      {!isLocked && (
        <AxButton
          size="sm"
          variant="link"
          color="danger"
          className="flush"
          icon={iconDelete}
          stopPropagation
          onClick={onRemove}
        />
      )}
    </div>
  )
);
EditHead.displayName = "AxPageMaker.EditHead";
