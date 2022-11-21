/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxContent, useIsDark, useResizeObserver } from "@axux/core";
import { SizeObject } from "@axux/core/dist/types";
import * as echarts from "echarts";
import { EChartOption, EChartsType } from "echarts";
import "echarts-wordcloud";
import {
  Fragment,
  ReactElement,
  RefObject,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from "react";
import { registerThemes } from "../theme";
import { Theme } from "../types";
import { Icons } from "../types/icons";
import { ChartToolbar } from "./ChartToolbar";

const defaultOptions = {
  grid: {
    top: 32,
    left: 64,
    right: 32,
    bottom: 72,
  },
  tooltip: {
    trigger: "item",
    confine: true,
    position: "top",
  } as AnyObject,
  legend: {
    type: "scroll",
    bottom: 0,
  } as AnyObject,
};
const toolboxOptions = (renderer: AnyObject) => ({
  show: true,
  feature: {
    dataView: {
      show: true,
      readOnly: true,
      textareaBorderColor: "transparent",
      backgroundColor: "bg-base",
      textareaColor: "bg-base",
      textColor: "inherit",
      optionToContent: renderer,
    },
  },
});
registerThemes(echarts);

export const ChartContainer = ({
  theme = "default",
  options,
  children,
  onResize,
  onClick,
  isEmpty,
  emptyIcon,
  chartRef: _ref,
  dataTableRenderer,
}: {
  theme?: Theme;
  isEmpty?: boolean;
  emptyIcon?: string;
  options: EChartOption;
  children?: ReactElement<typeof ChartToolbar>;
  chartRef?: RefObject<EChartsType>;
  onClick?: (event: AnyObject) => void;
  dataTableRenderer?: (opt: KeyValue) => string;
  onResize?: (size: { width: number; height: number }) => void;
}) => {
  const [chartRef, setChartRef] = useState<EChartsType>();
  const isDark = useIsDark();

  const handleResize = useCallback(
    (size: SizeObject) => {
      onResize?.(size);
      chartRef?.resize(size);
    },
    [chartRef]
  );
  const containerRef = useResizeObserver(handleResize);

  useImperativeHandle<EChartsType | undefined, EChartsType | undefined>(
    _ref,
    () => chartRef,
    [chartRef]
  );

  const chartTheme = useMemo(
    () => (isDark ? `${theme}_dark` : theme),
    [theme, isDark]
  );

  useEffect(() => {
    if (containerRef.current) {
      const { offsetWidth: width, offsetHeight: height } = containerRef.current;
      const chartRef = echarts.init(containerRef.current, chartTheme);
      chartRef.resize({ width, height });
      onResize?.({ width, height });
      setChartRef(chartRef);

      return () => {
        chartRef.dispose();
      };
    }
  }, [chartTheme]);

  useEffect(() => {
    const chart = chartRef;
    if (chart) {
      onClick != null && chart.on("click", onClick);
      return () => {
        !chart.isDisposed() && chart.off("click");
      };
    }
  }, [onClick]);

  const toolbox = useMemo(
    () => toolboxOptions(dataTableRenderer),
    [dataTableRenderer]
  );

  useEffect(() => {
    chartRef?.setOption({
      ...defaultOptions,
      toolbox,
      ...options,
    });
  }, [options, chartRef]);

  return (
    <Fragment>
      <div>{children}</div>
      <div ref={containerRef} className="overflow-hidden" />
      {isEmpty && (
        <AxContent.Empty icon={emptyIcon ?? Icons.Line} message="Empty chart" />
      )}
    </Fragment>
  );
};
