// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxContent } from "@axux/core";
import { Format } from "@axux/utilities";
import { Fragment, VFC } from "react";
import { useTranslation } from "react-i18next";
import { HistogramProps } from "./types";

export const AxHistogram: VFC<HistogramProps> = ({
  data,
  color,
  total,
  className,
  isLoading,
  emptyDisplay,
  onClick
}) => {
  const { t } = useTranslation("data");
  return (
    <div className={`ax-histogram ${className ?? ""}`}>
      {data.map(([group, records]) => (
        <Fragment key={group}>
          <div className="ax-histogram__group">{group}</div>
          {records.map((rec, i) => (
            <div
              key={i}
              data-disabled={rec.count <= 0}
              onClick={() => onClick && onClick(rec)}
              className={`ax-histogram__meter ax-color--${rec.color ?? color ?? "secondary"}`}
              style={{ "--meter": rec.count / Math.max(1, total) } as AnyObject}
            >
              <span>{rec.label}</span>
              <span>{Format.percent(rec.count / Math.max(1, total))}</span>
            </div>
          ))}
          {!isLoading &&
            records.length === 0 &&
            (emptyDisplay ?? <AxContent.Empty message={t("histogram.empty")} />)}
        </Fragment>
      ))}
    </div>
  );
};
