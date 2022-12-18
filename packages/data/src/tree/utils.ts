/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { compareValues } from "@axux/utilities";
import { InternalNode, TreeNodeType, TreeState } from "./types";

const sorter = (a: TreeNodeType, b: TreeNodeType) => {
  if (!!a.isLeaf !== !!b.isLeaf) return a.isLeaf ? 1 : -1;
  return compareValues()(a.label, b.label);
};
export const refactorNode = ({
  node: { children, ...node },
  index = 0,
  isLast = false,
  parent = "",
  level = 0,
  lines = [],
  ...rest
}: KeyValue & {
  level?: number;
  parent?: string;
  index?: number;
}): InternalNode => {
  const internalId = `${parent}.${index}`;
  const innerChildren = children;
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
    childSelected: false,
    isOpen: !!node.isOpen,
    isChecked: 0,
    children: innerChildren
      ?.sort(sorter)
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
export const refactorChildren = (
  parent: InternalNode,
  children: TreeNodeType[]
) => {
  parent.children = children
    .sort(sorter)
    .map((child: TreeNodeType, idx: number) =>
      refactorNode({
        node: child,
        index: idx,
        lines: parent.lines,
        isLast: idx + 1 === children.length,
        parent: parent.internalId,
        level: parent.level + 1,
      })
    );
};

export const createTreeMap = (nodes: InternalNode[]) => {
  const map: Map<string, InternalNode> = new Map();
  const makeMap = (nodes: InternalNode[]) => {
    nodes.forEach((node) => {
      map.set(node.internalId, node);
      node.children != null && makeMap(node.children);
    });
  };
  makeMap(nodes);
  return map;
};

export const createIdMap = (nodes: InternalNode[]) => {
  const map: Map<string, string> = new Map();
  const makeMap = (nodes: InternalNode[]) => {
    nodes.forEach((node) => {
      node.node.id && map.set(node.node.id, node.internalId);
      node.children != null && makeMap(node.children);
    });
  };
  makeMap(nodes);
  return map;
};

export const createNodeList = (nodes: InternalNode[]) => {
  const list: InternalNode[] = [];
  nodes.forEach((node) => {
    node.isFiltered !== false && list.push(node);
    if (node.isOpen || node.isFiltered === true) {
      if (node.children != null && node.children.length > 0) {
        list.push(...createNodeList(node.children));
      } else if (node.isFiltered === undefined && !node.isLeaf) {
        list.push(
          refactorNode({
            node: { isLeaf: true },
            index: 0,
            isLast: true,
            isEmpty: true,
            isLoading: node.isLoading,
            isError: node.isError,
            lines: node.lines,
            parent: node.internalId,
            level: node.level + 1,
          })
        );
      }
    }
  });
  return list;
};

export const createChildItems = (parent: InternalNode) => {
  if (parent.children != null && parent.children?.length > 0) {
    return createNodeList(parent.children);
  } else {
    return [
      refactorNode({
        node: { isLeaf: true },
        index: 0,
        isLast: true,
        isEmpty: true,
        isLoading: parent.isLoading,
        isError: parent.isError,
        lines: parent.lines,
        parent: parent.internalId,
        level: parent.level + 1,
      }),
    ];
  }
};

export const toggleProperty = (
  nodes: InternalNode[],
  prop: keyof InternalNode,
  value: AnyObject,
  checkChildren = false
) => {
  nodes.forEach((node) => {
    if (
      prop in node &&
      // @ts-expect-error
      (!checkChildren || (checkChildren && node.children?.length > 0))
    )
      // @ts-expect-error
      node[prop] = value;
    if (node.children != null)
      toggleProperty(node.children, prop, value, checkChildren);
  });
};

export const getNodeById = (state: TreeState, id?: string) => {
  return state.treeMap.get(state.idMap.get(id ?? "") ?? "");
};
