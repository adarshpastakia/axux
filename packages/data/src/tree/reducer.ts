/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { TreeState } from "./types";
import { createNodeList, refactorNode, toggleProperty } from "./utils";

export const toggleExpand = (
  state: TreeState,
  index: number,
  canLoad: boolean
) => {
  const parent = state.items[index];
  parent.isOpen = !parent.isOpen;
  if (!parent.isOpen) {
    state.items = state.items.filter(
      (item) =>
        !(
          item.internalId !== parent.internalId &&
          item.internalId.startsWith(parent.internalId)
        )
    );
  } else if (parent.children && parent.children?.length > 0) {
    state.items.splice(index + 1, 0, ...createNodeList(parent.children));
  } else {
    parent.isLoading = canLoad;
    state.items.splice(
      index + 1,
      0,
      refactorNode({
        node: { isLeaf: true },
        index: 0,
        isLast: true,
        isEmpty: true,
        isLoading: canLoad,
        isError: parent.isError,
        lines: parent.lines,
        parent: parent.internalId,
        level: parent.level + 1,
      })
    );
  }
  return { ...state };
};

export const toggleCheck = (state: TreeState, id?: string) => {
  const node = state.treeMap.get(state.idMap.get(id ?? "") ?? "");
  if (node) {
    node.isChecked = node.isChecked === 0 ? 1 : 0;
    node.children && toggleProperty(node.children, "isChecked", node.isChecked);
    let parent = state.treeMap.get(node.parent!);
    const parentCheck = parent?.children?.some(
      (n) => n.isChecked !== node.isChecked
    )
      ? 2
      : node.isChecked;
    while (parent) {
      parent.isChecked = parentCheck;
      parent = state.treeMap.get(parent.parent!);
    }
  }
  return { ...state };
};

export const toggleSelect = (state: TreeState, id?: string, scroll = false) => {
  const node = state.treeMap.get(state.idMap.get(id ?? "") ?? "");
  if (node) {
    Array.from(state.treeMap.values()).forEach((n) => {
      n.isSelected = false;
      n.childSelected = false;
    });
    node.isSelected = true;
    let parent = state.treeMap.get(node.parent!);
    while (parent) {
      parent.isOpen = true;
      parent.childSelected = true;
      parent = state.treeMap.get(parent.parent ?? "");
    }
    state.items = createNodeList(state.treeData);
    state.autoScroll = scroll;
  }
  return { ...state };
};
