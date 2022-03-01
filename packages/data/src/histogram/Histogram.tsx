// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxContent, AxIcon } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Format } from "@axux/utilities";
import { useCallback, useMemo, MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { HistogramProps, HistogramRecord } from "./types";

const HistogramMeter: VFC<
  { record: HistogramRecord } & Omit<HistogramProps, "data" | "className" | "isLoading">
> = ({
  color = "primary",
  allowNegate,
  positiveColor = "success",
  negativeColor = "danger",
  onClick,
  record,
  total,
  format
}) => {
  const meterColor = useMemo(
    () =>
      record.color ??
      (record.include === true ? positiveColor : record.include == false ? negativeColor : color),
    [color, negativeColor, positiveColor, record.color, record.include]
  );

  const handleInclude = useCallback(() => {
    onClick && onClick(record, record.include === true ? undefined : true);
  }, [onClick, record]);
  const handleExclude = useCallback(() => {
    onClick && onClick(record, record.include === false ? undefined : false);
  }, [onClick, record]);

  const meter = useMemo(() => record.count / Math.max(1, total), [record.count, total]);
  const badge = useMemo(
    () =>
      format === "number"
        ? Format.number(record.count)
        : Format.percent(record.count / Math.max(1, total)),
    [format, record.count, total]
  );

  return (
    <div className="ax-histogram__group">
      {allowNegate && (
        <div className="ax-col--auto ax-histogram__toggles">
          <AxIcon
            size="md"
            icon={AppIcons.iconCheckPlus}
            className={`ax-hover--${record.include === true ? positiveColor : "dark"}`}
            color={record.include === true ? positiveColor : "muted"}
            onClick={handleInclude}
          />
          <AxIcon
            size="md"
            icon={AppIcons.iconCheckMinus}
            className={`ax-hover--${record.include === false ? negativeColor : "dark"}`}
            color={record.include === false ? negativeColor : "muted"}
            onClick={handleExclude}
          />
        </div>
      )}
      <div
        data-disabled={record.count <= 0}
        onContextMenu={(e) => e.preventDefault()}
        onMouseUp={(e) => onClick?.(record, e.button === 0)}
        className={`ax-histogram__meter ax-color--${meterColor} ${
          record.count > 0 && !allowNegate ? "ax-clickable" : ""
        }`}
        style={{ "--meter": meter } as AnyObject}
      >
        <span>{record.label}</span>
        <span>{badge}</span>
      </div>
    </div>
  );
};

export const AxHistogram: VFC<HistogramProps> = ({
  data,
  className,
  isLoading,
  emptyDisplay,
  ...rest
}) => {
  const { t } = useTranslation("data");
  return (
    <div className={`ax-histogram ${className ?? ""}`}>
      {data.map((rec, i) => (
        <HistogramMeter key={i} record={rec} {...rest} />
      ))}
      {!isLoading &&
        data.length === 0 &&
        (emptyDisplay ?? <AxContent.Empty message={t("histogram.empty")} />)}
    </div>
  );
};
