// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Format } from "@axux/utilities";
import { AxContent } from "packages/core";
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
              data-count={Format.percent(total / rec.count)}
              className={`ax-histogram__meter ax-color--${rec.color ?? color ?? "secondary"}`}
              style={{ "--meter": total / rec.count } as AnyObject}
            >
              <span>{rec.label}</span>
            </div>
          ))}
        </Fragment>
      ))}
      {data.length === 0 && <AxContent.Empty message={t("histogram.empty")} />}
    </div>
  );
};
