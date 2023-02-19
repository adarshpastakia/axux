// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxDivider } from "@axux/core";
import { FC, memo } from "react";
import { IVDividerConfig } from "../../utils/types";
import { Item } from "./Item";

export const VDivider: FC<IVDividerConfig> = memo((item) => {
  const { color, width } = item;

  return (
    <Item item={item} style={{ display: "flex", justifyContent: "center" }}>
      <AxDivider size="sm" width={width} color={color} vertical />
    </Item>
  );
});
VDivider.displayName = "AxPageMaker.VDivider";
