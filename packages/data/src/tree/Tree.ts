// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { BadgeType } from "@axux/core/dist/internals/useBadge";
import { IconProps } from "@axux/core/dist/types";
import { ReactNode } from "react";

/** @internal */
export interface BaseNode extends IconProps {
  id: string;
  label: string;
  badge?: BadgeType;
  isLeaf?: boolean;
  isDisabled?: boolean;
}
/** @internal */
interface LeafNode extends BaseNode {
  isLeaf: true;
  children?: undefined;
}
/** @internal */
interface FolderNode extends BaseNode {
  isLeaf: false;
  children: Array<LeafNode | FolderNode>;
}

/** @internal */
export interface InternalNode extends BaseNode {
  level: number;
  parent?: string;
  isLeaf?: boolean;
  isOpen?: boolean;
  isSelected?: boolean;
  isChecked?: boolean | 2;
  children?: InternalNode[];
}

/** @internal */
export type TreeNode = LeafNode | FolderNode;

/** @internal */
export interface TreePanelProps {
  data: TreeNode[];
  checkLevel?: number;
  isCheckable?: boolean;
  isSearchable?: boolean;
  allowPartial?: boolean;
  maxNodes?: number;
  tools?: ReactNode;
  onLoad?: (id: string) => Promise<TreeNode[]> | TreeNode[];
  onSelect?: (id: string) => void;
  onChange?: (selected: string[]) => void;
}
