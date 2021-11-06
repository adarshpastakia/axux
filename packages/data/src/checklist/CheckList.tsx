// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "@axux/core";
import { BadgeType, useBadge } from "@axux/core/dist/internals/useBadge";
import { EmptyCallback, VFC } from "@axux/core/dist/types";
import { AxField } from "@axux/form";
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

const ItemElement: VFC<{ item: Item; selected: boolean; onCheck: EmptyCallback }> = ({
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

export const AxCheckList: VFC<Props> = ({
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
      if (selected.includes(id)) newList.splice(newList.indexOf(id), 1);
      else newList = [...selected, id];
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
          selected={selected.includes(item.id)}
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
