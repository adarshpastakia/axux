/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type ElementProps } from "@axux/core/dist/types";
import { useEffect, useState, type FC } from "react";
import { marked } from "../utils/marked";

export interface Props extends ElementProps {
  text: string;
}

export const AxMdx: FC<Props> = ({ text, className, ...rest }) => {
  const [mdtext, setMdtext] = useState("");

  useEffect(() => {
    const parsed = !text ? "" : marked.parse(text.replaceAll(":::", "!!! "));
    void Promise.resolve(parsed).then(setMdtext);
  }, [text]);

  return (
    <div
      className={`markdown-body ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: mdtext }}
      onClick={(e) => {
        const el = e.currentTarget.closest(".hljs-copy")
          ?.previousElementSibling as HTMLElement;
        if (el) void navigator.clipboard.writeText(el.innerText);
      }}
    />
  );
};
