/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { debounce, isEmpty } from "@axux/utilities";
import { endOfDay, startOfDay } from "date-fns";
import { type EChartOption, type EChartsType } from "echarts";
import { type FC, useEffect, useMemo, useRef, useState } from "react";
import { type BaseChart } from "../types";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartWrapper } from "../wrapper/ChartWrapper";

export interface TimeSliderProps extends BaseChart {
  data: Array<[Date, number]>;
  range?: { start: Date; end: Date };
  onBrush?: (range: { start: Date; end: Date }) => void;
}

const TimeSliderChart: FC<TimeSliderProps> = ({
  data,
  range: sliderRange,
  onBrush,
}) => {
  const chartRef = useRef<EChartsType>(null);

  const [range, setRange] = useState({ startValue: 0, endValue: 0 });
  const handleBrush = useMemo(
    () => debounce((range: AnyObject) => onBrush?.(range), 100),
    [onBrush]
  );

  useEffect(() => {
    const defaultStart = data.length > 0 ? data?.[0]?.[0]?.getTime() : 0;
    const defaultEnd =
      data.length > 0 ? data?.[data.length - 1]?.[0]?.getTime() : 32;

    const getRangeValue = (v: number = 0, def = 0) =>
      v >= defaultStart && v <= defaultEnd ? v : def;
    setRange({
      startValue: getRangeValue(sliderRange?.start.getTime(), defaultStart),
      endValue: getRangeValue(sliderRange?.end.getTime(), defaultEnd),
    });
  }, [sliderRange, data]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart && !chart?.isDisposed()) {
      chart.on("datazoom", () => {
        const zoom = chart.getOption().dataZoom?.[0];
        if (zoom) {
          const startValue = Math.floor(zoom.startValue as number);
          const endValue = Math.ceil(
            (zoom.endValue as number) + (24 * 60 * 60 * 1000 - 1)
          );
          handleBrush({
            start: startOfDay(new Date(startValue)),
            end: endOfDay(new Date(endValue)),
          });
          setRange({ startValue, endValue });
        }
      });
      return () => {
        !chart.isDisposed() && chart.off("datazoom");
      };
    }
  }, [chartRef.current, handleBrush]);

  const options = useMemo<EChartOption>(() => {
    if (isEmpty(data)) {
      chartRef.current?.clear();
      return {};
    }

    const categoryAxis: AnyObject = {
      type: "time",
      nameGap: 0,
      nameLocation: "center",
      axisTick: {
        show: false,
      },
      axisLabel: {
        inside: true,
      },
      axisLine: {
        show: false,
      },
      position: "bottom",
    } as EChartOption.XAxis;
    const valueAxis: AnyObject = {
      type: "value",
      nameGap: 24,
      axisLabel: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      nameLocation: "center",
    } as EChartOption.YAxis;

    const series = [
      {
        areaStyle: {},
        symbol: "none",
        type: "line",
        smooth: true,
        lineStyle: { width: 2 },
        data,
      } as AnyObject,
    ];

    return {
      grid: {
        top: 4,
        left: 0,
        right: 0,
        bottom: "50%",
      },
      xAxis: categoryAxis,
      yAxis: valueAxis,
      series,
      toolbox: {
        show: false,
      },
      legend: {
        show: false,
      },
      dataZoom: [
        {
          type: "slider",
          height: "45%",
          bottom: 4,
          left: 2,
          right: 8,
          ...range,
        },
      ],
      tooltip: {
        trigger: "axis",
        confine: true,
        position: "top",
      } as AnyObject,
    };
  }, [data, range]);

  return (
    <ChartContainer
      options={options}
      chartRef={chartRef}
      isEmpty={isEmpty(data)}
    />
  );
};

export const TimeSlider: FC<TimeSliderProps> = (props) => (
  <ChartWrapper>
    <TimeSliderChart {...props} />
  </ChartWrapper>
);
