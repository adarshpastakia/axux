/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxAnimation, AxContent, AxIcon, AxLoader } from "@axux/core";
import { Color } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Format } from "@axux/utilities";
import { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SelectableProps, useSelectableList } from "../hooks/useSelectableList";

export interface HistogramItem extends KeyValue {
  id: string;
  label: string;
  count: number;
  isDisabled?: boolean;
}

export interface HistogramProps extends SelectableProps {
  /**
   * list items
   */
  items: HistogramItem[];
  /**
   * allow negative selections
   */
  allowNegative?: boolean;
  /**
   * total value
   */
  total?: number;
  /**
   * default bar color
   */
  color?: Color;
  /**
   * positive selection color
   */
  positiveColor?: Color;
  /**
   * negative selection color
   */
  negativeColor?: Color;
  /**
   * number format
   */
  format?: "percent" | "number";
  /**
   * message for empty list
   */
  emptyMessage?: string;

  isLoading?: boolean;

  /**
   * disable item when count is 0
   */
  allowDisable?: boolean;

  enableSorting?: boolean;
}

const HistogramMeter: FC<Partial<HistogramProps> & HistogramItem> = ({
  id,
  label,
  count,
  total = 0,
  format,
  color,
  allowNegative,
  positiveColor,
  negativeColor,
  allowDisable,
  selected = 0,
  onClick,
}) => {
  const meter = useMemo(() => count / Math.max(1, total), [count, total]);
  const badge = useMemo(
    () =>
      format === "percent"
        ? Format.percent(count / Math.max(1, total))
        : Format.number(count),
    [format, count, total]
  );

  return (
    <div
      className="ax-histogram__item"
      data-disabled={allowDisable && count === 0}
    >
      {allowNegative && (
        <div className="ax-histogram__checkbox">
          <AxIcon
            data-type="positive"
            onClick={(e) => (onClick?.(id, false), e.stopPropagation())}
            icon={AppIcons.iconMagnifyPlus}
            data-selected={selected === 1}
          />
          <AxIcon
            data-type="negative"
            onClick={(e) => (onClick?.(id, true), e.stopPropagation())}
            icon={AppIcons.iconMagnifyMinus}
            data-selected={selected === -1}
          />
        </div>
      )}
      <div
        data-color={
          selected === 1
            ? positiveColor
            : selected === -1
            ? negativeColor
            : color
        }
        style={{ "--meter": meter } as AnyObject}
        className="ax-histogram__meter"
        data-clickable={!(onClick == null)}
        onClick={() => onClick?.(id, false)}
        onContextMenu={(e) => (
          allowNegative && onClick?.(id, true), e.preventDefault()
        )}
      >
        <label>{label}&nbsp;</label>
        <span>{badge}</span>
      </div>
    </div>
  );
};

export const AxHistogram: FC<HistogramProps> = ({
  items = [],
  format,
  total = 0,
  allowNegative,
  positiveColor = "success",
  negativeColor = "danger",
  color = "primary",
  enableSorting,
  emptyMessage,
  isLoading,
  ...props
}) => {
  const { t } = useTranslation("data");
  const { selection, toggleSelection } = useSelectableList({ items, ...props });

  const listItems = useMemo(() => {
    if (enableSorting)
      return [...items].sort((a, b) => {
        if (a.count === b.count)
          return a.label
            .toLocaleLowerCase()
            .localeCompare(b.label.toLocaleLowerCase());
        return a.count > b.count ? -1 : 1;
      });
    return items;
  }, [items, selection]);

  const totalValue = useMemo(() => {
    if (total > 0) return total;
    if (format === "percent") return items.reduce((t, i) => t + i.count, 0);
    return Math.max(...items.map((i) => i.count));
  }, [total, format, items]);

  return (
    <div className="ax-histogram">
      {listItems.map((item, i) => (
        <HistogramMeter
          key={i}
          {...item}
          total={totalValue}
          format={format}
          color={color}
          positiveColor={positiveColor}
          negativeColor={negativeColor}
          onClick={(props.onChange != null) ? toggleSelection : props.onClick}
          allowNegative={allowNegative}
          selected={selection[item.id]}
        />
      ))}
      {isLoading && (
        <AxLoader>
          <AxAnimation.Bars />
        </AxLoader>
      )}
      {!isLoading && items.length === 0 && (
        <AxContent.Empty
          className="text-sm"
          message={emptyMessage ?? t("histogram.empty")}
        />
      )}
    </div>
  );
};
