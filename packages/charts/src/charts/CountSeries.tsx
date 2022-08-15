/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider } from "@axux/core";
import { compareValues, isEmpty } from "@axux/utilities";
import { EChartOption, EChartsType } from "echarts";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { BaseChart, CountType } from "../types";
import { Icons } from "../types/icons";
import { countRenderer } from "../types/utils";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartToolbar } from "../wrapper/ChartToolbar";
import { ChartWrapper } from "../wrapper/ChartWrapper";
import { PaletteSelect } from "../wrapper/PaletteSelect";

export interface CountSeriesProps extends BaseChart, CountType {
  type?: "pie" | "bar" | "column";
  onClick?: (key: string) => void;
}

const CountSeriesChart: FC<CountSeriesProps> = ({
  data,
  title,
  theme: chartTheme,
  type: chartType = "pie",
  onClick,
}) => {
  const chartRef = useRef<EChartsType>(null);
  const [type, setType] = useState(chartType);
  const [theme, setTheme] = useState(chartTheme);

  useEffect(() => {
    if (type === "pie") {
      return () => {
        chartRef.current?.clear();
      };
    }
  }, [type]);

  const options = useMemo<EChartOption>(() => {
    if (type === "pie") {
      chartRef.current?.clear();
    }

    if (isEmpty(data)) {
      chartRef.current?.clear();
      return {};
    }

    const sorted = data?.sort(compareValues("desc", "count"));

    const categoryAxis: AnyObject = {
      type: "category",
      name: title ?? "Count Series",
      nameLocation: "center",
      axisTick: {
        show: false,
      },
      data: [],
    } as EChartOption.XAxis;
    const valueAxis: AnyObject = {
      type: "value",
    } as EChartOption.YAxis;

    const series =
      type === "pie"
        ? [
            {
              type: "pie",
              name: title ?? "Count Series",
              data: sorted.map((item, index) => ({
                id: item.key,
                value: item.count,
                name: item.label ?? item.key,
              })),
            },
          ]
        : sorted.map((item, index) => ({
            id: item.key,
            type: "bar",
            label: {
              show: true,
              rotate: type === "column" ? 90 : 0,
              formatter: "{a}",
              position: "inside",
              color: "#fff",
            },
            data: [
              {
                name: title ?? "Count Series",
                value: item.count,
              },
            ],
            name: item.label ?? item.key,
          }));
    return {
      series,
      countSeries: true,
      xAxis: type === "pie" ? null : type === "bar" ? valueAxis : categoryAxis,
      yAxis: type === "pie" ? null : type === "bar" ? categoryAxis : valueAxis,
    };
  }, [data, title, type]);

  return (
    <ChartContainer
      theme={theme}
      options={options}
      chartRef={chartRef}
      isEmpty={isEmpty(data)}
      emptyIcon={Icons.Pie}
      dataTableRenderer={countRenderer}
      onClick={(e) => onClick?.(e.data.id ?? e.seriesId)}
    >
      <ChartToolbar>
        <label>{title}</label>
        <AxButton
          size="sm"
          style="link"
          className="flush"
          icon={Icons.Pie}
          isActive={type === "pie"}
          onClick={() => setType("pie")}
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
        <AxDivider size="xs" vertical />
        <PaletteSelect theme={theme} onClick={setTheme} />
      </ChartToolbar>
    </ChartContainer>
  );
};

export const CountSeries: FC<CountSeriesProps> = (props) => (
  <ChartWrapper>
    <CountSeriesChart {...props} />
  </ChartWrapper>
);
