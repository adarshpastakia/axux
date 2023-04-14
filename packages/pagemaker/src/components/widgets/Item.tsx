// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { type ChildrenProp } from "@axux/core/dist/types";
import {
  type CSSProperties,
  type FC,
  memo,
  type MouseEvent,
  type MutableRefObject,
  useCallback,
  useMemo,
  useState,
} from "react";
import { EnumTypes, type IItem } from "../../utils/types";
import { useColResize } from "../../utils/useColResize";
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
    const {
      isEditing,
      editConfig,
      selected,
      removeConfig,
      setDragging,
      dragging,
    } = usePageContext();
    const { ref, span, onResizeStart } = useColResize(item.id, item.colSpan);
    const { id, type } = item;

    const isSelected = useMemo(
      () => selected && id === selected.id,
      [id, selected]
    );

    const onClick = useCallback(
      (e: MouseEvent) => {
        if (isEditing) {
          editConfig(selected?.id === id ? undefined : id);
          e.stopPropagation();
        }
      },
      [isEditing, editConfig, selected, id]
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
        ref={ref}
        className={`page-maker__item`}
        data-id={id}
        data-type={type}
        data-span={span}
        data-hover={hover}
        data-dragging={dragging?.item?.id === id}
        data-expanded={expanded}
        data-selected={isSelected}
        style={{
          ...style,
          aspectRatio: (item as AnyObject).aspect,
          gridColumnEnd: `span ${span}`,
        }}
        {...rest}
        onClick={onClick}
        onMouseOver={onMouseOver}
        onMouseOut={() => setHover(false)}
      >
        {children}
        {isEditing &&
          ![EnumTypes.DIVIDER, EnumTypes.VDIVIDER, EnumTypes.BREAK].includes(
            item.type
          ) && (
            <div
              data-type="col"
              className="page-maker__resizer"
              onMouseDown={onResizeStart}
            />
          )}
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
