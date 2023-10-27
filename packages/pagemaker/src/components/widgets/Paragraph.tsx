// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  InsertAdmonition,
  InsertThematicBreak,
  InsertTable,
  MDXEditor,
  Separator,
  UndoRedo,
  directivesPlugin,
  headingsPlugin,
  linkDialogPlugin,
  linkPlugin,
  listsPlugin,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import { marked } from "marked";
import * as admonition from "marked-admonition-extension";
import { memo, useEffect, useState, type FC } from "react";
import { type IParagraphConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Item } from "./Item";

marked.use({
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});
marked.use(admonition.default);

const HEIGHT_MAP = {
  auto: "auto",
  small: "12rem",
  medium: "24rem",
  large: "32rem",
};

const PLACEHOLDER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis ipsum in mauris pharetra suscipit. Morbi velit magna, vulputate et urna a, rhoncus sollicitudin velit. Vivamus vehicula, orci non finibus cursus, lacus dui efficitur nisi, quis varius orci nunc et risus. Ut sed est semper, gravida ex sit amet, mollis est.";

export const Paragraph: FC<IParagraphConfig> = memo((item) => {
  const { id, text, height } = item;
  const { isEditing, updateConfig } = usePageContext<IParagraphConfig>();
  const [mdtext, setMdtext] = useState(PLACEHOLDER);

  useEffect(() => {
    !text
      ? setMdtext(PLACEHOLDER)
      : marked.parse(
          text.replaceAll(":::", "!!! "),
          (_: AnyObject, md: string) => {
            setMdtext(md || text);
          }
        );
  }, [text]);

  return (
    <Item
      item={item}
      canUnselect={false}
      style={{
        height: HEIGHT_MAP[height ?? "auto"],
      }}
    >
      {!isEditing && (
        <div
          className="markdown-body paragraph-text"
          dangerouslySetInnerHTML={{ __html: mdtext }}
        />
      )}
      {isEditing && (
        <MDXEditor
          className="mdx-editor markdown-body dark-theme"
          markdown={text}
          onChange={(v: string) => updateConfig(id, "text", v)}
          plugins={[
            headingsPlugin(),
            listsPlugin(),
            quotePlugin(),
            tablePlugin(),
            thematicBreakPlugin(),
            linkPlugin(),
            linkDialogPlugin(),
            directivesPlugin({
              directiveDescriptors: [AdmonitionDirectiveDescriptor],
            }),
            toolbarPlugin({
              toolbarContents: () => (
                <>
                  <UndoRedo />
                  <Separator />
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <BlockTypeSelect />
                  <Separator />
                  <CreateLink />
                  <InsertTable />
                  <InsertThematicBreak />
                  <InsertAdmonition />
                </>
              ),
            }),
          ]}
        />
      )}
    </Item>
  );
});
Paragraph.displayName = "AxPageMaker.Paragraph";
