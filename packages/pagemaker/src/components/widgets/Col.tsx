// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxButton, AxDivider } from "@axux/core";
import {
  FC,
  memo,
  MouseEvent as ME,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { iconPlus } from "../../utils/icons";
import { EnumTypes, IColConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Divider } from "./Divider";
import { Heading } from "./Heading";
import { Item } from "./Item";
import { Row } from "./Row";
import { Tile } from "./Tile";

export const Col: FC<IColConfig> = memo((item) => {
  const { t } = useTranslation("pagemaker");
  const { isEditing, updateConfig, addWidget } = usePageContext();
  const { id, children, colSpan } = item;

  const refEl = useRef<HTMLDivElement>(null);
  const [span, setSpan] = useState(colSpan);

  useLayoutEffect(() => {
    setSpan(colSpan);
  }, [colSpan]);

  const onResize = (evt: MouseEvent) => {
    const newX = evt.clientX;
    if (refEl.current && refEl.current.parentElement) {
      const box = refEl.current.getBoundingClientRect();
      const minWidth = Math.round(refEl.current.parentElement.offsetWidth / 12);
      let newSpan = Math.floor((newX - (box.left - minWidth)) / minWidth) || 1;
      if (newSpan > 12) newSpan = 12;
      setSpan(newSpan as AnyObject);
    }
  };

  const onResizeEnd = () => {
    if (refEl.current) {
      updateConfig(
        id,
        "colSpan",
        parseInt(refEl.current.dataset.span ?? "3", 10)
      );
    }
    document.body.style.cursor = "unset";
    document.removeEventListener("mousemove", onResize);
    document.removeEventListener("mouseup", onResizeEnd);
  };

  const onResizeStart = (e: ME) => {
    e.preventDefault();
    document.body.style.cursor = "col-resize";
    document.addEventListener("mousemove", onResize);
    document.addEventListener("mouseup", onResizeEnd);
  };

  const isStretched = useMemo(() => {
    return (
      children && children.length > 0 && children[0].type === EnumTypes.TILE
    );
  }, [children]);

  return (
    <Item
      item={item}
      itemRef={refEl}
      data-span={span}
      style={{
        gridColumnEnd: `span ${span}`,
        gridAutoRows: isStretched ? "auto" : "max-content",
      }}
    >
      {Array.isArray(children) &&
        (children as AnyObject).map((item: AnyObject) => {
          switch (item.type) {
            case EnumTypes.HEADING:
              return <Heading key={item.id} {...item} />;
            case EnumTypes.DIVIDER:
              return <Divider key={item.id} {...item} />;
            case EnumTypes.ROW:
              return <Row key={item.id} {...item} />;
            case EnumTypes.TILE:
              return <Tile key={item.id} {...item} />;
            default:
              return null;
          }
        })}
      {isEditing && (!children || children.length === 0) && (
        <div className="page-maker__emptyCol">
          <div>{t("label.drag")}</div>
          <AxDivider size="sm" align="center">
            or
          </AxDivider>
          <AxButton
            icon={iconPlus}
            stopPropagation
            onClick={() => addWidget(item.id)}
          >
            {t("label.addNew")}
          </AxButton>
        </div>
      )}
      {isEditing && (
        <div className="page-maker__resizer" onMouseDown={onResizeStart} />
      )}
    </Item>
  );
});
Col.displayName = "AxPageMaker.Col";
