/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ElementProps } from "@axux/core/dist/types";
import { AxField } from "@axux/form";
import { isNil, matchString } from "@axux/utilities";
import {
  memo,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useReducer,
  useRef,
  useTransition,
  type FC,
  type ReactNode,
  type Ref,
} from "react";
import { AxVirtualItem } from "../virtual/Item";
import { AxVirtualList, type VirtualListRef } from "../virtual/List";
import { TreeNode } from "./Node";
import { TreeTools } from "./Tools";
import { toggleCheck, toggleExpand, toggleSelect } from "./reducer";
import {
  type InternalNode,
  type TreeActions,
  type TreeNodeType,
  type TreeRef,
  type TreeState,
} from "./types";
import {
  createChildItems,
  createIdMap,
  createNodeList,
  createTreeMap,
  getNodeById,
  refactorChildren,
  refactorTreeData,
  toggleProperty,
} from "./utils";

export interface TreeProps extends ElementProps {
  title?: ReactNode;
  /**
   * tree data
   */
  data: TreeNodeType[];
  /**
   * selected node id
   */
  selected?: string;
  /**
   * enable select for nodes
   */
  nodesSelectable?: boolean;
  /**
   * show search bar
   */
  isSearchable?: boolean;
  /**
   * enable sorting of nodes
   */
  isSortable?: boolean;
  /**
   * enable selectable items
   */
  isSelectable?: boolean;
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
  actions?: false | JSX.Element[];

