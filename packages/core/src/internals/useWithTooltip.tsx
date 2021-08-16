// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isObject } from "@axux/utilities";
import { Fragment, useMemo } from "react";
import { AxTooltip, TooltipProps } from "../overlays/Tooltip";

export interface WithTooltipProps {
  /**
   * Tooltip
   */
  tooltip?: string | TooltipProps;
}

export const useWithTooltip = (tooltip: WithTooltipProps["tooltip"], inheritRef?: AnyObject) => {
  const Wrapper = useMemo(() => (isEmpty(tooltip) ? Fragment : AxTooltip), [tooltip]);

  const tooltipProps = useMemo<AnyObject>(() => {
    if (isObject(tooltip)) {
      return { ...tooltip, inheritRef };
    }
    if (!isEmpty(tooltip)) {
      return { content: tooltip, inheritRef };
    }
    return {};
  }, [inheritRef, tooltip]);

  return { Wrapper, tooltipProps };
};
