// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { type FC, memo } from "react";
import { type IItem } from "../../utils/types";
import { Item } from "./Item";

export const Break: FC<IItem> = memo((item) => {
  return (
    <Item item={item}>
      <div
        className="flex items-center gap-2"
        style={{ pageBreakAfter: "always" }}
      >
        <div className="flex-1 border-b border-dashed border-b-bw-500/30" />
        <span className="text-sm text-bw-500/30">BREAK</span>
        <div className="flex-1 border-b border-dashed border-b-bw-500/30" />
      </div>
    </Item>
  );
});
Break.displayName = "AxPageMaker.Break";
