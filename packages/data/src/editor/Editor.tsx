/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  AxSection,
  useDebounce,
  useIsDark,
  useResizeObserver,
} from "@axux/core";
import { type ElementProps } from "@axux/core/dist/types";
import { isString } from "@axux/utilities";
import MonacoEditor, { type Monaco } from "@monaco-editor/react";
import {
  useCallback,
  useDeferredValue,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useState,
  type FC,
  type Ref,
} from "react";
import { Tools } from "./Tools";
import { useSuggestions, type SuggestionItem } from "./suggestionHook";

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

  suggestions?: SuggestionItem[];
}

export const AxEditor: FC<EditorProps> = ({
  editorRef: ref,
  value,
  hideToolbar,
  isLoading,
  isReadonly = false,
  language = "json",
  suggestions = [],
  onChange,
}) => {
  const [editorRef, setEditorRef] = useState<AnyObject>();
  const [monacoRef, setMonacoRef] = useState<Monaco>();
  const isDark = useIsDark();

  useSuggestions(monacoRef, language, suggestions);

  useImperativeHandle(
    ref,
    () => ({
      getValue() {
        return editorRef?.editor?.getValue();
      },
      validate() {
        const model = editorRef?.editor?.getModel();
        if (model) {
          const markers = editorRef?.editor.getModelMarkers(model);
          return markers?.length === 0;
        }
        return true;
      },
    }),
    [editorRef]
  );

  /** ***************** watch theme change *******************/
  const [theme, setTheme] = useState("");
  useLayoutEffect(() => {
    editorRef && setTheme(isDark ? "vs-dark" : "light");
  }, [isDark, editorRef]);

  /** ***************** watch editor container resize *******************/
  const resizeHandler = useCallback(
    (size: AnyObject) => editorRef?.editor?.layout(size),
    [editorRef]
  );
  const containerRef = useResizeObserver(resizeHandler);

  /** ***************** defer value and pass to editor as defaultValue *******************/
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
      {!hideToolbar && <Tools editor={editorRef} />}
      <AxSection ref={containerRef} className="ax-editor">
        <MonacoEditor
          onMount={(e, m) => (!!e && setEditorRef(e), !!m && setMonacoRef(m))}
          value={codeValue}
          language={language}
          onChange={handleChange}
          theme={theme}
          options={{ wordWrap: "on", readOnly: isReadonly }}
        />
      </AxSection>
    </AxSection>
  );
};
