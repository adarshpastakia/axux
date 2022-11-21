/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useIsRtl } from "@axux/core/dist/hooks/useIsRtl";
import { ElementProps } from "@axux/core/dist/types";
import { AxField } from "@axux/form";
import { matchString } from "@axux/utilities";
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useLayoutEffect,
  useReducer,
  useRef,
  useTransition,
} from "react";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeList as List } from "react-window";
import { TreeNode } from "./Node";
import { toggleCheck, toggleExpand, toggleSelect } from "./reducer";
import { TreeTools } from "./Tools";
import { InternalNode, TreeActions, TreeNodeType, TreeState } from "./types";
import {
  createChildItems,
  createIdMap,
  createNodeList,
  createTreeMap,
  refactorChildren,
  refactorTreeData,
  toggleProperty,
} from "./utils";

export interface TreeProps extends ElementProps {
  /**
   * tree data
   */
  data: TreeNodeType[];
  /**
   * selected node id
   */
  selected?: string;
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
  onLoad?: (
    id: string
  ) => Promise<TreeNodeType[] | undefined> | TreeNodeType[] | undefined;
  /**
   * callback on selection of tree node
   */
  onSelect?: (id: string) => void;
  /**
   * callback on change of checked list
   */
  onChange?: (checked: string[]) => void;
}

