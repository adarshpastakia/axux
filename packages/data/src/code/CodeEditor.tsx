// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxSection, useAxResizeObserver } from "@axux/core";
import { ElementProps, VFC } from "@axux/core/dist/types";
import { useLayoutEffect, useRef, useState } from "react";
import MonacoEditor from "react-monaco-editor";
import { CodeEditorTools } from "./CodeEditorTools";

/** @internal */
export interface CodeEditorProps extends ElementProps {
  value?: string;
  onChange?: (value?: string) => void;

  isReadonly?: boolean;
  hideToolbar?: boolean;

  language?: "json" | "javascript" | "css" | "html" | "text" | "markdown" | "typescript";
}

export const AxCodeEditor: VFC<CodeEditorProps> = ({
  value,
  hideToolbar,
  isReadonly = false,
  language = "json",
  onChange
}) => {
  const editorRef = useRef<MonacoEditor>(null);

  const [theme, setTheme] = useState("light");
  useLayoutEffect(() => {
    const [r, g, b]: [number, number, number] = getComputedStyle(
      document.querySelector(".ax-viewport") as HTMLElement
    ).backgroundColor.match(/\d?\d?\d/g) as AnyObject;
    setTheme(r < 100 && g < 100 && b < 100 ? "vs-dark" : "light");
  });

  const ref = useAxResizeObserver((size) => {
    editorRef.current?.editor?.layout(size);
  });

  return (
    <AxSection>
      <AxSection>
        {!hideToolbar && (
          <AxSection.Head>
            <CodeEditorTools editor={editorRef.current?.editor} />
          </AxSection.Head>
        )}
        <AxSection ref={ref} className="ax-code__editor">
          <MonacoEditor
            ref={editorRef}
            value={value}
            onChange={onChange}
            language={language}
            theme={theme}
            options={{ wordWrap: "on", readOnly: isReadonly }}
          />
        </AxSection>
      </AxSection>
    </AxSection>
  );
};
