/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider, AxHeader } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { monaco } from "react-monaco-editor";

export const Tools: FC<{
  editor?: monaco.editor.IStandaloneCodeEditor;
}> = ({ editor }) => {
  const { t } = useTranslation("data");

  const foldAll = useCallback(() => {
    if (editor) {
      editor.trigger("fold", "editor.foldLevel2", null);
    }
  }, [editor]);
  const unfoldAll = useCallback(() => {
    if (editor) {
      editor.trigger("unfold", "editor.unfoldAll", null);
    }
  }, [editor]);
  const search = useCallback(() => {
    if (editor) {
      editor.trigger("find", "actions.find", null);
    }
  }, [editor]);
  const commandPalette = useCallback(() => {
    if (editor) {
      editor.focus();
      editor.trigger("quickCommand", "editor.action.quickCommand", null);
    }
  }, [editor]);

  return (
    <AxHeader>
      <div className="flex-1"/>
      <AxButton.Group>
        <AxButton
          style="link"
          onClick={search}
          tooltip={t("action.find")}
          icon={AppIcons.iconSearch}
        />
        <AxDivider size="xs" />
        <AxButton
          style="link"
          onClick={foldAll}
          tooltip={t("action.collapseAll")}
          icon={AppIcons.iconCollapseAll}
        />
        <AxButton
          style="link"
          onClick={unfoldAll}
          tooltip={t("action.expandAll")}
          icon={AppIcons.iconExpandAll}
        />
        <AxDivider size="xs" />
        <AxButton
          style="link"
          onClick={commandPalette}
          tooltip={t("action.showShortcuts")}
          icon={AppIcons.iconQuestion}
        />
      </AxButton.Group>
    </AxHeader>
  );
};
