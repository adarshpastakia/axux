// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxDivider } from "@axux/core";
import { FC, memo, useMemo } from "react";
import { IDividerConfig } from "../../utils/types";
import { Item } from "./Item";

export const Divider: FC<IDividerConfig> = memo((item) => {
  const { title, color, iconCls, size } = item;
  const style = useMemo(
    () => ({
      color: color || "inherit",
      fontSize: `${size || 1}rem`,
    }),
    [color, size]
  );

  return (
    <Item item={item}>
      <AxDivider size="sm">
        {(iconCls || title) && (
          <div style={style}>
            {iconCls && <i className={iconCls} />}
            {title && <span>{title}</span>}
          </div>
        )}
      </AxDivider>
    </Item>
  );
});
Divider.displayName = "AxPageMaker.Divider";
