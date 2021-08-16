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
import { InternalNode } from "./Tree";

/** @internal */
const nodeSort = (withCheck?: boolean) => (a: KeyValue, b: KeyValue) => {
  if (a.isLeaf !== b.isLeaf) {
    return a.isLeaf ? 1 : -1;
  }
  if (withCheck && a.isChecked !== b.isChecked) {
    return a.isChecked > 0 ? -1 : 1;
  }
  return a.label.toString().toLowerCase().localeCompare(b.label.toString().toLowerCase());
};

/**
 * Tree node
 * @param node
 * @param isCheckable
 * @param checkLevel
 * @param onClick
 * @constructor
 * @internal
 */
export const TreeNode: VFC<{
  node: InternalNode;
  isCheckable?: boolean;
  checkLevel?: number;
  maxNodes?: number;
  onClick: (id: string, el?: string) => void;
}> = ({
  node: { id, level, isLeaf, isOpen, isSelected, isChecked, label, icon, badge, children },
  isCheckable,
  maxNodes,
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
    if (maxNodes && !showAll) {
      return (children ?? []).sort(nodeSort(true)).slice(0, Math.min(Math.max(4, maxNodes), 18));
    }
    return (children ?? []).sort(nodeSort());
  }, [children, maxNodes, showAll]);

  useLayoutEffect(() => setShowAll(false), [isOpen]);

  return (
    <Fragment>
      <div
        data-node-id={id}
        className="ax-tree__node"
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
        {icon && <AxIcon icon={icon} />}
        <div
          className={`ax-tree__node--label ${
            isCheckable && !showCheckbox && isChecked !== false ? "ax-weight--medium" : ""
          }`}
        >
          {label}
        </div>
        {badgeEl}
      </div>
      {showChildren &&
        (!isEmpty(nodes) ? (
          nodes.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
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
      {showChildren && !!maxNodes && !isEmpty(nodes) && (
        <div className="ax-tree__node" style={{ "--tree-level": level + 1 } as AnyObject}>
          <a className="ax-link ax-font--sm" onClick={() => setShowAll(!showAll)}>
            {showAll ? "Show less" : "Show more"}
          </a>
        </div>
      )}
    </Fragment>
  );
};
