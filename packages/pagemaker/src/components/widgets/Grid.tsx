// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { FC } from "react";
import { EnumTypes, IGridConfig } from "../../utils/types";
import { Break } from "./Break";
import { Divider } from "./Divider";
import { Heading } from "./Heading";
import { Image } from "./Image";
import { Item } from "./Item";
import { Paragraph } from "./Paragraph";
import { Tile } from "./Tile";
import { VDivider } from "./VDivider";

export const Grid: FC<IGridConfig> = (item) => {
  return (
    <Item item={item}>
      <div className="page-maker__grid inner" data-id={item.id}>
        {item.children.map((item) => {
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
            case EnumTypes.BREAK:
              return <Break key={item.id} {...item} />;
            default:
              return null;
          }
        })}
      </div>
    </Item>
  );
};
Grid.displayName = "AxPageMaker.Grid";
