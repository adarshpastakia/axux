// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxButton, AxModal, AxText, useOverlayService } from "@axux/core";
import { AxEditor } from "@axux/data";
import { marked } from "marked";
import { FC, memo, useEffect, useState } from "react";
import { iconPencil } from "../../utils/icons";
import { IParagraphConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Item } from "./Item";

marked.use({
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartypants: false,
  xhtml: false,
});

const PLACEHOLDER =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris quis ipsum in mauris pharetra suscipit. Morbi velit magna, vulputate et urna a, rhoncus sollicitudin velit. Vivamus vehicula, orci non finibus cursus, lacus dui efficitur nisi, quis varius orci nunc et risus. Ut sed est semper, gravida ex sit amet, mollis est.";

const EditModal = ({ text, onChange, ...props }: KeyValue) => {
  return (
    <AxModal
      size="lg"
      height="80vh"
      {...props}
      headerClass="text-md font-bold text-primary"
      title="Edit Paragraph"
      icon={iconPencil}
    >
      <AxEditor value={text} onChange={onChange} language="markdown" />
    </AxModal>
  );
};

export const Paragraph: FC<IParagraphConfig> = memo((item) => {
  const { id, text, align } = item;
  const { isEditing, updateConfig } = usePageContext<IParagraphConfig>();
  const [mdtext, setMdtext] = useState(PLACEHOLDER);
  const [Editor, openEditor] = useOverlayService(EditModal);

  useEffect(() => {
    !text
      ? setMdtext(PLACEHOLDER)
      : marked.parse(text, (_: AnyObject, md: string) => {
          setMdtext(md || text);
        });
  }, [text]);

  return (
    <Item
      item={item}
      style={{
        textAlign: align,
      }}
    >
      <AxText className="markdown-body overflow-auto">{mdtext}</AxText>
      {Editor}
      {isEditing && !item.isReadOnly && (
        <AxButton
          className="absolute bottom-0 right-0"
          variant="outline"
          size="sm"
          stopPropagation
          icon={iconPencil}
          onClick={() => {
            void openEditor({
              text,
              onChange: (v: string) => updateConfig(id, "text", v),
            });
          }}
        >
          Edit
        </AxButton>
      )}
    </Item>
  );
});
Paragraph.displayName = "AxPageMaker.Paragraph";
