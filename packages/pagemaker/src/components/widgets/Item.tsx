// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { ChildrenProp } from "@axux/core/dist/types";
import {
  CSSProperties,
  FC,
  memo,
  MouseEvent,
  MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from "react";
import { IItem } from "../../utils/types";
import { usePageContext } from "../context";
import { EditHead } from "./EditHead";

interface Props extends ChildrenProp {
  item: IItem;
  expanded?: boolean;
  style?: CSSProperties;
  itemRef?: MutableRefObject<HTMLDivElement | null>;
}

export const Item: FC<Props> = memo(
  ({ item, children, style, itemRef, expanded = false, ...rest }: Props) => {
    const [hover, setHover] = useState(false);
    const { isEditing, editConfig, selected, removeConfig, setDragging } =
      usePageContext();
    const { id, type } = item;

    const isSelected = useMemo(
      () => selected && id === selected.id,
      [id, selected]
    );

    const onClick = useCallback(
      (e: MouseEvent) => {
        if (isEditing) {
          editConfig(id);
          e.stopPropagation();
        }
      },
      [isEditing, editConfig, id]
    );

    const onMouseOver = useCallback(
      (e: MouseEvent) => {
        if (isEditing) {
          setHover(true);
          e.stopPropagation();
        }
      },
      [isEditing]
    );

    return (
      <div
        ref={itemRef}
        className={`page-maker__item`}
        data-id={id}
        data-type={type}
        data-hover={hover}
        data-expanded={expanded}
        data-selected={isSelected}
        style={style}
        {...rest}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={() => setHover(false)}
      >
        {children}
        {isEditing && (
          <EditHead
            title={type}
            onRemove={() => removeConfig(id)}
            onDragStart={(e) => [
              setDragging({ type, item }),
              e.stopPropagation(),
            ]}
          />
        )}
      </div>
    );
  }
);
Item.displayName = "AxPageMaker.Item";
