/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { compareValues } from "@axux/utilities";
import { InternalNode, TreeNodeType } from "./types";

const sorter = (a: KeyValue, b: KeyValue) => {
  if (!!a.isLeaf !== !!b.isLeaf) return !!a.isLeaf ? 1 : -1;
  return compareValues(a.label, b.label);
};
export const refactorNode = ({
  node: { children, ...node },
  index = 0,
  isLast = false,
  parent = "",
  level = 0,
  lines = [],
  ...rest
}: KeyValue): InternalNode => {
  const internalId = `${parent}.${index}`;
  const innerChildren = children ?? [];
  const newLines = [...lines, isLast ? 0 : 1];
  return {
    internalId,
    parent,
    node,
    level,
    ...rest,
    lines: newLines,
    isLeaf: !!node.isLeaf,
    isSelected: false,
    isOpen: false,
    isChecked: 0,
    children: innerChildren
      .sort(sorter)
      .map((child: InternalNode, idx: number) =>
        refactorNode({
          node: child,
          index: idx,
          lines: newLines,
          isLast: idx + 1 === innerChildren.length,
          parent: internalId,
          level: level + 1,
        })
      ),
  };
};
export const refactorTreeData = (nodes: TreeNodeType[]): InternalNode[] => {
  return nodes
    .sort(sorter)
    .map((node, index) =>
      refactorNode({ node, index, isLast: index + 1 === nodes.length })
    );
};

export const createTreeMap = (nodes: InternalNode[]) => {
  const map: KeyValue<InternalNode> = {};
  const makeMap = (nodes: InternalNode[]) => {
    nodes.forEach((node) => {
      map[node.internalId] = node;
      node.children && makeMap(node.children);
    });
  };
  makeMap(nodes);
  return map;
};

export const createNodeList = (nodes: InternalNode[]) => {
  const list: InternalNode[] = [];
  nodes.forEach((node) => {
    list.push(node);
    node.isOpen && node.children && list.push(...createNodeList(node.children));
  });
  return list;
};

export const toggleProperty = (
  nodes: InternalNode[],
  prop: keyof InternalNode,
  value: AnyObject
) => {
  nodes.forEach((node) => {
    // @ts-ignore
    if (prop in node) node[prop] = value;
    if (node.children) toggleProperty(node.children, prop, value);
  });
};