export const AxTreePanel: FC<TreeProps> = memo(
  ({
    className,
    data,
    actions,
    selected,
    isSearchable,
    isCheckable,
    checkLevel = 0,
    onChange,
    onLoad,
    onSelect,
    ...rest
  }: TreeProps) => {
    const isRtl = useIsRtl();
    const listRef = useRef<List>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [, startTransition] = useTransition();

    const initState = useCallback(() => {
      const treeData = refactorTreeData(data);
      const treeMap = createTreeMap(treeData);
      const idMap = createIdMap(treeData);
      const items = createNodeList(treeData);
      return { treeData, treeMap, idMap, items, autoScroll: false };
    }, [data]);

    const fireCheckChange = useCallback(
      (items: InternalNode[]) => {
        const checkList = items
          .map((node) =>
            node.isChecked === 1 && node.isLeaf ? node.node.id : undefined
          )
          .filter(Boolean) as string[];
        onChange?.(checkList);
      },
      [onChange]
    );

    const reducer = useCallback(
      (state: TreeState, action: TreeActions) => {
        state.autoScroll = false;
        if (action.type === "toggleExpand") {
          return toggleExpand(state, action.index, !(onLoad == null));
        }
        if (action.type === "toggleCheck") {
          toggleCheck(state, action.id);
          startTransition(() =>
            fireCheckChange?.(Array.from(state.treeMap.values()))
          );
        }
        if (action.type === "loadItems") {
          const parent = state.items[action.index];
          parent.isLoading = false;
          parent.isError = false;
          refactorChildren(parent, action.items ?? []);
          state.items.splice(action.index + 1, 1, ...createChildItems(parent));
        }
        if (action.type === "loadError") {
          const item = state.items[action.index + 1];
          const parent = state.items[action.index];
          item.isLoading = false;
          item.isError = true;
          parent.isLoading = false;
          parent.isError = true;
        }
        if (action.type === "expandAll") {
          toggleProperty(state.treeData, "isOpen", true, true);
          state.items = createNodeList(state.treeData);
        }
        if (action.type === "collapseAll") {
          toggleProperty(state.treeData, "isOpen", false);
          state.items = createNodeList(state.treeData);
        }
        if (action.type === "checkAll") {
          toggleProperty(state.treeData, "isChecked", 1);
          startTransition(() =>
            fireCheckChange?.(Array.from(state.treeMap.values()))
          );
        }
        if (action.type === "uncheckAll") {
          toggleProperty(state.treeData, "isChecked", 0);
          startTransition(() =>
            fireCheckChange?.(Array.from(state.treeMap.values()))
          );
        }
        if (action.type === "select") {
          toggleSelect(state, action.id, action.propChange);
          !action.propChange &&
            startTransition(() => {
              action.id && onSelect?.(action.id);
            });
        }
        if (action.type === "search") {
          Array.from(state.treeMap.values()).forEach((item) => {
            item.isFiltered = action.search
              ? matchString(item.node.label, action.search)
              : undefined;
            if (item.parent && item.isFiltered) {
              let parent = state.treeMap.get(item.parent);
              while (parent != null) {
                parent.isFiltered = true;
                parent = state.treeMap.get(parent.parent ?? "");
              }
            }
          });
          state.autoScroll = true;
          state.items = createNodeList(state.treeData);
        }
        return { ...state };
      },
      [onLoad, onSelect, fireCheckChange]
    );

    const [state, dispatch] = useReducer(
      reducer,
      {
        treeData: [],
        treeMap: {},
        idMap: {},
        items: [],
        autoScroll: false,
      },
      initState
    );

    const itemHeight = useCallback(
      (el: HTMLDivElement | null) => {
        const h =
          el != null
            ? parseInt(getComputedStyle(el).fontSize ?? "16") * 1.5
            : 0;
        return isNaN(h) ? 0 : h;
      },
      [state.items]
    );

    useEffect(() => {
      if (selected) {
        dispatch({
          type: "select",
          id: selected,
          index: 0,
          propChange: true,
        });
      }
    }, [selected]);

    const handleExpand = useCallback(
      (index: number) => {
        const parent = state.items[index];
        dispatch({ type: "toggleExpand", index });
        !parent.isOpen &&
          parent.children?.length === 0 &&
          startTransition(() => {
            const ret = parent.node.id && onLoad?.(parent.node.id);
            Promise.resolve(ret)
              .then((resp) => {
                if (resp) {
                  dispatch({ type: "loadItems", index, items: resp });
                } else {
                  dispatch({ type: "loadError", index });
                }
              })
              .catch(() => dispatch({ type: "loadError", index }));
          });
      },
      [state, onLoad]
    );

    useLayoutEffect(() => {
      state.autoScroll &&
        startTransition(() => {
          const item = Array.from(state.treeMap.values()).find(
            (n) => n.isSelected
          );
          if (item != null) {
            const focusIndex = state.items.indexOf(item);
            focusIndex > -1 &&
              listRef.current?.scrollToItem(focusIndex, "center");
          }
        });
    }, [state]);

    return (
      <div
        {...rest}
        ref={panelRef}
        className={`ax-tree__panel ${className ?? ""}`}
      >
        <TreeTools
          isCheckable={isCheckable}
          onExpand={() => dispatch({ type: "expandAll", index: 0 })}
          onCollapse={() => dispatch({ type: "collapseAll", index: 0 })}
          onCheckAll={() => dispatch({ type: "checkAll", index: 0 })}
          onUncheckAll={() => dispatch({ type: "uncheckAll", index: 0 })}
        />
        {isSearchable && (
          <AxField.Search
            isPlain
            onSearch={(search) =>
              dispatch({ type: "search", search, index: 0 })
            }
            className="ax-tree__search"
          />
        )}
        <div className="ax-tree__list">
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={listRef}
                useIsScrolling
                width={width}
                height={height}
                itemSize={itemHeight(panelRef.current)}
                itemCount={state.items.length}
                direction={isRtl ? "rtl" : "ltr"}
              >
                {({ index, style }) => (
                  <TreeNode
                    style={style}
                    {...state.items[index]}
                    checkLevel={checkLevel}
                    isCheckable={isCheckable}
                    onSelect={(id: string) =>
                      dispatch({ type: "select", index, id })
                    }
                    onToggleCheck={(id: string) =>
                      dispatch({ type: "toggleCheck", index, id })
                    }
                    onToggleExpand={() => handleExpand(index)}
                  />
                )}
              </List>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
);
AxTreePanel.displayName = "AxTree.Panel";
