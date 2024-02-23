/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2024
 * @license   : MIT
 */
import { AxDivider, AxMenu } from "@axux/core";
import { Fragment, useCallback, useMemo } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { useGraphInternal } from "../context/GraphContext";
import { GraphIcons } from "../types/icons";

const ContextMenuComponent = ({ item, custom }: AnyObject) => {
  const { t } = useTranslation("graph");
  const { graph, handleExpand, renderDetail } = useGraphInternal();

  const items = useMemo(() => {
    const menu: KeyValue[][] = [];
    if (item.type === "edge") {
      menu.push([
        {
          id: "neighbors",
          label: "action.neighbors",
        },
      ]);
    }
    if (item.type === "node") {
      const selectMenu = [];
      const deleteMenu = [];
      selectMenu.push({
        id: "neighbors",
        label: "action.neighbors",
      });
      // if (graph.selectedItems.length > 1) {
      //   selectMenu.push({
      //     id: "group",
      //     label: "action.group",
      //   });
      // }
      selectMenu.push({
        id: "expand",
        icon: GraphIcons.toolExpand,
        label: "action.expand",
      });
      if (graph.selectedItems.length === 2) {
        selectMenu.push({
          id: "hilight",
          icon: GraphIcons.toolHilight,
          label: "action.hilight",
        });
      }
      deleteMenu.push({
        id: "delete",
        className: "text-danger",
        icon: GraphIcons.toolDelete,
        label: "action.delete",
      });
      menu.push(selectMenu, deleteMenu);
    }
    if (item.type === "canvas") {
      menu.push(
        [
          {
            id: "selectAll",
            label: "action.selectAll",
          },
        ],
        [
          {
            id: "clear",
            className: "text-danger",
            icon: GraphIcons.toolErase,
            label: "action.clear",
          },
        ]
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
      if (id === "toggleDetail") {
        const nodes = graph.selectedItems.map(
          ({ id, data: { type, data, ...rest } }) => ({
            id,
            data: type
              ? data
              : {
                  type: "react-node",
                  data: rest,
                  x: rest.x,
                  y: rest.y,
                  renderDetail,
                },
          })
        );
        const edges = graph.selectedItems
          .map(({ id }) => graph.ref?.getRelatedEdgesData(id))
          .flat()
          .filter(Boolean);
        graph.ref?.removeData(
          "node",
          graph.selectedItems.map(({ id }) => id)
        );
        graph.ref?.addData("node", nodes);
        edges?.length && graph.ref?.addData("edge", edges as AnyObject);
      }
    },
    [graph, handleExpand, renderDetail]
  );

  return (
    <AxMenu className="ax-graph__menu" onClick={handleMenu}>
      {items.map((list, idx) => (
        <Fragment key={idx}>
          {idx > 0 && <AxDivider key={idx} size="xs" />}
          {custom?.[idx]?.map?.((item: KeyValue, cdx: number) => (
            <AxMenu.Item
              key={`${idx}-custom-${cdx}`}
              id={item.id}
              label={item.label}
              icon={item.icon}
              className={item.className}
              isDisabled={item.isDisabled}
              onClick={() => item.handler(graph.selectedItems)}
            />
          ))}
          {list.map((item, jdx) => (
            <AxMenu.Item
              key={`${idx}-${jdx}`}
              id={item.id}
              label={t(item.label, item.label, {})}
              icon={item.icon}
              className={item.className}
            />
          ))}
        </Fragment>
      ))}
    </AxMenu>
  );
};

export const ContextMenu = ({ root, custom, ...item }: AnyObject) => {
  return createPortal(
    <ContextMenuComponent item={item} custom={custom} />,
    root
  );
};
