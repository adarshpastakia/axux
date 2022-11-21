/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Countries, isEmpty } from "@axux/utilities";
import * as echarts from "echarts";
import { EChartOption, EChartsType } from "echarts";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { ChartPalette } from "../theme";
import { BaseChart, CountType } from "../types";
import { countRenderer } from "../types/utils";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartToolbar } from "../wrapper/ChartToolbar";
import { ChartWrapper } from "../wrapper/ChartWrapper";

import WorldMap from "../types/world.svg";
void fetch(WorldMap)
  .then(async (resp) => await resp.text())
  .then((svg) => echarts.registerMap("world", { svg }));

export interface MapSeriesProps extends BaseChart, CountType {
  onClick?: (key: string) => void;
}

const MapSeriesChart: FC<MapSeriesProps> = ({
  data,
  theme: chartTheme,
  title,
  onClick,
}) => {
  const chartRef = useRef<EChartsType>(null);
  const [zoom, setZoom] = useState(1.25);

  const options = useMemo<EChartOption>(() => {
    if (isEmpty(data)) return {};

    const valueMap = data.map((d) => d.count);

    return {
      legend: {
        show: false,
      },
      visualMap: {
        type: "piecewise",
        min: Math.min(...valueMap) - 1,
        max: Math.max(...valueMap) + 1,
        show: false,
        color: [...ChartPalette.Heatmap],
        calculable: true,
        orient: "horizontal",
        left: "center",
        bottom: 48,
      } as AnyObject,
      series: [
        {
          name: title ?? "Map Series",
          type: "map",
          map: "world",
          aspectScale: 1,
          zoom,
          roam: "move",
          colorBy: "data",
          nameProperty: "name",
          emphasis: {
            label: { show: false },
          },
          select: {
            disabled: true,
          },
          data: data.map(({ id: key, count: value }) => ({
            name: Countries.name(key),
            id: key,
            value,
          })),
        },
      ],
    };
  }, [data, title, zoom]);

  useEffect(() => {
    setZoom(1.25);
  }, [data]);

  return (
    <ChartContainer
      chartRef={chartRef}
      options={options}
      dataTableRenderer={countRenderer}
      onClick={(e) => e.data && onClick?.(e?.data?.id ?? "")}
    >
      <ChartToolbar>
        <label>{title}</label>
        <div className="ax-chart__slider">
          <input
            type="range"
            min={1.25}
            max={24}
            step={0.25}
            value={zoom}
            onChange={(e) => setZoom(e.target.valueAsNumber)}
          />
        </div>
      </ChartToolbar>
    </ChartContainer>
  );
};

export const MapSeries: FC<MapSeriesProps> = (props) => (
  <ChartWrapper>
    <MapSeriesChart {...props} />
  </ChartWrapper>
);
