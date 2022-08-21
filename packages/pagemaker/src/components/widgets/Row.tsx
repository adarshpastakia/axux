// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import {
  FC,
  memo,
  MouseEvent as ME,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { IRowConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Col } from "./Col";
import { Item } from "./Item";

export const Row: FC<IRowConfig> = memo((item) => {
  let startY = 0;
  const { isEditing, updateConfig } = usePageContext();
  const { id, height, children } = item;

  const refEl = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState(height);
  const [isResizing, setResizing] = useState(false);

  useLayoutEffect(() => {
    setRowHeight(height);
  }, [height]);

  const onResize = (evt: MouseEvent) => {
    const newY = evt.clientY;
    if (refEl.current && refEl.current.lastElementChild) {
      const diff = newY - startY;
      const newHeight = refEl.current.clientHeight;
      if (newHeight + diff < 32) {
        setRowHeight(32);
      } else {
        setRowHeight(newHeight + diff);
        startY = newY;
      }
    }
  };

  const onResizeEnd = () => {
    if (refEl.current) {
      updateConfig(id, "height", refEl.current.clientHeight);
      refEl.current.dataset.resizing = "false";
    }
    setResizing(false);
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  const onResizeStart = (e: ME) => {
    startY = e.clientY;
    if (refEl.current) {
      refEl.current.dataset.resizing = "true";
    }
    setResizing(true);
    document.body.style.cursor = "row-resize";
    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", onResizeEnd);
    e.preventDefault();
  };

  return (
    <Item
      item={item}
      itemRef={refEl}
      style={{ [isEditing && !isResizing ? "minHeight" : "height"]: rowHeight }}
    >
      <div className="page-maker__rowContainer">
        {children && children.map((item) => <Col key={item.id} {...item} />)}
      </div>
      {isEditing && (
        <div className="page-maker__resizer" onMouseDown={onResizeStart} />
      )}
    </Item>
  );
});
Row.displayName = "AxPageMaker.Row";
