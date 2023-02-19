// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxField } from "@axux/form";
import { getValue } from "@axux/utilities";
import { FC, memo, useMemo } from "react";
import { IHeadingConfig } from "../../utils/types";
import { usePageContext } from "../context";
import { Item } from "./Item";

export const Heading: FC<IHeadingConfig> = memo((item) => {
  const { text, size, align, color, icon, bold, italic, underline } = item;
  const { isEditing, updateConfig } = usePageContext<IHeadingConfig>();
  const style = useMemo(
    () => ({
      textAlign: align,
      color: getValue(color, "inherit"),
      fontSize: `${size ?? 1}rem`,
      fontWeight: bold ? 800 : 500,
      fontStyle: italic ? "italic" : "normal",
      borderBottom: `${underline ? "1px" : 0} solid currentColor`,
    }),
    [color, align, size, bold, italic, underline]
  );

  return (
    <Item item={item}>
      <div style={style}>
        {icon && <i className={icon} />}
        {(!isEditing || item.isReadOnly) && (
          <div>{text || <span className="text-muted">Heading...</span>}</div>
        )}
        {isEditing && !item.isReadOnly && (
          <AxField.Text
            isPlain
            placeholder="Heading..."
            value={text}
            onChange={(val) => updateConfig(item.id, "text", val)}
          />
        )}
      </div>
    </Item>
  );
});
Heading.displayName = "AxPageMaker.Heading";
