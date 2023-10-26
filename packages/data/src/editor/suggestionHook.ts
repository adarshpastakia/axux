/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type Monaco } from "@monaco-editor/react";
import { type Position, type editor, type languages } from "monaco-editor";
import { useEffect } from "react";
// type CompletionItemKind = monaco.languages.CompletionItemKind;

export interface SuggestionItem {
  label: string;
  text: string;
  description?: string;
  children?: SuggestionItem[];
}

export const createSuggestion = (
  instance: Monaco,
  suggestion: SuggestionItem,
  hasBracket: number,
  hasClosingBracket: number,
  hasParent = false
) => {
  const showSuggest = suggestion.children?.length;
  let insertBrackets = false;

  let insertText = suggestion.text;
  if (showSuggest) {
    insertText = `${suggestion.text}.`;
    insertBrackets = !hasParent;
  } else {
    if (hasParent) {
      insertText = `${suggestion.text}`;
    } else {
      insertText = `${suggestion.text}`;
      insertBrackets = true;
    }
  }

  if (insertBrackets) {
    const bracks = hasBracket === 2 ? "" : hasBracket === 1 ? "{" : "{{";
    const brackClose =
      hasClosingBracket === 2 ? "" : hasClosingBracket === 1 ? "}" : "}}";
    insertText = `${bracks}${insertText}${brackClose}`;
  }

  return {
    label: suggestion.label,
    kind: instance.languages.CompletionItemKind.Variable,
    detail: suggestion.description,
    insertText,
    ...(showSuggest
      ? {
          command: {
            id: "editor.action.triggerSuggest",
          },
        }
      : {}),
    range: null as any,
  } as languages.CompletionItem;
};

export const buildSuggestions = (
  instance: Monaco,
  suggestions: SuggestionItem[],
  model: editor.ITextModel,
  position: Position
) => {
  let results: SuggestionItem[] = [];
  let hasParent = false;

  const prevChar = model.getValueInRange({
    startColumn: position.column - 2,
    startLineNumber: position.lineNumber,
    endColumn: position.column,
    endLineNumber: position.lineNumber,
  });
  const nextChar = model.getValueInRange({
    startColumn: position.column,
    startLineNumber: position.lineNumber,
    endColumn: position.column + 2,
    endLineNumber: position.lineNumber,
  });
  const hasBracket = prevChar.match(/\{+/)?.shift()?.length ?? 0;
  const hasClosingBracket = nextChar.match(/\{+/)?.shift()?.length ?? 0;

  if (hasBracket === 1) return [];

  const word = model.getWordUntilPosition(position);
  let text = word.word;

  const prev = model.findPreviousMatch(
    "{",
    {
      lineNumber: 0,
      column: 0,
    },
    false,
    false,
    null,
    true
  );

  if (prev) {
    text = model.getValueInRange({
      ...prev.range,
      endColumn: position.column,
    });
  }

  text = text.replace("{", "").trim();

  if (text.length === 0) {
    results = suggestions;
  } else {
    const splits = text.split(".").filter((s) => s.trim() !== "");

    // fo => handled below...
    // foo.ba => foo.children.includes(split)
    // foo.bar. => bar.children
    // foo.bar.b => bar.children.includes(split)
    // foo.bar.baz => []
    if (splits.length) {
      hasParent = true;

      let i = 0;
      let children = suggestions;
      const dotEnd = text[text.length - 1] === ".";

      for (const split of splits) {
        const found = children.find((c) => c.text === split);
        const isLast = splits.length - 1 === i++;

        if (dotEnd) {
          if (found?.children?.length) {
            children = found.children;

            if (isLast) {
              results = children;
            }
          }
        } else {
          if (found) {
            if (isLast) {
              children = children.filter((s) => s.text.includes(text));
            } else if (found.children) {
              children = found.children;
            }
          }
        }
      }

      results = children;
    } else {
      results = suggestions.filter((s) => s.text.includes(text));
    }
  }

  return results.map((s) =>
    createSuggestion(instance, s, hasBracket, hasClosingBracket, hasParent)
  );
};

export const useSuggestions = (
  monaco?: Monaco,
  language: string = "json",
  suggestions: SuggestionItem[] = []
) => {
  const registerSuggestions = (suggestions: SuggestionItem[]) => {
    return monaco?.languages.registerCompletionItemProvider(language, {
      triggerCharacters: ["{"],
      provideCompletionItems: (model, position) => {
        const suggestionsList = buildSuggestions(
          monaco,
          suggestions,
          model,
          position
        );

        return {
          suggestions: suggestionsList,
        } as languages.ProviderResult<languages.CompletionList>;
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
  }, [monaco, language, suggestions]);
  return null;
};
