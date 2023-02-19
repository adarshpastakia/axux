// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxContent } from "@axux/core";
import { memo } from "react";
import {
  ghost,
  onDragCancel,
  onDragLeave,
  onDragOver,
  onDrop,
} from "../../utils/dnd";
import { EnumTypes } from "../../utils/types";
import { usePageContext } from "../context";
import { Break } from "./Break";
import { Divider } from "./Divider";
import { Grid } from "./Grid";
import { Heading } from "./Heading";
import { Image } from "./Image";
import { Paragraph } from "./Paragraph";
import { Tile } from "./Tile";
import { VDivider } from "./VDivider";

export const Page = memo(() => {
  const {
    refPageEl,
    isEditing,
    config = [],
    dragging,
    setDragging,
    addItem,
    editConfig,
  } = usePageContext();
  return (
    <AxContent padding="none">
      <div
        ref={refPageEl}
        className="page-maker__page"
        data-type={EnumTypes.PAGE}
        data-editing={isEditing}
        onClick={() => editConfig(undefined)}
        onDragLeave={onDragLeave}
        onDragEnd={() => (onDragCancel(), setDragging(undefined))}
        onDragExit={onDragLeave}
        onDrop={() => addItem(onDrop(dragging))}
        onDragOver={(e) => dragging && onDragOver(e, dragging)}
      >
        <div className="page-maker__grid" ref={(el) => el?.appendChild(ghost)}>
          {config.map((item) => {
            switch (item.type) {
              case EnumTypes.HEADING:
                return <Heading key={item.id} {...item} />;
              case EnumTypes.PARAGRAPH:
                return <Paragraph key={item.id} {...item} />;
              case EnumTypes.DIVIDER:
                return <Divider key={item.id} {...item} />;
              case EnumTypes.VDIVIDER:
                return <VDivider key={item.id} {...item} />;
              case EnumTypes.IMAGE:
                return <Image key={item.id} {...item} />;
              case EnumTypes.TILE:
                return <Tile key={item.id} {...item} />;
              case EnumTypes.GRID:
                return <Grid key={item.id} {...item} />;
              case EnumTypes.BREAK:
                return <Break key={item.id} {...item} />;
              default:
                return null;
            }
          })}
        </div>
      </div>
    </AxContent>
  );
});
Page.displayName = "AxPageMaker.Page";
