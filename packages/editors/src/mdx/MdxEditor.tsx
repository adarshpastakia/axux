/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  AxButton,
  AxContent,
  AxHeader,
  AxSection,
  useIsDark,
} from "@axux/core";
import {
  AdmonitionDirectiveDescriptor,
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  ChangeAdmonitionType,
  ChangeCodeMirrorLanguage,
  CodeMirrorEditor,
  CodeToggle,
  ConditionalContents,
  CreateLink,
  InsertAdmonition,
  InsertCodeBlock,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  MDXEditor,
  Separator,
  UndoRedo,
  codeBlockPlugin,
  codeMirrorPlugin,
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
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  type FC,
} from "react";
import { AxMdx } from "./Mdx";

export interface MdxEditorProps {
  /**
   * code string
   */
  value?: string;
  /**
   * onChange callback
   */
  onChange?: (value: string) => void;
}

export const AxMdxEditor: FC<MdxEditorProps> = ({
  value: _value,
  onChange,
}) => {
  const isDark = useIsDark();
  const [showPreview, setShowPreview] = useState(false);
  const [actualValue, setActualValue] = useState(_value);
  const value = useDeferredValue(_value);
  useEffect(() => {
    setActualValue(value ?? "");
  }, [value]);

  const handleChange = useCallback(
    (val: string) => {
      setActualValue(val.replaceAll("\\:", ":"));
      onChange?.(val.replaceAll("\\:", ":"));
    },
    [onChange]
  );

  return showPreview ? (
    <AxSection>
      <AxHeader className="py-1 px-2">
        <div className="flex-1" />
        <AxButton
          icon="mdi mdi-close"
          className="self-center"
          onClick={() => setShowPreview(false)}
          variant="link"
          size="sm"
        />
      </AxHeader>
      <AxContent>
        <AxMdx text={actualValue ?? ""} />
      </AxContent>
    </AxSection>
  ) : (
    <MDXEditor
      className={`mdx-editor ${isDark ? "dark-theme" : "light-theme"}`}
      markdown={actualValue ?? ""}
      onChange={handleChange}
      contentEditableClassName="markdown-body"
      plugins={[
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        linkPlugin(),
        codeBlockPlugin(),
        linkDialogPlugin(),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            ts: "TypeScript",
            tsx: "TypeScript (React)",
            jsx: "JavaScript (React)",
            css: "CSS",
            html: "HTML",
            bash: "Bash",
            json: "JSON",
            yaml: "YAML",
          },
        }),
        codeBlockPlugin({
          defaultCodeBlockLanguage: "js",
          codeBlockEditorDescriptors: [
            {
              match: () => true,
              priority: 0,
              Editor: CodeMirrorEditor,
            },
          ],
        }),
        directivesPlugin({
          directiveDescriptors: [AdmonitionDirectiveDescriptor],
        }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <ConditionalContents
                options={[
                  {
                    when: (editor) => editor?.editorType === "codeblock",
                    contents: () => <ChangeCodeMirrorLanguage />,
                  },
                  {
                    fallback: () => (
                      <>
                        <UndoRedo />
                        <Separator />
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <Separator />
                        <ListsToggle />
                        <Separator />
                        <BlockTypeSelect />
                        <Separator />
                        <CreateLink />
                        <InsertTable />
                        <InsertThematicBreak />
                        <Separator />
                        <InsertCodeBlock />
                        <ConditionalContents
                          options={[
                            {
                              when: (editor) =>
                                editor?.rootNode?.getType() === "directive" &&
                                [
                                  "note",
                                  "tip",
                                  "info",
                                  "danger",
                                  "caution",
                                ].includes(
                                  // @ts-expect-error ignore
                                  editor.rootNode?.getMdastNode?.().name
                                ),
                              contents: () => <ChangeAdmonitionType />,
                            },
                            {
                              fallback: () => <InsertAdmonition />,
                            },
                          ]}
                        />
                      </>
                    ),
                  },
                ]}
              />
              <AxButton
                icon="mdi mdi-eye"
                className="m-0 self-center"
                onClick={() => setShowPreview(true)}
                variant="link"
                size="sm"
              />
            </>
          ),
        }),
      ]}
    />
  );
};
