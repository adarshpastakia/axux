// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxDivider, AxToolbar } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { useCallback, VFC } from "react";
import { useTranslation } from "react-i18next";
import { monaco } from "react-monaco-editor";

export const CodeEditorTools: VFC<{ editor?: monaco.editor.IStandaloneCodeEditor }> = ({
  editor
}) => {
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

  return (
    <AxToolbar align="end">
      <AxButton
        size="sm"
        type="link"
        onClick={search}
        tooltip={t("action.find")}
        icon={AppIcons.iconSearch}
      />
      <AxDivider />
      <AxButton
        size="sm"
        type="link"
        onClick={foldAll}
        tooltip={t("action.collapseAll")}
        icon={AppIcons.iconCollapseAll}
      />
      <AxButton
        size="sm"
        type="link"
        onClick={unfoldAll}
        tooltip={t("action.expandAll")}
        icon={AppIcons.iconExpandAll}
      />
      <AxDivider />
      <AxButton
        size="sm"
        type="link"
        color="info"
        tooltip={t("action.showShortcuts")}
        icon={AppIcons.iconQuestion}
      />
    </AxToolbar>
  );
};
