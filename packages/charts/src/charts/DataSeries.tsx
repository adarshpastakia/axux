/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider } from "@axux/core";
import { isEmpty } from "@axux/utilities";
import { EChartOption, EChartsType } from "echarts";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { BaseChart, SeriesType } from "../types";
import { Icons } from "../types/icons";
import { seriesRenderer } from "../types/utils";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartToolbar } from "../wrapper/ChartToolbar";
import { ChartWrapper } from "../wrapper/ChartWrapper";
import { PaletteSelect } from "../wrapper/PaletteSelect";

export interface DataSeriesProps extends BaseChart, SeriesType {
  type?:
    | "column"
    | "line"
    | "bar"
    | "radar"
    | "line-stacked"
    | "column-stacked"
    | "bar-stacked";
  onClick?: (data: { category: string; series: string }) => void;
}

const DataSeriesChart: FC<DataSeriesProps> = ({
  data,
  categories,
  categoryAxisName,
  valueAxisName,
  title,
  theme: chartTheme,
  type: chartType = "column",
  onClick,
}) => {
  const chartRef = useRef<EChartsType>(null);
  const [type, setType] = useState(chartType);
  const [theme, setTheme] = useState(chartTheme);

  useEffect(() => {
    if (type === "radar") {
      return () => {
        chartRef.current?.clear();
      };
    }
  }, [type]);

  const options = useMemo<EChartOption>(() => {
    if (type === "radar") {
      chartRef.current?.clear();
    }
    if (isEmpty(data)) {
      chartRef.current?.clear();
      return {};
    }

    const stack = type.includes("stacked") ? "stack" : undefined;

    const [_type, stacked] = type.split("-");
    const categoryAxis: AnyObject =
      _type === "radar"
        ? undefined
        : ({
            name: categoryAxisName,
            type: "category",
            nameGap: 24,
            nameLocation: "center",
            axisTick: {
              show: false,
            },
            data: categories,
          } as EChartOption.XAxis);
    const valueAxis: AnyObject =
      _type === "radar"
        ? undefined
        : ({
            name: valueAxisName,
            type: "value",
            nameGap: 24,
            nameLocation: "center",
          } as EChartOption.YAxis);
    const radar =
      _type !== "radar"
        ? undefined
        : ({
            shape: "circle",
            indicator: categories?.map((c) => ({ name: c })),
          } as AnyObject);

    const series = data?.map((item, index) => ({
      id: item.id,
      stack,
      areaStyle: !!stacked ? {} : undefined,
      type: _type === "column" ? "bar" : _type,
      name: item.label ?? item.id,
      data:
        _type === "radar"
          ? [{ value: item.values, id: item.id, name: item.label ?? item.id }]
          : item.values,
    }));

    return {
      xAxis: type.startsWith("bar") ? valueAxis : categoryAxis,
      yAxis: type.startsWith("bar") ? categoryAxis : valueAxis,
      radar,
      series,
      tooltip: {
        trigger: _type === "radar" ? "item" : "axis",
        confine: true,
        position: "top",
      } as AnyObject,
    };
  }, [data, type, categories, categoryAxisName, valueAxisName]);

  return (
    <ChartContainer
      theme={theme}
      options={options}
      chartRef={chartRef}
      isEmpty={isEmpty(data)}
      emptyIcon={Icons.Column}
      dataTableRenderer={seriesRenderer}
      onClick={(e) => onClick?.({ category: e.name, series: e.seriesId })}
    >
      <ChartToolbar>
        <label>{title}</label>
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.Line}
          isActive={type === "line"}
          onClick={() => setType("line")}
        />
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.Column}
          isActive={type === "column"}
          onClick={() => setType("column")}
        />
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.Bar}
          isActive={type === "bar"}
          onClick={() => setType("bar")}
        />
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.Radar}
          isActive={type === "radar"}
          onClick={() => setType("radar")}
        />
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.LineStacked}
          isActive={type === "line-stacked"}
          onClick={() => setType("line-stacked")}
        />
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.ColumnStacked}
          isActive={type === "column-stacked"}
          onClick={() => setType("column-stacked")}
        />
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.BarStacked}
          isActive={type === "bar-stacked"}
          onClick={() => setType("bar-stacked")}
        />
        <AxDivider size="xs" vertical />
        <PaletteSelect theme={theme} onClick={setTheme} />
      </ChartToolbar>
    </ChartContainer>
  );
};

export const DataSeries: FC<DataSeriesProps> = (props) => (
  <ChartWrapper>
    <DataSeriesChart {...props} />
  </ChartWrapper>
);
