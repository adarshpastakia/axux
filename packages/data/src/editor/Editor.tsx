/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxHeader, AxSection, useResizeObserver } from "@axux/core";
import { ElementProps } from "@axux/core/dist/types";
import { isString } from "@axux/utilities";
import {
  FC,
  useCallback,
  useDeferredValue,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import MonacoEditor from "react-monaco-editor";
import { Tools } from "./Tools";

/** @internal */
export interface EditorProps extends ElementProps {
  /**
   * code string
   */
  value?: string | KeyValue;
  /**
   * onChange callback
   */
  onChange?: (value?: string) => void;
  /**
   * loading state
   */
  isLoading?: boolean;
  /**
   * readonly
   */
  isReadonly?: boolean;
  /**
   * hide toolbar
   */
  hideToolbar?: boolean;
  /**
   * code language
   */
  language?: "json" | "css" | "html" | "text" | "markdown";
}

export const AxEditor: FC<EditorProps> = ({
  value,
  hideToolbar,
  isLoading,
  isReadonly = false,
  language = "json",
  onChange,
}) => {
  const [editorRef, setEditorRef] = useState<MonacoEditor>();

  const [theme, setTheme] = useState("light");
  useLayoutEffect(() => {
    const [r, g, b]: [number, number, number] = getComputedStyle(
      document.documentElement
    ).backgroundColor.match(/\d?\d?\d/g) as AnyObject;
    setTheme(r < 100 && g < 100 && b < 100 ? "vs-dark" : "light");
  });

  const resizeHandler = useCallback(
    (size: AnyObject) => editorRef?.editor?.layout(size),
    []
  );
  const ref = useResizeObserver(resizeHandler);

  const deferredValue = useDeferredValue(value);
  const codeValue = useMemo(
    () =>
      isString(deferredValue)
        ? deferredValue
        : JSON.stringify(deferredValue, null, 4),
    [deferredValue]
  );

  return (
    <AxSection isLoading={isLoading}>
      {!hideToolbar && (
        <AxHeader>
          <Tools editor={editorRef?.editor} />
        </AxHeader>
      )}
      <AxSection ref={ref} className="ax-editor">
        <MonacoEditor
          ref={(e) => setEditorRef(e as AnyObject)}
          value={codeValue}
          onChange={onChange}
          language={language}
          theme={theme}
          options={{ wordWrap: "on", readOnly: isReadonly }}
        />
      </AxSection>
    </AxSection>
  );
};
