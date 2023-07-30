/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider } from "@axux/core";
import { isEmpty } from "@axux/utilities";
import { type EChartOption, type EChartsType } from "echarts";
import { type FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { type BaseChart, type TimeSeriesType } from "../types";
import { Icons } from "../types/icons";
import { timeSeriesRenderer } from "../types/utils";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartToolbar } from "../wrapper/ChartToolbar";
import { ChartWrapper } from "../wrapper/ChartWrapper";
import { PaletteSelect } from "../wrapper/PaletteSelect";

export interface TimeSeriesProps extends BaseChart, TimeSeriesType {
  type?: "line" | "column" | "line-stacked" | "column-stacked";
  onClick?: (data: { category: string; series: string }) => void;
  onBrush?: (range: { start: Date; end: Date }) => void;
}

const TimeSeriesChart: FC<TimeSeriesProps> = ({
  data,
  categoryAxisName,
  valueAxisName,
  title,
  theme: chartTheme,
  type: chartType = "column",
  onClick,
  onBrush,
}) => {
  const chartRef = useRef<EChartsType>(null);
  const [type, setType] = useState(chartType);
  const [theme, setTheme] = useState(chartTheme);

  useEffect(() => {
    setType(chartType);
  }, [chartType]);
  useEffect(() => {
    setTheme(chartTheme);
  }, [chartTheme]);

  const enableBrush = useCallback(() => {
    chartRef.current?.dispatchAction({
      type: "restore",
    });
    chartRef.current?.dispatchAction({
      type: "takeGlobalCursor",
      // If intending to enable brush, must set. Otherwise, the mouse will be disabled to brush.
      key: "brush",
      brushOption: {
        // See more info in the `brushType` of "brush component".
        // If set as `false`, the mouse is disabled to brush.
        brushType: "lineX",
        // See more info in the `brushModel` of "brush component".
        // IF not set, use the `brushMode` of brush component.
        brushMode: "rect",
      },
    });
  }, []);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && !chart?.isDisposed()) {
      enableBrush();
      let range = [0, 0];
      chart.on("brushselected", (e: KeyValue) => {
        range = e.batch?.[0]?.areas?.[0]?.coordRange;
      });
      chart.on("brushEnd", () => {
        onBrush?.({ start: new Date(range?.[0]), end: new Date(range?.[1]) });
        enableBrush();
      });
      return () => {
        !chart.isDisposed() && chart.off("brushEnd");
        !chart.isDisposed() && chart.off("brushselected");
      };
    }
  }, [chartRef.current, onBrush]);

  const options = useMemo<EChartOption>(() => {
    if (isEmpty(data)) {
      chartRef.current?.clear();
      return {};
    }

    const stack = type.includes("stacked") ? "stack" : undefined;

    const [_type] = type.split("-");
    const categoryAxis: AnyObject = {
      name: categoryAxisName,
      type: "time",
      nameGap: 24,
      nameLocation: "center",
      axisTick: {
        show: false,
      },
    } as EChartOption.XAxis;
    const valueAxis: AnyObject = {
      name: valueAxisName,
      type: "value",
      nameGap: 24,
      nameLocation: "center",
    } as EChartOption.YAxis;

    const series = data?.map(
      (item) =>
        ({
          id: item.id,
          stack,
          areaStyle: {},
          symbol: "none",
          type: _type === "column" ? "bar" : _type,
          name: item.label ?? item.id,
          data: item.values,
        } as AnyObject)
    );

    return {
      xAxis: categoryAxis,
      yAxis: valueAxis,
      series,
      brush: {
        toolbox: ["lineX"],
        brushType: "lineX",
        xAxisIndex: 0,
      },
      tooltip: {
        trigger: "axis",
        confine: true,
        position: "top",
      } as AnyObject,
    };
  }, [data, type, categoryAxisName, valueAxisName]);

  return (
    <ChartContainer
      theme={theme}
      options={options}
      chartRef={chartRef}
      isEmpty={isEmpty(data)}
      emptyIcon={Icons.Column}
      dataTableRenderer={timeSeriesRenderer}
      onClick={(e) => onClick?.({ category: e.data[0], series: e.seriesId })}
    >
      <ChartToolbar>
        <label>{title}</label>
        <AxButton
          size="sm"
          variant="link"
          className="flush"
          icon={Icons.Line}
          isActive={type === "line"}
          onClick={() => setType("line")}
        />
        <AxButton
          size="sm"
          variant="link"
          className="flush"
          icon={Icons.Column}
          isActive={type === "column"}
          onClick={() => setType("column")}
        />
        <AxButton
          size="sm"
          variant="link"
          className="flush"
          icon={Icons.LineStacked}
          isActive={type === "line-stacked"}
          onClick={() => setType("line-stacked")}
        />
        <AxButton
          size="sm"
          variant="link"
          className="flush"
          icon={Icons.ColumnStacked}
          isActive={type === "column-stacked"}
          onClick={() => setType("column-stacked")}
        />
        <AxDivider size="xs" vertical />
        <PaletteSelect theme={theme} onClick={setTheme} />
      </ChartToolbar>
    </ChartContainer>
  );
};

export const TimeSeries: FC<TimeSeriesProps> = (props) => (
  <ChartWrapper>
    <TimeSeriesChart {...props} />
  </ChartWrapper>
);
