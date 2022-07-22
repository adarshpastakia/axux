/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { useBadge } from "@axux/core/dist/hooks/useBadge";
import { BadgeType } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { isString } from "@axux/utilities";
import {
  FC,
  Fragment,
  isValidElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useTranslation } from "react-i18next";

export interface CheckListItem extends KeyValue {
  id: string;
  label: string;
  icon?: string;
  badge?: BadgeType;
  isDisabled?: boolean;
}

// TODO: CheckList-implement search

export interface CheckListProps {
  /**
   * list items
   */
  items: CheckListItem[];
  /**
   * selected item ids
   */
  selected?: string[];
  /**
   * selected negative item ids
   */
  nonselected?: string[];
  /**
   * allow negative selections
   */
  allowNegative?: boolean;
  maxCount?: number;
  onChange?: (ids: string[], nonIds?: string[]) => void;
}

const CheckItem: FC<
  CheckListItem & {
    selected: 0 | 1 | -1;
    allowNegative?: boolean;
  }
> = ({
  id,
  allowNegative,
  selected,
  icon,
  label,
  isDisabled,
  onClick,
  badge,
}) => {
  const badgeEl = useBadge(badge);
  return (
    <div
      className="ax-checkList__item"
      data-disabled={isDisabled}
      onClick={() => onClick(id, allowNegative ? 1 : 0)}
      onContextMenu={(e) => (
        allowNegative && onClick(id, allowNegative ? -1 : 0), e.preventDefault()
      )}
    >
      {!allowNegative && (
        <AxIcon
          data-type="checkbox"
          className="ax-checkList__checkbox"
          data-selected={selected === 1}
          icon={selected ? AppIcons.iconCheckboxOn : AppIcons.iconCheckboxOff}
        />
      )}
      {allowNegative && (
        <Fragment>
          <AxIcon
            data-type="multiple"
            className="ax-checkList__checkbox"
            icon={
              selected === 1
                ? AppIcons.iconCheckPlus
                : selected === -1
                ? AppIcons.iconCheckMinus
                : AppIcons.iconCheckboxOff
            }
            data-selected={selected}
          />
          <div className="ax-checkList__checkbox">
            <AxIcon
              data-type="positive"
              onClick={(e) => (onClick(id, 1), e.stopPropagation())}
              icon={
                selected === 1
                  ? AppIcons.iconCheckPlus
                  : AppIcons.iconExpandPlus
              }
              data-selected={selected === 1}
            />
            <AxIcon
              data-type="negative"
              onClick={(e) => (onClick(id, -1), e.stopPropagation())}
              icon={
                selected === -1
                  ? AppIcons.iconCheckMinus
                  : AppIcons.iconCollapseMinus
              }
              data-selected={selected === -1}
            />
          </div>
        </Fragment>
      )}
      {isValidElement(icon) && icon}
      {isString(icon) && <AxIcon icon={icon} />}
      <label>{label}</label>
      {badgeEl}
    </div>
  );
};

export const AxCheckList: FC<CheckListProps> = ({
  items,
  maxCount = 0,
  allowNegative,
  selected,
  nonselected,
  onChange,
}) => {
  const { t } = useTranslation("core");
  const [selection, setSelection] = useState<KeyValue<AnyObject>>({});
  const [showMore, setShowMore] = useState(false);
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    setShowMore(false);
    setSelection(
      items.reduce(
        (ret, { id }) => ({
          ...ret,
          [id]: selected?.includes(id) ? 1 : nonselected?.includes(id) ? -1 : 0,
        }),
        {}
      )
    );
  }, [items, selected, nonselected]);

  const toggleSelection = useCallback(
    (id: string, check: 1 | -1) => {
      const newSelection = { ...selection, [id]: 0 };
      if (selection[id] === 0) newSelection[id] = 1;
      if (selection[id] !== 0) newSelection[id] = 0;
      if (check) {
        newSelection[id] = check;
        if (selection[id] === 1 && check === 1) newSelection[id] = 0;
        if (selection[id] === -1 && check === -1) newSelection[id] = 0;
      }
      setSelection(newSelection);
      const change: string[][] = [[], []];
      Object.entries(newSelection).forEach(([id, select]) =>
        select === 1
          ? change[0].push(id)
          : select === -1
          ? change[1].push(id)
          : undefined
      );
      startTransition(() => onChange?.(change[0], change[1]));
    },
    [selection]
  );

  const listItems = useMemo(() => {
    return [...items]
      .sort((a, b) => {
        if (selection[a.id] !== selection[b.id]) {
          if (selection[a.id] === 1) return -1;
          if (selection[b.id] === 1) return 1;
          if (selection[a.id] === -1) return -1;
          if (selection[b.id] === -1) return 1;
        }
        return 0;
      })
      .slice(0, !showMore && maxCount > 0 ? maxCount : undefined);
  }, [items, selection, maxCount, showMore]);

  return (
    <div className="ax-checkList">
      {listItems.map((item) => (
        <CheckItem
          {...item}
          onClick={toggleSelection}
          allowNegative={allowNegative}
          selected={selection[item.id]}
        />
      ))}
      {maxCount > 0 && items.length > maxCount && (
        <div className="ax-moreLink">
          <a onClick={() => setShowMore(!showMore)}>
            ...{t(`action.${showMore ? "less" : "more"}`)}
          </a>
        </div>
      )}
    </div>
  );
};
