/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider, AxHeader } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { type FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

export const Tools: FC<{
  editor?: AnyObject;
}> = ({ editor }) => {
  const { t } = useTranslation("data");

  const foldAll = useCallback(() => {
    if (editor) {
      editor.getAction("editor.foldLevel2")?.run();
    }
  }, [editor]);
  const unfoldAll = useCallback(() => {
    if (editor) {
      editor.getAction("editor.unfoldAll")?.run();
    }
  }, [editor]);
  const search = useCallback(() => {
    if (editor) {
      editor.getAction("actions.find")?.run();
    }
  }, [editor]);
  const commandPalette = useCallback(() => {
    if (editor) {
      editor.focus();
      editor.getAction("editor.action.quickCommand")?.run();
    }
  }, [editor]);

  return (
    <AxHeader>
      <div className="flex-1" />
      <AxButton.Group variant="flat">
        <AxButton
          size="sm"
          variant="link"
          onClick={search}
          tooltip={t("action.find")}
          icon={AppIcons.iconSearch}
        />
        <AxDivider size="xs" />
        <AxButton
          size="sm"
          variant="link"
          onClick={foldAll}
          tooltip={t("action.collapseAll")}
          icon={AppIcons.iconCollapseAll}
        />
        <AxButton
          size="sm"
          variant="link"
          onClick={unfoldAll}
          tooltip={t("action.expandAll")}
          icon={AppIcons.iconExpandAll}
        />
        <AxDivider size="xs" />
        <AxButton
          size="sm"
          variant="link"
          onClick={commandPalette}
          tooltip={t("action.showShortcuts")}
          icon={AppIcons.iconQuestion}
        />
      </AxButton.Group>
    </AxHeader>
  );
};
