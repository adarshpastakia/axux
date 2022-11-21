// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { getValue } from "@axux/utilities";
import { FC, memo, useMemo } from "react";
import { IHeadingConfig } from "../../utils/types";
import { Item } from "./Item";

export const Heading: FC<IHeadingConfig> = memo((item) => {
  const { title, size, color, iconCls } = item;
  const style = useMemo(
    () => ({
      color: getValue(color, "inherit"),
      fontSize: `${size ?? 1}rem`,
    }),
    [color, size]
  );

  return (
    <Item item={item}>
      <div style={style}>
        {iconCls && <i className={iconCls} />}
        <div>{title}</div>
      </div>
    </Item>
  );
});
Heading.displayName = "AxPageMaker.Heading";
