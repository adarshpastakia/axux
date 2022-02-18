// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "@axux/core";
import { BadgeType, useBadge } from "@axux/core/dist/internals/useBadge";
import { EmptyCallback, VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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
  selected?: string[];
  defaultSelected?: string[];
  onChange?: (ids: string[]) => void;
}

const ItemElement: VFC<{ item: Item; selected: number; onCheck: EmptyCallback }> = ({
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
        {selected < 0 && <AxIcon size="md" icon={AppIcons.iconCheckboxOff} color="muted" />}
        {selected === 0 && <AxIcon size="md" icon={AppIcons.iconCheckPlus} color="primary" />}
        {selected === 1 && <AxIcon size="md" icon={AppIcons.iconCheckMinus} color="danger" />}
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
 * Toggle list for allowing positive/negative selection
 * @param items
 * @param maxCount
 * @param selected
 * @param defaultSelected
 * @param className
 * @param onChange
 * @constructor
 */
export const AxToggleList: VFC<Props> = ({
  items,
  maxCount = 6,
  selected: _selected = [],
  defaultSelected = [],
  className,
  onChange
}) => {
  const { t } = useTranslation("core");
  const [listCount, setListCount] = useState(maxCount);
  const [selected, setSelected] = useState<string[]>(defaultSelected);

  useEffect(() => {
    setSelected(_selected);
  }, [_selected]);

  const checkChanged = useCallback(
    (id: string) => {
      let newList = [...selected];
      // if negated then remove from list
      if (selected.includes(`${id}|1`)) newList.splice(newList.indexOf(`${id}|1`), 1);
      else if (selected.includes(`${id}|0`))
        newList.splice(newList.indexOf(`${id}|0`), 1, `${id}|1`);
      else newList = [...selected, `${id}|0`];
      onChange && onChange(newList);
      setSelected(newList);
    },
    [onChange, selected]
  );

  return (
    <div className={className}>
      {items.slice(0, listCount).map((item) => (
        <ItemElement
          key={item.id}
          item={item}
          selected={
            selected.includes(`${item.id}|0`) ? 0 : selected.includes(`${item.id}|1`) ? 1 : -1
          }
          onCheck={() => checkChanged(item.id)}
        />
      ))}
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
