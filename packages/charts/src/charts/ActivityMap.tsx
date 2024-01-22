/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxDivider } from "@axux/core";
import { isArray, isEmpty } from "@axux/utilities";
import { type EChartOption, type EChartsType } from "echarts";
import { useEffect, useMemo, useRef, useState, type FC } from "react";
import { ChartPalette } from "../theme";
import { type BaseChart } from "../types";
import { Icons } from "../types/icons";
import { activityRenderer } from "../types/utils";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartWrapper } from "../wrapper/ChartWrapper";
import { PaletteSelect } from "../wrapper/PaletteSelect";

export interface ActivityMapProps extends BaseChart {
  heatmapPalette?: string[];
  data: Array<Array<[low: number, high: number, count: number]>>;
  time?: "day-hour" | "month-day";
  type?: "scatter" | "heatmap";
  /**
   * day/month names
   */
  highLabels?: string[];
  /**
   * hours/day names
   */
  lowLabels?: string[];
  onClick?: (highIndex: number, lowIndex: number) => void;
}

const DAY_HOUR = {
  high: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  low: [
    "12a",
    "1a",
    "2a",
    "3a",
    "4a",
    "5a",
    "6a",
    "7a",
    "8a",
    "9a",
    "10a",
    "11a",
    "12p",
    "1p",
    "2p",
    "3p",
    "4p",
    "5p",
    "6p",
    "7p",
    "8p",
    "9p",
    "10p",
    "11p",
  ],
};
const MONTH_DAY = {
  high: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  low: [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ],
};

const ActivityMapChart: FC<ActivityMapProps> = ({
  data = [],
  title,
  onExport,
  theme: chartTheme = "activity",
  heatmapPalette,
  highLabels,
  lowLabels,
  time = "day-hour",
  type: chartType = "scatter",
  onClick,
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

  const options = useMemo<EChartOption>(() => {
    chartRef.current?.clear();

    const defaultMap = time === "day-hour" ? DAY_HOUR : MONTH_DAY;

    const options: KeyValue = {
      series: [],
    };

    if (isEmpty(data)) return {};

    options.xAxis = {
      type: "category",
      data: lowLabels ?? defaultMap.low,
      boundaryGap: type === "heatmap",
      splitLine: {
        show: true,
      },
      axisLine: {
        show: false,
      },
    };
    options.yAxis = {
      type: "category",
      data: highLabels ?? defaultMap.high,
      axisLine: {
        show: false,
      },
    };
    options.series = data.map((points, index) => {
      const total = points.reduce((t, p) => t + p[2], 0);
      return {
        id: index,
        name: defaultMap.high[index],
        type,
        symbolSize: function (dataItem: number[]) {
          return dataItem[2] === 0
            ? 0
            : Math.min(Math.max(4, (dataItem[2] / total) * 256), 48);
        },
        data: points,
      };
    });

    if (type === "heatmap") {
      const dataPoints = data.map((points) =>
        Math.max(...points.map((pt) => pt[2]))
      );
      options.grid = {
        top: 32,
        bottom: 128,
      };
      options.visualMap = {
        type: "piecewise",
        min: 1,
        show: type === "heatmap",
        color: heatmapPalette ?? [...ChartPalette.Heatmap],
        max: Math.max(...dataPoints),
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 48,
      };
    }

    return {
      grid: {
        top: 32,
        bottom: 64,
      },
      tooltip: {
        trigger: "item",
        confine: true,
        position: "top",
        valueFormatter: (c: AnyObject) => {
          return isArray(c) ? c[2] : c;
        },
      } as AnyObject,
      ...options,
    };
  }, [data, title, type]);

  return (
    <ChartContainer
      title={title}
      onExport={onExport}
      theme={theme}
      options={options}
      chartRef={chartRef}
      isEmpty={isEmpty(data)}
      emptyIcon={Icons.ActivityScatter}
      dataTableRenderer={activityRenderer}
      onClick={(e) => onClick?.(e.seriesIndex, e.dataIndex)}
    >
      <AxButton
        size="sm"
        variant="link"
        className="flush"
        icon={Icons.ActivityScatter}
        isActive={type === "scatter"}
        onClick={() => setType("scatter")}
      />
      <AxButton
        size="sm"
        variant="link"
        className="flush"
        icon={Icons.ActivityCalendar}
        isActive={type === "heatmap"}
        onClick={() => setType("heatmap")}
      />
      <AxDivider size="xs" vertical />
      <PaletteSelect theme={theme} onClick={setTheme} defaultTheme="activity" />
    </ChartContainer>
  );
};

export const ActivityMap: FC<ActivityMapProps> = (props) => (
  <ChartWrapper>
    <ActivityMapChart {...props} />
  </ChartWrapper>
);
