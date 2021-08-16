// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxField } from "@axux/form";
import { isNil } from "@axux/utilities";
import { Fragment, useCallback, useEffect, useState, VFC } from "react";
import { InternalNode, TreeNode as TreeNodeType, TreePanelProps } from "./Tree";
import { TreeNode } from "./TreeNode";

/** @internal */
const nodeSort = (a: KeyValue, b: KeyValue) => {
  if (a.isLeaf !== b.isLeaf) {
    return a.isLeaf ? 1 : -1;
  }
  return a.label.toString().toLowerCase().localeCompare(b.label.toString().toLowerCase());
};

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
 * @param maxNodes
 * @param onChange
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
  onSelect,
  isSearchable,
  isCheckable,
  checkLevel = 0
}) => {
  const [nodes, setNodes] = useState<InternalNode[]>([]);
  const [nodeMap, setNodeMap] = useState<KeyValue<InternalNode>>({});

  useEffect(() => {
    const nodeList = refactorNodes(data);
    setNodeMap(mapNodes(nodeList));
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
      Object.values(nodeMap).forEach((node) => (node.isChecked = b));
      fireSelect();
      setNodes([...nodes]);
    },
    [fireSelect, nodeMap, nodes]
  );

  const openAll = useCallback(
    (b: boolean) => {
      Object.values(nodeMap).forEach((node) => (node.isOpen = b));
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
                tooltip="Check All"
                onClick={() => toggleAll(true)}
              />
              <AxButton
                type="link"
                color="secondary"
                icon={AppIcons.iconCheckboxOff}
                tooltip="Uncheck All"
                onClick={() => toggleAll(false)}
              />
              <span className="ax-color--light">|</span>
            </Fragment>
          )}
          <AxButton
            type="link"
            color="secondary"
            icon={AppIcons.iconExpandAll}
            tooltip="Expand All"
            onClick={() => openAll(true)}
          />
          <AxButton
            type="link"
            color="secondary"
            icon={AppIcons.iconCollapseAll}
            tooltip="Collapse All"
            onClick={() => openAll(false)}
          />
        </div>
        <div>{tools}</div>
      </div>
      <div className="ax-tree__body">
        {nodes.sort(nodeSort).map((node) => (
          <TreeNode
            key={node.id}
            node={node}
            maxNodes={maxNodes}
            onClick={handleClick}
            isCheckable={isCheckable}
            checkLevel={checkLevel}
          />
        ))}
      </div>
    </div>
  );
};
