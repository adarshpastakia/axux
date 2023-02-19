/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isNil } from "@axux/utilities";
import { TreeState } from "./types";
import {
  createNodeList,
  getNodeById,
  refactorNode,
  toggleProperty,
} from "./utils";

export const toggleExpand = (
  state: TreeState,
  id?: string,
  canLoad = false,
  isSortable = true,
  force?: boolean
) => {
  const parent = getNodeById(state, id);
  if (parent) {
    const index = state.items.indexOf(parent);
    parent.isOpen = force ?? !parent.isOpen;
    if (!parent.isOpen) {
      state.items = state.items.filter(
        (item) =>
          !(
            item.internalId !== parent.internalId &&
            item.internalId.startsWith(parent.internalId)
          )
      );
    } else if (!isNil(parent.children)) {
      state.items.splice(
        index + 1,
        0,
        ...createNodeList(parent.children, isSortable)
      );
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
  }
  return { ...state };
};

export const toggleCheck = (state: TreeState, id?: string) => {
  const node = getNodeById(state, id);
  if (node) {
    node.isChecked = node.isChecked === 0 ? 1 : 0;
    node.children != null &&
      toggleProperty(node.children, "isChecked", node.isChecked);
    let parent = state.treeMap.get(node.parent ?? "");
    const parentCheck = parent?.children?.some(
      (n) => n.isChecked !== node.isChecked
    )
      ? 2
      : node.isChecked;
    while (parent != null) {
      parent.isChecked = parentCheck;
      parent = state.treeMap.get(parent.parent ?? "");
    }
  }
  return { ...state };
};

export const toggleSelect = (
  state: TreeState,
  id?: string,
  isSortable = true,
  scroll = false
) => {
  const node = getNodeById(state, id);
  if (node) {
    Array.from(state.treeMap.values()).forEach((n) => {
      n.isSelected = false;
      n.childSelected = false;
    });
    node.isSelected = true;
    let parent = state.treeMap.get(node.parent ?? "");
    while (parent != null) {
      parent.isOpen = true;
      parent.childSelected = true;
      parent = state.treeMap.get(parent.parent ?? "");
    }
    state.items = createNodeList(state.treeData, isSortable);
    state.autoScroll = scroll;
    return !node.isLeaf;
  }
  return { ...state };
};
