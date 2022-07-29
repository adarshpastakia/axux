/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { EChartOption, EChartsType } from "echarts";
import { FC, RefObject, useImperativeHandle, useRef } from "react";
import { BaseChart } from "../types";
import { ChartContainer } from "../wrapper/ChartContainer";
import { ChartToolbar } from "../wrapper/ChartToolbar";
import { ChartWrapper } from "../wrapper/ChartWrapper";

export interface GenericProps extends BaseChart {
  chartRef?: RefObject<EChartsType>;

  legend?: EChartOption["legend"];
  toolbox?: EChartOption["toolbox"];
  tooltip?: EChartOption["tooltip"];

  /**
   * 2d axis
   */
  xAxis?: EChartOption["xAxis"];
  /**
   * 2d axis
   */
  yAxis?: EChartOption["yAxis"];
  /**
   * chart series
   */
  series?: EChartOption["series"];

  /**
   * polar series
   */
  polar?: EChartOption["polar"];
  /**
   * polar axis
   */
  angleAxis?: EChartOption["angleAxis"];
  /**
   * polar axis
   */
  radiusAxis?: EChartOption["radiusAxis"];

  /**
   * radar series
   */
  radar?: EChartOption["radar"];

  /**
   * paarllel series
   */
  parallel?: EChartOption["parallel"];
  /**
   * parallel axis
   */
  parallelAxis?: EChartOption["parallelAxis"];

  onClick?: (e: KeyValue) => void;
  onRendered?: (e: KeyValue) => void;

  onBrush?: (e: KeyValue) => void;
  onBrushEnd?: (e: KeyValue) => void;
  onBrushSelected?: (e: KeyValue) => void;
}

const GenericChart: FC<GenericProps> = ({
  chartRef: _ref,
  onBrush,
  onBrushEnd,
  onBrushSelected,
  onClick,
  onRendered,
  title,
  theme,
  ...options
}) => {
  const chartRef = useRef<EChartsType>(null);

  useImperativeHandle(_ref, () => chartRef.current!, [chartRef.current]);

  return (
    <ChartContainer theme={theme} options={options} chartRef={chartRef}>
      <ChartToolbar>
        <label>{title}</label>
      </ChartToolbar>
    </ChartContainer>
  );
};

export const Generic: FC<GenericProps> = (props) => (
  <ChartWrapper>
    <GenericChart {...props} />
  </ChartWrapper>
);
