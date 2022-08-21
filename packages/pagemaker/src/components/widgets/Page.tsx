// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxContent } from "@axux/core";
import { memo } from "react";
import { onDragLeave, onDragOver, onDrop } from "../../utils/dnd";
import { EnumTypes } from "../../utils/types";
import { usePageContext } from "../context";
import { Divider } from "./Divider";
import { Heading } from "./Heading";
import { Row } from "./Row";

export const Page = memo(() => {
  const { isEditing, config = [], dragging, addItem } = usePageContext();
  return (
    <AxContent
      className="page-maker__page"
      data-type={EnumTypes.PAGE}
      data-editing={isEditing}
    >
      <div
        className="page-maker__grid"
        onDragLeave={onDragLeave}
        onDragExit={onDragLeave}
        onDrop={() => addItem(onDrop(dragging))}
        onDragOver={(e) => dragging && onDragOver(e, dragging)}
      >
        {config.map((item) => {
          switch (item.type) {
            case EnumTypes.HEADING:
              return <Heading key={item.id} {...item} />;
            case EnumTypes.DIVIDER:
              return <Divider key={item.id} {...item} />;
            case EnumTypes.ROW:
              return <Row key={item.id} {...item} />;
            default:
              return null;
          }
        })}
      </div>
    </AxContent>
  );
});
Page.displayName = "AxPageMaker.Page";
