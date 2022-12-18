/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { BadgeType, IconProp } from "@axux/core/dist/types";

export interface TreeRef {
  select: (id: string) => void;
  open: (id: string) => void;
}

export interface TreeState {
  treeData: InternalNode[];
  treeMap: Map<string, InternalNode>;
  idMap: Map<string, string>;
  items: InternalNode[];
  autoScroll: boolean;
}

export interface TreeActions {
  type:
    | "init"
    | "open"
    | "select"
    | "search"
    | "check"
    | "loadItems"
    | "loadError"
    | "toggleCheck"
    | "toggleExpand"
    | "expandAll"
    | "collapseAll"
    | "checkAll"
    | "uncheckAll";
  id?: string;
  search?: string;
  items?: TreeNodeType[];
  propChange?: boolean;
  newState?: TreeState;
}

export interface TreeNodeType extends IconProp {
  id?: string;
  label: string;
  icon?: string;
  badge?: BadgeType;
  isLeaf?: boolean;
  isOpen?: boolean;
  iconOpen?: string;
  iconClosed?: string;
  isDisabled?: boolean;
  children?: TreeNodeType[];
}

export interface InternalNode {
  level: number;
  internalId: string;
  isLeaf: boolean;
  parent?: string;
  isOpen: boolean;
  isEmpty?: boolean;
  isError?: boolean;
  isLoading?: boolean;
  isSelected: boolean;
  isFiltered?: boolean;
  childSelected: boolean;
  isChecked: 0 | 1 | 2;
  lines: Array<0 | 1>;
  children?: InternalNode[];
  node: Omit<TreeNodeType, "children">;
}
