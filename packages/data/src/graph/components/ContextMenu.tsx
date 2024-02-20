/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */
import { AxDivider, AxMenu } from "@axux/core";
import { isString } from "@axux/utilities";
import { useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

const ContextMenuComponent = ({ item }: AnyObject) => {
  const { t } = useTranslation("graph");
  const { graph, handleExpand } = useGraphInternal();

  const items = useMemo(() => {
    const menu: Array<KeyValue | "-"> = [];
    if (item.type === "edge") {
      menu.push({
        id: "neighbors",
        label: "action.neighbors",
      });
    }
    if (item.type === "node") {
      menu.push({
        id: "neighbors",
        label: "action.neighbors",
      });
      if (graph.selectedItems.length > 1) {
        menu.push({
          id: "group",
          label: "action.group",
        });
      }
      menu.push({
        id: "expand",
        icon: GraphIcons.toolExpand,
        label: "action.expand",
      });
      if (graph.selectedItems.length === 2) {
        menu.push({
          id: "hilight",
          icon: GraphIcons.toolHilight,
          label: "action.hilight",
        });
      }
      menu.push("-", {
        id: "delete",
        className: "text-danger",
        icon: GraphIcons.toolDelete,
        label: "action.delete",
      });
    }
    if (item.type === "canvas") {
      menu.push(
        {
          id: "selectAll",
          label: "action.selectAll",
        },
        "-",
        {
          id: "clear",
          className: "text-danger",
          icon: GraphIcons.toolErase,
          label: "action.clear",
        }
      );
    }
    return menu;
  }, [item, graph.selectedItems]);

  const handleMenu = useCallback(
    (id: string) => {
      if (id === "hilight") {
        graph.hilightPath();
      }
      if (id === "expand") {
        handleExpand(graph.selectedItems);
      }
      if (id === "delete") {
        graph.removeSelected();
      }
      if (id === "clear") {
        graph.ref?.clear();
      }
    },
    [graph, handleExpand]
  );

  return (
    <AxMenu className="ax-graph__menu" onClick={handleMenu}>
      {items.map((item, idx) =>
        isString(item) ? (
          <AxDivider key={idx} size="xs" />
        ) : (
          <AxMenu.Item
            key={idx}
            id={item.id}
            label={t(item.label, item.label, {})}
            icon={item.icon}
            className={item.className}
          />
        )
      )}
    </AxMenu>
  );
};

export const ContextMenu = ({ root, ...item }: AnyObject) => {
  return createPortal(<ContextMenuComponent item={item} />, root);
};
