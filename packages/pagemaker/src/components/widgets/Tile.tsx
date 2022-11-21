// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import {
  AxButton,
  AxContent,
  AxHeader,
  AxIcon,
  AxPanel,
  AxTitle,
  AxTooltip,
} from "@axux/core";
import { getValue } from "@axux/utilities";
import { FC, memo, useMemo } from "react";
import { iconInfo, iconPencil } from "../../utils/icons";
import { ITileConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Item } from "./Item";

export const Tile: FC<ITileConfig> = memo((item) => {
  const { isEditing, editWidget, renderWidget, findWidget } = usePageContext();
  const style = useMemo(
    () => ({
      color: getValue(item.color, "inherit"),
    }),
    [item.color]
  );

  const widget = useMemo(
    () => findWidget(item.widgetId),
    [findWidget, item.widgetId]
  );

  return (
    <Item item={item} style={{ aspectRatio: item.aspect }}>
      <AxPanel isExpandable={!isEditing && item.expandable}>
        <AxHeader className="page-maker__tileHead ax-header" {...{ style }}>
          {item.iconCls && <AxIcon icon={item.iconCls} />}
          <AxTitle>{item.title}</AxTitle>
          {item.info && (
            <AxTooltip
              content={<pre dangerouslySetInnerHTML={{ __html: item.info }} />}
              className="page-maker__tileInfo"
            >
              <AxIcon icon={iconInfo} />
            </AxTooltip>
          )}

          {isEditing && (
            <AxButton
              variant="link"
              icon={iconPencil}
              onClick={() => editWidget(item.widgetId)}
            />
          )}
        </AxHeader>
        <AxContent className="page-maker__tileBody" padding="none">
          {!isEditing && renderWidget(item.widgetId)}
          {isEditing && widget != null && (
            <div style={{ placeSelf: "center", textAlign: "center" }}>
              {widget.icon && <AxIcon icon={widget.icon} />}
              <div>{widget.title}</div>
            </div>
          )}
        </AxContent>
      </AxPanel>
    </Item>
  );
});
Tile.displayName = "AxPageMaker.Tile";
