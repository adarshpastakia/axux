// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxField } from "@axux/form";
import { isNil } from "@axux/utilities";
import { Fragment, useCallback, useEffect, useState, VFC } from "react";
import { useTranslation } from "react-i18next";
import { TreeNode } from "./TreeNode";
import { InternalNode, TreeNode as TreeNodeType, TreePanelProps } from "./types";

/** @internal */
const refactorNodes = (nodes?: TreeNodeType[], parent = "", level = 0): InternalNode[] => {
  if (isNil(nodes)) {
    return undefined as AnyObject;
  }
  return nodes.map<InternalNode>(({ children, ...node }) => ({
    ...node,
    children: refactorNodes(children, `${parent}${!!parent ? "|" : ""}${node.id}`, level + 1),
    isChecked: false,
    isSelected: false,
    parent,
    level
  }));
};

/** @internal */
const mapNodes = (nodes: InternalNode[]) => {
  let list: KeyValue<InternalNode> = {};
  nodes.forEach((node) => {
    list[node.id] = node;
    if (!isNil(node.children)) list = { ...list, ...mapNodes(node.children) };
  });
  return list;
};

/** @internal */
const toggleNode = (node: InternalNode, isChecked = false) => {
  node.isChecked = isChecked;
  if (node.children) node.children.forEach((n) => toggleNode(n, isChecked));
};

/**
 * Tree panel
 * @param data
 * @param tools
 * @param maxNodes
 * @param onChange
 * @param sort
 * @param onSelect
 * @param isSearchable
 * @param isCheckable
 * @param checkLevel
 * @constructor
 * @internal
 * TODO: add search functionality
 */
export const AxTreePanel: VFC<TreePanelProps> = ({
  data,
  tools,
  maxNodes,
  onChange,
  sort,
  onSelect,
  isSearchable,
  isCheckable,
  checkLevel = 0
}) => {
  const { t } = useTranslation("data");
  const [canExpand, setCanExpand] = useState(true);
  const [nodes, setNodes] = useState<InternalNode[]>([]);
  const [nodeMap, setNodeMap] = useState<KeyValue<InternalNode>>({});

  useEffect(() => {
    const nodeList = refactorNodes(data);
    const nodeMap = mapNodes(nodeList);
    setCanExpand(Object.values(nodeMap).some((node) => node.level > 0));
    setNodeMap(nodeMap);
    setNodes(nodeList);
  }, [data]);

  const fireSelect = useCallback(() => {
    const nodes = Object.values(nodeMap);
    onChange &&
      onChange(
        nodes.filter((node) => node.isLeaf && node.isChecked === true).map((node) => node.id)
      );
  }, [nodeMap, onChange]);

  const handleClick = useCallback(
    (id: string, el = "node") => {
      const node = nodeMap[id];
      if (node) {
        const canCheck = isCheckable && node.level >= checkLevel;
        if (node.isLeaf) {
          if (!isCheckable) {
            const previous = Object.values(nodeMap).find((node) => node.isSelected);
            if (previous) previous.isSelected = false;
            node.isSelected = true;
            onSelect && onSelect(id);
          }
        } else if (!canCheck || el === "toggle") {
          node.isOpen = !node.isOpen;
        }

        if (canCheck && el !== "toggle") {
          toggleNode(node, node.isChecked === 2 ? true : !node.isChecked);
          if (node.parent) {
            node.parent.split("|").forEach((id) => {
              const parent = nodeMap[id];
              if (parent) {
                parent.isChecked = (parent.children ?? []).some(
                  (n) => n.isChecked !== node.isChecked
                )
                  ? 2
                  : node.isChecked;
              }
            });
          }
          fireSelect();
        }
      }
      setNodes([...nodes]);
    },
    [nodeMap, nodes, isCheckable, checkLevel, onSelect, fireSelect]
  );

  const toggleAll = useCallback(
    (b: boolean) => {
      Object.values(nodeMap).forEach((node) => !node.isDisabled && (node.isChecked = b));
      fireSelect();
      setNodes([...nodes]);
    },
    [fireSelect, nodeMap, nodes]
  );

  const openAll = useCallback(
    (b: boolean) => {
      Object.values(nodeMap).forEach((node) => !node.isDisabled && (node.isOpen = b));
      setNodes([...nodes]);
    },
    [nodeMap, nodes]
  );

  return (
    <div className="ax-tree__panel">
      {isSearchable && <AxField.Search />}
      <div className="ax-tree__tools ax-bg--lightest">
        <div>
          {isCheckable && (
            <Fragment>
              <AxButton
                type="link"
                color="secondary"
                icon={AppIcons.iconCheckAll}
                tooltip={t("action.checkAll")}
                onClick={() => toggleAll(true)}
              />
              <AxButton
                type="link"
                color="secondary"
                icon={AppIcons.iconCheckboxOff}
                tooltip={t("action.uncheckAll")}
                onClick={() => toggleAll(false)}
              />
              <span className="ax-color--light">|</span>
            </Fragment>
          )}
          {canExpand && (
            <Fragment>
              <AxButton
                type="link"
                color="secondary"
                icon={AppIcons.iconExpandAll}
                tooltip={t("action.expandAll")}
                onClick={() => openAll(true)}
              />
              <AxButton
                type="link"
                color="secondary"
                icon={AppIcons.iconCollapseAll}
                tooltip={t("action.collapseAll")}
                onClick={() => openAll(false)}
              />
            </Fragment>
          )}
        </div>
        <div>{tools}</div>
      </div>
      <div className="ax-tree__body">
        <TreeNode
          key="root"
          node={
            {
              children: nodes,
              isOpen: true
            } as AnyObject
          }
          isRoot
          sort={sort}
          maxNodes={maxNodes}
          onClick={handleClick}
          isCheckable={isCheckable}
          checkLevel={checkLevel}
        />
      </div>
    </div>
  );
};
