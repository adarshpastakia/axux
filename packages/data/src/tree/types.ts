/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { BadgeType, IconProp } from "@axux/core/dist/types";

export interface TreeNodeType extends IconProp {
  id?: string;
  label: string;
  icon?: string;
  badge?: BadgeType;
  isLeaf?: boolean;
  iconOpen?: string;
  iconClosed?: string;
  isDisabled?: boolean;
  children?: Array<TreeNodeType>;
}

export interface InternalNode {
  level: number;
  internalId: string;
  isLeaf: boolean;
  parent?: string;
  isOpen: boolean;
  isEmpty?: boolean;
  isLoading?: boolean;
  isSelected: boolean;
  isChecked: 0 | 1 | 2;
  lines: (0 | 1)[];
  children?: InternalNode[];
  node: Omit<TreeNodeType, "children">;
}
