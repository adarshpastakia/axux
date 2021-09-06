// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "@axux/core";
import { useBadge } from "@axux/core/dist/internals/useBadge";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { isEmpty } from "@axux/utilities";
import { Fragment, useLayoutEffect, useMemo, useState, VFC } from "react";
import { useTranslation } from "react-i18next";
import { InternalNode, TreePanelProps } from "./types";

/** @internal */
const nodeSort = (sort: AnyObject, withCheck?: boolean) => {
  const sorter = sort === true ? { prop: "label", order: "asc" } : sort;
  return (a: KeyValue, b: KeyValue) => {
    if (a.isLeaf !== b.isLeaf) {
      return a.isLeaf ? 1 : -1;
    }
    if (withCheck && a.isChecked !== b.isChecked) {
      return a.isChecked > 0 ? -1 : 1;
    }
    const aValue = sorter.prop in a ? a[sorter.prop] : a.label;
    const bValue = sorter.prop in b ? b[sorter.prop] : b.label;
    return (
      aValue.toString().toLowerCase().localeCompare(bValue.toString().toLowerCase()) *
      (sorter.order === "asc" ? 1 : -1)
    );
  };
};

/**
 * Tree node
 * @constructor
 * @internal
 */
export const TreeNode: VFC<
  {
    node: InternalNode;
    isRoot?: boolean;
    onClick: (id: string, el?: string) => void;
  } & Pick<TreePanelProps, "sort" | "maxNodes" | "isCheckable" | "checkLevel">
> = ({
  node: {
    id,
    level,
    isLeaf,
    isOpen,
    isSelected,
    isChecked,
    isDisabled,
    label,
    icon,
    badge,
    children
  },
  isCheckable,
  maxNodes,
  sort,
  isRoot,
  checkLevel = 0,
  onClick
}) => {
  const badgeEl = useBadge(badge);
  const { t } = useTranslation("data");

  const showCheckbox = useMemo(
    () => isCheckable && level >= checkLevel,
    [checkLevel, isCheckable, level]
  );
  const checkIcon = useMemo(() => {
    if (showCheckbox) {
      return isChecked === 2
        ? AppIcons.iconCheckboxInt
        : isChecked
        ? AppIcons.iconCheckboxOn
        : AppIcons.iconCheckboxOff;
    }
    return undefined;
  }, [isChecked, showCheckbox]);

  const showChildren = useMemo(() => !isLeaf && isOpen, [isLeaf, isOpen]);

  const [showAll, setShowAll] = useState(false);
  const nodes = useMemo(() => {
    const nodeList = children ?? [];
    if (sort) {
      nodeList.sort(nodeSort(sort, !!maxNodes && !showAll));
    }
    return maxNodes && !showAll ? nodeList.slice(0, Math.min(Math.max(4, maxNodes), 18)) : nodeList;
  }, [children, maxNodes, showAll, sort]);

  useLayoutEffect(() => setShowAll(false), [isOpen]);

  return (
    <Fragment>
      {!isRoot && (
        <div
          data-node-id={id}
          className="ax-tree__node"
          data-disabled={isDisabled}
          data-selected={!isCheckable && isSelected}
          style={{ "--tree-level": level } as AnyObject}
          onClick={(e) => onClick && onClick(id, (e.target as HTMLElement).dataset.nodeToggle)}
        >
          {!isLeaf && (
            <AxIcon
              data-node-toggle="toggle"
              className="ax-tree__toggle"
              icon={isOpen ? AppIcons.iconCollapseMinus : AppIcons.iconExpandPlus}
            />
          )}
          {checkIcon && <AxIcon color="muted" className="ax-tree__check" icon={checkIcon} />}
          {icon && <AxIcon className="ax-tree__icon" icon={icon} />}
          <div
            className={`ax-tree__node--label ${
              isCheckable && !showCheckbox && isChecked !== false ? "ax-weight--medium" : ""
            }`}
          >
            {label}
          </div>
          {badgeEl}
        </div>
      )}
      {showChildren &&
        (!isEmpty(nodes) ? (
          nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              sort={sort}
              onClick={onClick}
              isCheckable={isCheckable}
              checkLevel={checkLevel}
            />
          ))
        ) : (
          <div
            className="ax-tree__node ax-tree__node--empty"
            style={{ "--tree-level": level + 1 } as AnyObject}
          >
            {t("tree.noItems")}
          </div>
        ))}
      {showChildren && !!maxNodes && !isEmpty(nodes) && nodes.length > maxNodes && (
        <div className="ax-tree__node" style={{ "--tree-level": level + 1 } as AnyObject}>
          <a className="ax-link ax-font--sm" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show more"}
          </a>
        </div>
      )}
    </Fragment>
  );
};