  treeRef?: Ref<TreeRef | undefined>;
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
    title,
    actions,
    selected,
    nodesSelectable,
    isSortable = true,
    isSearchable,
    isCheckable,
    isSelectable,
    checkLevel = 0,
    onChange,
    onLoad,
    onSelect,
    treeRef: ref,
    ...rest
  }: TreeProps) => {
    const listRef = useRef<VirtualListRef>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const [, startTransition] = useTransition();

    const initState = useCallback((data: TreeNodeType[] = []) => {
      const treeData = refactorTreeData(data, isSortable);
      const treeMap = createTreeMap(treeData);
      const idMap = createIdMap(treeData);
      const items = createNodeList(treeData, isSortable);
      return { treeData, treeMap, idMap, items, autoScroll: false };
    }, []);

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
        if (action.type === "init" && action.newState) {
          return { ...action.newState };
        }
        if (action.type === "toggleExpand") {
          return toggleExpand(state, action.id, !(onLoad == null), isSortable);
        }
        if (action.type === "open") {
          return toggleExpand(
            state,
            action.id,
            !(onLoad == null),
            isSortable,
            true
          );
        }
        if (action.type === "toggleCheck") {
          const newState = toggleCheck(state, action.id);
          startTransition(() =>
            fireCheckChange?.(Array.from(newState.treeMap.values()))
          );
          return newState;
        }
        if (action.type === "loadItems") {
          const parent = getNodeById(state, action.id);
          if (parent) {
            parent.isLoading = false;
            parent.isError = false;
            const index = state.items.indexOf(parent);
            refactorChildren(parent, action.items ?? [], isSortable);
            state.idMap = createIdMap(state.treeData);
            state.treeMap = createTreeMap(state.treeData);
            state.items.splice(
              index + 1,
              1,
              ...createChildItems(parent, isSortable)
            );
          }
        }
        if (action.type === "loadError") {
          const parent = getNodeById(state, action.id);
          if (parent) {
            const index = state.items.indexOf(parent);
            const item = state.items[index + 1];
            if (item) {
              item.isLoading = false;
              item.isError = true;
            }
            parent.isLoading = false;
            parent.isError = true;
          }
        }
        if (action.type === "expandAll") {
          toggleProperty(state.treeData, "isOpen", true, true);
          state.items = createNodeList(state.treeData, isSortable);
        }
        if (action.type === "collapseAll") {
          toggleProperty(state.treeData, "isOpen", false);
          state.items = createNodeList(state.treeData, isSortable);
        }
        if (action.type === "checkAll") {
          toggleProperty(state.treeData, "isChecked", 1);
          setTimeout(
            () =>
              startTransition(() =>
                fireCheckChange?.(Array.from(state.treeMap.values()))
              ),
            100
          );
        }
        if (action.type === "uncheckAll") {
          toggleProperty(state.treeData, "isChecked", 0);
          setTimeout(
            () =>
              startTransition(() =>
                fireCheckChange?.(Array.from(state.treeMap.values()))
              ),
            100
          );
        }
        if (action.type === "select") {
          state.autoScroll = true;
          toggleSelect(state, action.id, isSortable, action.propChange);
          !action.propChange &&
            setTimeout(
              () =>
                startTransition(() => {
                  action.id && onSelect?.(action.id);
                }),
              100
            );
        }
        if (action.type === "search") {
          Array.from(state.treeMap.values()).forEach((item) => {
            item.isFiltered = action.search
              ? matchString(item.query, action.search)
              : undefined;
            if (item.parent && item.isFiltered) {
              let parent = state.treeMap.get(item.parent);
              while (parent != null) {
                !action.search && (parent.isOpen = false);
                parent.isFiltered = item.isFiltered;
                parent = state.treeMap.get(parent.parent ?? "");
              }
            }
          });
          state.autoScroll = true;
          state.items = createNodeList(state.treeData, isSortable);
        }
        return { ...state };
      },
      [onLoad, onSelect, fireCheckChange, isSortable]
    );

    const [state, dispatch] = useReducer(
      reducer,
      {
        treeData: [],
        treeMap: new Map(),
        idMap: new Map(),
        items: [],
        autoScroll: false,
      },
      () => initState()
    );

    useEffect(() => {
      dispatch({ type: "init", newState: initState(data) });
    }, [data]);

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
          propChange: true,
        });
      }
    }, [data, selected]);

    const loadNodes = useCallback(
      (id?: string) => {
        startTransition(() => {
          if (id) {
            const ret = onLoad?.(id) ?? [];
            Promise.resolve(ret)
              .then((resp) => {
                dispatch({
                  type: "loadItems",
                  id,
                  items: resp ?? [],
                });
              })
              .catch(() => dispatch({ type: "loadError", id }));
          }
        });
      },
      [onLoad]
    );

    const handleExpand = useCallback(
      (index: number) => {
        const parent = state.items[index];
        dispatch({ type: "toggleExpand", id: parent.node.id });
        !parent.isOpen && isNil(parent.children) && loadNodes(parent.node.id);
      },
      [state, loadNodes]
    );

    useImperativeHandle(
      ref,
      () => ({
        select: (id: string) =>
          dispatch({ type: "select", id, propChange: true }),
        open: (id: string) => {
          dispatch({ type: "open", id, propChange: true });
          const parent = state.treeMap.get(state.idMap.get(id) ?? "");
          parent && isNil(parent?.children) && loadNodes(parent.node.id);
        },
      }),
      [state, loadNodes]
    );

    useLayoutEffect(() => {
      state.autoScroll &&
        startTransition(() => {
          const item = Array.from(state.treeMap.values()).find(
            (n) => n.isSelected
          );
          if (item != null) {
            const focusIndex = state.items.indexOf(item);
            focusIndex > -1 && listRef.current?.scrollToItem(focusIndex);
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
          title={title}
          isCheckable={isCheckable}
          onExpand={() => dispatch({ type: "expandAll" })}
          onCollapse={() => dispatch({ type: "collapseAll" })}
          onCheckAll={() => dispatch({ type: "checkAll" })}
          onUncheckAll={() => dispatch({ type: "uncheckAll" })}
        />
        {isSearchable && (
          <AxField.Search
            isPlain
            onChange={(search) => dispatch({ type: "search", search })}
            className="ax-tree__search"
          />
        )}
        <AxVirtualList
          fullWidth
          hideScroller
          listRef={listRef}
          items={state.items}
          height={itemHeight(panelRef.current)}
        >
          {({ data, ...props }) => (
            <AxVirtualItem {...props}>
              <TreeNode
                {...data}
                checkLevel={checkLevel}
                isCheckable={isCheckable}
                isSelectable={isSelectable}
                nodesSelectable={nodesSelectable}
                onSelect={(id: string) => dispatch({ type: "select", id })}
                onToggleCheck={(id: string) =>
                  dispatch({ type: "toggleCheck", id })
                }
                onToggleExpand={() => handleExpand(props.index)}
              />
            </AxVirtualItem>
          )}
        </AxVirtualList>
      </div>
    );
  }
);
AxTreePanel.displayName = "AxTree.Panel";
