/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxIcon, AxText } from "@axux/core";
import { useBadge } from "@axux/core/dist/hooks/useBadge";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { type InternalNode } from "./types";

export const TreeNode = memo(
  ({
    style,
    isCheckable,
    isSelectable,
    checkLevel = 0,
    onToggleCheck,
    onToggleExpand,
    nodesSelectable,
    onSelect,
    node,
    ...props
  }: InternalNode & KeyValue) => {
    const { t } = useTranslation("data");
    const BadgeEl = useBadge(node.badge);
    const borders = useMemo(() => {
      return props.lines.map((l, i) => (
        <span key={i} className="ax-tree__spacer" data-border={l} />
      ));
    }, [props.lines]);

    const placeholder = useMemo(() => {
      if (props.isEmpty) {
        if (props.isError) {
          return (
            <div className="ax-tree__label" data-error="true">
              {t("tree.error")}
            </div>
          );
        } else if (props.isLoading) {
          return (
            <div className="ax-tree__label" data-empty="true">
              <AxAnimation.Spinner className="text-base" />
              &nbsp;{t("tree.loading")}
            </div>
          );
        } else {
          return (
            <div className="ax-tree__label" data-empty="true">
              {t("tree.noItems")}
            </div>
          );
        }
      }
      return null;
    }, [props.isEmpty, props.isLoading]);

    return (
      <div style={style} className="ax-tree__node">
        {borders}
        {!props.isLeaf && (
          <div className="ax-tree__spacer" onClick={onToggleExpand}>
            <AxIcon
              icon={
                props.isOpen
                  ? node.iconOpen ?? AppIcons.iconFolderOpen
                  : node.iconClosed ?? AppIcons.iconFolderClosed
              }
            />
          </div>
        )}
        {placeholder}
        {placeholder == null && (
          <div
            {...(node.props ?? {})}
            className={`ax-tree__label ${node.labelClassName ?? ""}`}
            onClick={() =>
              isCheckable
                ? onToggleCheck(node.id)
                : props.isLeaf || nodesSelectable
                ? isSelectable && onSelect(node.id)
                : onToggleExpand(node.id)
            }
            onDoubleClick={onToggleExpand}
            data-selected={!isCheckable && props.isSelected}
            data-disabled={node.isDisabled}
            data-child-selected={props.childSelected}
          >
            {isCheckable && props.level >= checkLevel && (
              <AxIcon
                icon={
                  props.isChecked === 2
                    ? AppIcons.iconCheckboxInt
                    : props.isChecked === 1
                    ? AppIcons.iconCheckboxOn
                    : AppIcons.iconCheckboxOff
                }
              />
            )}
            {node.icon && <AxIcon icon={node.icon ?? ""} />}
            <AxText.Ellipsis>{node.label}</AxText.Ellipsis>
            {BadgeEl}
          </div>
        )}
      </div>
    );
  }
);
TreeNode.displayName = "AxTree.Node";
