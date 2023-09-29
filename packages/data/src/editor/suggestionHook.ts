/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type Monaco } from "@monaco-editor/react";
import { languages } from "monaco-editor";
import { useEffect } from "react";
// type CompletionItemKind = monaco.languages.CompletionItemKind;

export interface SuggestionItem {
  label: string;
  text: string;
  description?: string;
}

export const useSuggestions = (
  monaco?: Monaco,
  language: string = "json",
  suggestions: SuggestionItem[] = []
) => {
  const registerSuggestions = (suggestions: SuggestionItem[]) => {
    return monaco?.languages.registerCompletionItemProvider(language, {
      triggerCharacters: [],
      provideCompletionItems: (model, position) => {
        return {
          suggestions: suggestions.map((item) => ({
            insertText: item.text,
            label: item.label,
            documentation: item.description,
            kind: languages.CompletionItemKind.Text,
            range: {
              startColumn: position.column - 1,
              startLineNumber: position.lineNumber,
              endColumn: position.column,
              endLineNumber: position.lineNumber,
            },
          })),
        };
      },
    });
  };

  useEffect(() => {
    if (monaco) {
      const instance = registerSuggestions(suggestions);
      return () => {
        instance?.dispose();
      };
    }
  }, [monaco, suggestions]);
  return null;
};
