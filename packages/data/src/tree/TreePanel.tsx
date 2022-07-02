/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useIsRtl } from "@axux/core/dist/hooks/useIsRtl";
import { ElementProps } from "@axux/core/dist/types";
import { FC, useCallback, useReducer, useRef } from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { TreeNode } from "./Node";
import { TreeTools } from "./Tools";
import { InternalNode, TreeNodeType } from "./types";
import {
  createNodeList,
  createTreeMap,
  refactorNode,
  refactorTreeData,
  toggleProperty,
} from "./utils";

// TODO: impleent search
// TODO: impleent load more
// TODO: impleent action callbacks (select, change)

export interface TreeProps extends ElementProps {
  /**
   * tree data
   */
  data: TreeNodeType[];
  /**
   * show search bar
   */
  isSearchable?: boolean;
  /**
   * enable checkboxes for nodes
   */
  isCheckable?: boolean;
  /**
   * enable checkbox for level n and up
   */
  checkLevel?: number;
  /**
   * addition toolbar actions
   */
  actions?: JSX.Element[];
  /**
   * callback for lazy loading tree items
   */
  onLoad?: (id: string) => Promise<TreeNodeType[]> | TreeNodeType[];
  /**
   * callback on selection of tree node
   */
  onSelect?: (id: string) => void;
  /**
   * callback on change of checked list
   */
  onChange?: (selected: string[]) => void;
}

interface TreeState {
  treeData: InternalNode[];
  treeMap: KeyValue<InternalNode>;
  items: InternalNode[];
}

interface TreeActions {
  type:
    | "select"
    | "check"
    | "loadItems"
    | "toggleCheck"
    | "toggleExpand"
    | "expandAll"
    | "collapseAll"
    | "checkAll"
    | "uncheckAll";
  index: number;
}

export const AxTreePanel: FC<TreeProps> = ({
  className,
  data,
  actions,
  isSearchable,
  isCheckable,
  checkLevel,
  onChange,
  onLoad,
  onSelect,
  ...rest
}) => {
  const isRtl = useIsRtl();
  const panelRef = useRef<HTMLDivElement>(null);

  const initState = useCallback(() => {
    const treeData = refactorTreeData(data);
    const treeMap = createTreeMap(treeData);
    const items = createNodeList(treeData);
    return { treeData, treeMap, items };
  }, [data]);

  const reducer = useCallback(
    (state: TreeState, action: TreeActions) => {
      if (action.type === "toggleExpand") {
        const parent = state.items[action.index];
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
          state.items.splice(
            action.index + 1,
            0,
            ...createNodeList(parent.children)
          );
        } else if (onLoad) {
          // callback onLoad on resolved promise inject new nodes
          state.items.splice(
            action.index + 1,
            0,
            refactorNode({
              node: { isLeaf: true },
              index: 0,
              lines: parent.lines,
              isLast: true,
              isLoading: true,
              parent: parent.internalId,
              level: parent.level + 1,
            })
          );
        } else {
          state.items.splice(
            action.index + 1,
            0,
            refactorNode({
              node: { isLeaf: true },
              index: 0,
              isLast: true,
              isEmpty: true,
              lines: parent.lines,
              parent: parent.internalId,
              level: parent.level + 1,
            })
          );
        }
      }
      if (action.type === "toggleCheck") {
        const node = state.items[action.index];
        node.isChecked = node.isChecked === 0 ? 1 : 0;
        node.children &&
          toggleProperty(node.children, "isChecked", node.isChecked);
        let parent = state.treeMap[node.parent!];
        const parentCheck = parent?.children?.some(
          (n) => n.isChecked !== node.isChecked
        )
          ? 2
          : node.isChecked;
        while (parent) {
          parent.isChecked = parentCheck;
          parent = state.treeMap[parent.parent!];
        }
      }
      if (action.type === "expandAll") {
        toggleProperty(state.treeData, "isOpen", true);
        state.items = createNodeList(state.treeData);
      }
      if (action.type === "collapseAll") {
        toggleProperty(state.treeData, "isOpen", false);
        state.items = createNodeList(state.treeData);
      }
      if (action.type === "checkAll") {
        toggleProperty(state.treeData, "isChecked", 1);
        state.items = createNodeList(state.treeData);
      }
      if (action.type === "uncheckAll") {
        toggleProperty(state.treeData, "isChecked", 0);
        state.items = createNodeList(state.treeData);
      }
      return { ...state };
    },
    [onLoad, onSelect, onChange]
  );

  const [state, dispatch] = useReducer(
    reducer,
    {
      treeData: [],
      treeMap: {},
      items: [],
    },
    initState
  );

  const itemHeight = useCallback(
    (el: HTMLDivElement | null) => {
      return el ? parseInt(getComputedStyle(el).fontSize) * 1.5 : 0;
    },
    [state.items]
  );

  return (
    <div
      {...rest}
      ref={panelRef}
      className={`ax-tree__panel ${className ?? ""}`}
    >
      <TreeTools
        onExpand={() => dispatch({ type: "expandAll", index: 0 })}
        onCollapse={() => dispatch({ type: "collapseAll", index: 0 })}
        onCheckAll={() => dispatch({ type: "checkAll", index: 0 })}
        onUncheckAll={() => dispatch({ type: "uncheckAll", index: 0 })}
      />
      <div className="ax-tree__list">
        <AutoSizer>
          {({ width, height }) => (
            <List
              useIsScrolling
              width={width}
              height={height}
              itemSize={itemHeight(panelRef.current)}
              itemCount={state.items.length}
              direction={isRtl ? "rtl" : "ltr"}
              children={({ index, style }) => (
                <TreeNode
                  style={style}
                  {...state.items[index]}
                  checkLevel={checkLevel}
                  isCheckable={isCheckable}
                  onToggleCheck={() => dispatch({ type: "toggleCheck", index })}
                  onToggleExpand={() =>
                    dispatch({ type: "toggleExpand", index })
                  }
                />
              )}
            />
          )}
        </AutoSizer>
      </div>
    </div>
  );
};
