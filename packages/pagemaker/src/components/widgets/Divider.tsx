// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxDivider } from "@axux/core";
import { FC, memo, useMemo } from "react";
import { IDividerConfig } from "../../utils/types";
import { Item } from "./Item";

export const Divider: FC<IDividerConfig> = memo((item) => {
  const { text, color, icon, size, width, align, applyBg } = item;
  const style = useMemo(
    () => ({
      fontSize: `${size ?? 1}rem`,
    }),
    [size]
  );

  return (
    <Item item={item}>
      <AxDivider
        size="xs"
        color={color}
        width={width}
        align={align as AnyObject}
        applyBg={applyBg}
      >
        {(!!icon || !!text) && (
          <div style={style}>
            {icon && <i className={icon} />}
            {text && <span>{text}</span>}
          </div>
        )}
      </AxDivider>
    </Item>
  );
});
Divider.displayName = "AxPageMaker.Divider";
