// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxMdx, AxMdxEditor } from "@axux/editors";
import { memo, type FC } from "react";
import { type IParagraphConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Item } from "./Item";

const HEIGHT_MAP = {
  auto: "auto",
  small: "12rem",
  medium: "24rem",
  large: "32rem",
};

export const Paragraph: FC<IParagraphConfig> = memo((item) => {
  const { id, text, height } = item;
  const { isEditing, updateConfig } = usePageContext<IParagraphConfig>();

  return (
    <Item
      item={item}
      canUnselect={false}
      style={{
        height: HEIGHT_MAP[height ?? "auto"],
      }}
    >
      {!isEditing && (
        <AxMdx className="markdown-body paragraph-text" text={text} />
      )}
      {isEditing && (
        <AxMdxEditor
          value={text}
          onChange={(v: string) => updateConfig(id, "text", v)}
        />
      )}
    </Item>
  );
});
Paragraph.displayName = "AxPageMaker.Paragraph";
