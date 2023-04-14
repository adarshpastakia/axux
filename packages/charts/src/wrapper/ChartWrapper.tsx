/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxErrorBoundary } from "@axux/core/dist/application/ErrorBoundary";
import "echarts-wordcloud";
import { type FC, type ReactNode } from "react";

const Error: FC<{ error?: string }> = ({ error = "" }) => {
  return (
    <div className="ax-chart__error">
      <label>Error</label> <span>{error}</span>
    </div>
  );
};

export const ChartWrapper = ({ children }: { children?: ReactNode }) => {
  return (
    <div className="ax-chart__wrapper">
      <AxErrorBoundary isMinimal errorElement={Error}>
        {children}
      </AxErrorBoundary>
    </div>
  );
};
