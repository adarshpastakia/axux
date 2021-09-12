// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Format } from "@axux/utilities";
import { AxContent } from "@axux/core";
import { Fragment, VFC } from "react";
import { useTranslation } from "react-i18next";
import { HistogramProps } from "./types";

export const AxHistogram: VFC<HistogramProps> = ({ data, color, total, className }) => {
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
              data-count={Format.percent(rec.count / Math.max(1, total))}
              className={`ax-histogram__meter ax-bg--${rec.color ?? color ?? "secondary"}`}
              style={{ "--meter": rec.count / Math.max(1, total) } as AnyObject}
            >
              <span>{rec.label}</span>
            </div>
          ))}
          {records.length === 0 && <AxContent.Empty message={t("histogram.empty")} />}
        </Fragment>
      ))}
      {data.length === 0 && <AxContent.Empty message={t("histogram.empty")} />}
    </div>
  );
};
