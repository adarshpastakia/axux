// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "@axux/core";
import { BadgeType, useBadge } from "@axux/core/dist/internals/useBadge";
import { Color, ColorPalette, EmptyCallback, VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AxField } from "@axux/form";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type SelectedItems = { include: string[]; exclude: string[] };
interface Item {
  id: string;
  icon?: string | JSX.Element;
  label: string;
  badge?: BadgeType;
  disabled?: boolean;
}
interface Props {
  items: Item[];
  maxCount?: number;
  className?: string;
  allowNegate?: boolean;
  positiveColor?: Color | ColorPalette;
  negativeColor?: Color | ColorPalette;
}

interface ToggleProps extends Props {
  allowNegate: true;
  selected?: SelectedItems;
  defaultSelected?: SelectedItems;
  onChange?: (ids: SelectedItems) => void;
}

interface CheckProps extends Props {
  allowNegate?: false;
  selected?: string[];
  defaultSelected?: string[];
  onChange?: (ids: string[]) => void;
}

const ToggleItemElement: VFC<
  { item: Item; selected?: number; onCheck: (v?: number) => void } & Pick<
    Props,
    "positiveColor" | "negativeColor"
  >
> = ({ item, selected, positiveColor = "success", negativeColor = "danger", onCheck }) => {
  const badgeEl = useBadge(item.badge);

  return (
    <div className="ax-flex ax-row--middle ax-checkList__item" data-disabled={item.disabled}>
      <div className="ax-col--auto ax-checkList__icons">
        {selected === undefined && (
          <AxIcon size="md" icon={AppIcons.iconCheckboxOff} color="muted" />
        )}
        {selected === 1 && <AxIcon size="md" icon={AppIcons.iconCheckPlus} color={positiveColor} />}
        {selected === 0 && (
          <AxIcon size="md" icon={AppIcons.iconCheckMinus} color={negativeColor} />
        )}
      </div>
      <div className="ax-col--auto ax-checkList__toggles">
        <AxIcon
          size="md"
          icon={selected === 1 ? AppIcons.iconCheckPlus : AppIcons.iconExpandPlus}
          className={`ax-hover--${selected === 1 ? positiveColor : "dark"}`}
          color={selected === 1 ? positiveColor : "muted"}
          onClick={() => onCheck(selected === 1 ? undefined : 1)}
        />
        <AxIcon
          size="md"
          icon={selected === 0 ? AppIcons.iconCheckMinus : AppIcons.iconCollapseMinus}
          className={`ax-hover--${selected === 0 ? negativeColor : "dark"}`}
          color={selected === 0 ? negativeColor : "muted"}
          onClick={() => onCheck(selected === 0 ? undefined : 0)}
        />
      </div>
      {item.icon && (
        <div className="ax-col--auto">
          <AxIcon icon={item.icon} size="lg" />
        </div>
      )}
      <div
        className="ax-col--fill ax-ellipsis ax-checkList__label"
        onClick={() => onCheck(selected === 1 ? 0 : selected === 0 ? undefined : 1)}
      >
        {item.label}
      </div>
      {item.badge && <div className="ax-col--auto">{badgeEl}</div>}
    </div>
  );
};

const CheckItemElement: VFC<{ item: Item; selected: boolean; onCheck: EmptyCallback }> = ({
  item,
  selected,
  onCheck
}) => {
  const badgeEl = useBadge(item.badge);

  return (
    <div
      className="ax-flex ax-row--middle ax-checkList__item"
      onClick={onCheck}
      data-disabled={item.disabled}
    >
      <div className="ax-col--auto">
        <AxField.Checkbox checked={selected} onChange={onCheck} />
      </div>
      {item.icon && (
        <div className="ax-col--auto">
          <AxIcon icon={item.icon} size="lg" />
        </div>
      )}
      <div className="ax-col--fill ax-ellipsis ax-checkList__label">{item.label}</div>
      {item.badge && <div className="ax-col--auto">{badgeEl}</div>}
    </div>
  );
};

/**
 * Check list for allowing item selection
 * @param items
 * @param maxCount
 * @param selected
 * @param allowNegate
 * @param defaultSelected
 * @param className
 * @param onChange
 * @constructor
 */
export const AxCheckList: VFC<ToggleProps | CheckProps> = ({
  items,
  allowNegate,
  maxCount = 6,
  selected: _selected = [],
  defaultSelected = [],
  className,
  onChange,
  ...rest
}) => {
  const { t } = useTranslation("core");
  const [listCount, setListCount] = useState(maxCount);
  const [selected, setSelected] = useState<SelectedItems | string[]>(defaultSelected);

  useEffect(() => {
    setSelected(_selected);
  }, [_selected]);

  const checkChanged = useCallback(
    (id: string) => {
      if (!allowNegate && Array.isArray(selected)) {
        let newList = [...selected];
        if (selected.includes(id)) newList.splice(newList.indexOf(id), 1);
        else newList = [...selected, id];
        onChange && onChange(newList as AnyObject);
        setSelected(newList);
      }
    },
    [allowNegate, onChange, selected]
  );
  const toggleChanged = useCallback(
    (id: string, val?: number) => {
      if (allowNegate && !Array.isArray(selected)) {
        const newSelection = { include: [...selected.include], exclude: [...selected.exclude] };
        if (selected.include.includes(id))
          newSelection.include.splice(selected.include.indexOf(id), 1);
        if (selected.exclude.includes(id))
          newSelection.exclude.splice(selected.exclude.indexOf(id), 1);
        if (val === 1) newSelection.include.push(id);
        else if (val === 0) newSelection.exclude.push(id);
        onChange && onChange(newSelection as AnyObject);
        setSelected(newSelection);
      }
    },
    [allowNegate, onChange, selected]
  );

  return (
    <div className={className}>
      {items
        .slice(0, listCount)
        .map((item) =>
          allowNegate && !Array.isArray(selected) ? (
            <ToggleItemElement
              key={item.id}
              item={item}
              {...rest}
              selected={
                selected.exclude.includes(item.id)
                  ? 0
                  : selected.include.includes(item.id)
                  ? 1
                  : undefined
              }
              onCheck={(v) => toggleChanged(item.id, v)}
            />
          ) : (
            <CheckItemElement
              key={item.id}
              item={item}
              selected={(selected as string[]).includes(item.id)}
              onCheck={() => checkChanged(item.id)}
            />
          )
        )}
      {items.length > maxCount && (
        <div className="ax-block ax-font--sm ax-align--end">
          <a
            className="ax-link"
            onClick={() =>
              setListCount(
                listCount === Number.MAX_SAFE_INTEGER ? maxCount : Number.MAX_SAFE_INTEGER
              )
            }
          >
            {t(listCount === Number.MAX_SAFE_INTEGER ? "action.less" : "action.more")}
          </a>
        </div>
      )}
    </div>
  );
};
