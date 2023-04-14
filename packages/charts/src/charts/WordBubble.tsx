/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useIsDark } from "@axux/core";
import { compareValues, isEmpty } from "@axux/utilities";
import { type EChartOption } from "echarts";
import { type FC, useMemo } from "react";
import { ChartPalette } from "../theme";
import { type BaseChart, type CountType } from "../types";
import { Icons } from "../types/icons";
import { countRenderer } from "../types/utils";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartToolbar } from "../wrapper/ChartToolbar";
import { ChartWrapper } from "../wrapper/ChartWrapper";

export interface WordBubbleProps extends Omit<BaseChart, "theme">, CountType {
  onClick?: (key: string) => void;
}

const WordBubbleChart: FC<WordBubbleProps> = ({ data, title, onClick }) => {
  const isDark = useIsDark();

  const options = useMemo<EChartOption>(() => {
    if (isEmpty(data)) return {};

    const palette = isDark ? ChartPalette.CloudDark : ChartPalette.CloudLight;

    return {
      legend: undefined,
      series: [
        {
          name: title,
          type: "wordCloud",
          shape: "circle",
          sizeRange: [12, 60],
          gridSize: 32,
          rotationRange: [-1, 1],
          rotationStep: 1,
          drawOutOfBound: false,
          layoutAnimation: true,
          textStyle: {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            color: ({ dataIndex }: KeyValue) =>
              palette[dataIndex % palette.length],
          },
          data: data
            .sort(compareValues("desc", "count"))
            .map(({ id: key, label, count }, index) => ({
              name: label ?? key,
              value: count,
            })),
        },
      ],
    };
  }, [data, title, isDark]);

  return (
    <ChartContainer
      options={options}
      isEmpty={isEmpty(data)}
      emptyIcon={Icons.ActivityScatter}
      dataTableRenderer={countRenderer}
      onClick={(e) => onClick?.(e?.name ?? "")}
    >
      <ChartToolbar>
        <label>{title}</label>
      </ChartToolbar>
    </ChartContainer>
  );
};

export const WordBubble: FC<WordBubbleProps> = (props) => (
  <ChartWrapper>
    <WordBubbleChart {...props} />
  </ChartWrapper>
);
