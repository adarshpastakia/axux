/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxSection, useDebounce, useResizeObserver } from "@axux/core";
import { ElementProps } from "@axux/core/dist/types";
import { isString } from "@axux/utilities";
import {
  FC,
  Ref,
  useCallback,
  useDeferredValue,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import MonacoEditor, { monaco } from "react-monaco-editor";
import { Tools } from "./Tools";

export interface EditorRef {
  validate: () => boolean;
  getValue: () => string | undefined;
}

/** @internal */
export interface EditorProps extends ElementProps {
  editorRef?: Ref<EditorRef>;
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
  editorRef: ref,
  value,
  hideToolbar,
  isLoading,
  isReadonly = false,
  language = "json",
  onChange,
}) => {
  const [editorRef, setEditorRef] = useState<MonacoEditor>();

  useImperativeHandle(
    ref,
    () => ({
      getValue() {
        return editorRef?.editor?.getValue();
      },
      validate() {
        const model = editorRef?.editor?.getModel();
        if (model) {
          const markers = monaco.editor.getModelMarkers(model as AnyObject);
          return markers.length === 0;
        }
        return true;
      },
    }),
    [editorRef]
  );

  /******************* watch theme change *******************/
  const [theme, setTheme] = useState("light");
  useLayoutEffect(() => {
    const [r, g, b]: [number, number, number] = getComputedStyle(
      document.documentElement
    ).backgroundColor.match(/\d?\d?\d/g) as AnyObject;
    setTheme(r < 100 && g < 100 && b < 100 ? "vs-dark" : "light");
  });

  /******************* watch editor container resize *******************/
  const resizeHandler = useCallback(
    (size: AnyObject) => editorRef?.editor?.layout(size),
    [editorRef]
  );
  const containerRef = useResizeObserver(resizeHandler);

  /******************* defer value and pass to editor as defaultValue *******************/
  const deferredValue = useDeferredValue(value);
  const codeValue = useMemo(
    () =>
      isString(deferredValue)
        ? deferredValue
        : JSON.stringify(deferredValue, null, 4),
    [deferredValue]
  );

  const handleChange = useDebounce(onChange);

  return (
    <AxSection isLoading={isLoading}>
      {!hideToolbar && <Tools editor={editorRef?.editor} />}
      <AxSection ref={containerRef} className="ax-editor">
        <MonacoEditor
          ref={(e) => setEditorRef(e as AnyObject)}
          defaultValue={codeValue}
          language={language}
          onChange={handleChange}
          theme={theme}
          options={{ wordWrap: "on", readOnly: isReadonly }}
        />
      </AxSection>
    </AxSection>
  );
};
