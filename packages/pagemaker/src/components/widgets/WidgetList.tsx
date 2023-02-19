// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2020
// @license   : MIT

import { AxTreePanel, TreeNode } from "@axux/data";
import { groupBy } from "@axux/utilities";
import { FC, memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { EnumTypes } from "../..";
import {
  iconDivider,
  iconGrid,
  iconImage,
  iconPageBreak,
  iconParagraph,
  iconText,
  iconVDivider,
  iconWidget,
} from "../../utils/icons";
import { IWidgetObject } from "../../utils/types";
import { usePageContext } from "../context";

const makeTreeNode = (
  id: string,
  icon: string,
  label: string,
  onDrag: AnyObject
) =>
  ({
    id,
    icon,
    label,
    isLeaf: true,
    labelClassName: "text-slate-700 dark:text-slate-200",
    props: {
      draggable: true,
      onDragStart: onDrag,
    },
  } as TreeNode);

export const WidgetList: FC = memo(() => {
  const { t } = useTranslation("pagemaker");
  const { widgets, artifacts, setDragging } = usePageContext();

  const [list, setList] = useState<TreeNode[]>([]);

  useEffect(() => {
    const treeList: TreeNode[] = [
      {
        id: "default",
        label: t("label.default"),
        isLeaf: false,
        isOpen: true,
        labelClassName: "font-medium",
        children: [
          makeTreeNode(EnumTypes.HEADING, iconText, t("label.heading"), () =>
            setDragging({ type: EnumTypes.HEADING })
          ),
          makeTreeNode(
            EnumTypes.PARAGRAPH,
            iconParagraph,
            t("label.paragraph"),
            () => setDragging({ type: EnumTypes.PARAGRAPH })
          ),
          makeTreeNode(EnumTypes.IMAGE, iconImage, t("label.image"), () =>
            setDragging({ type: EnumTypes.IMAGE })
          ),
          makeTreeNode(
            EnumTypes.BREAK,
            iconPageBreak,
            t("label.pageBreak"),
            () => setDragging({ type: EnumTypes.BREAK })
          ),
          makeTreeNode(EnumTypes.DIVIDER, iconDivider, t("label.divider"), () =>
            setDragging({ type: EnumTypes.DIVIDER })
          ),
          makeTreeNode(
            EnumTypes.VDIVIDER,
            iconVDivider,
            t("label.divider"),
            () => setDragging({ type: EnumTypes.VDIVIDER })
          ),
          makeTreeNode(EnumTypes.GRID, iconGrid, t("label.grid"), () =>
            setDragging({ type: EnumTypes.GRID })
          ),
        ],
      },
    ];
    if (artifacts.length > 0) {
      treeList.push({
        id: "artifacts",
        label: t("label.artifacts"),
        isLeaf: false,
        labelClassName: "font-medium",
        children: artifacts.map(({ id, title, config }) =>
          makeTreeNode(id, "", title, () =>
            setDragging({ config, title, type: config.type })
          )
        ),
      });
    }
    if (widgets.length > 0) {
      const grouped = groupBy<IWidgetObject>(
        widgets,
        "group",
        t("label.widgets")
      );
      Object.entries(grouped).forEach(([group, items]) => {
        treeList.push({
          id: group,
          label: group,
          isLeaf: false,
          labelClassName: "font-medium",
          children: items.map(({ id, group, ...item }) =>
            makeTreeNode(id, item.icon ?? iconWidget, item.title, () =>
              setDragging({ type: EnumTypes.TILE, widgetId: id, ...item })
            )
          ),
        });
      });
    }
    setList(treeList);
  }, [widgets]);

  return <AxTreePanel data={list} isSearchable isSortable={false} />;
});
WidgetList.displayName = "AxPageMaker.WidgetList";
