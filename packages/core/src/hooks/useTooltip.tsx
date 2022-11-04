/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { isEmpty, isString } from "@axux/utilities";
import { Placement } from "@popperjs/core";
import { cloneElement, Fragment, Ref, useCallback, useMemo } from "react";
import { AxTooltip } from "../overlays/Tooltip";
import { ChildProp, TooltipType } from "../types";

export const useTooltip = (
  options?: TooltipType,
  isDisabled = false,
  placement: Placement = "top"
) => {
  /******************* normalize tooltip props *******************/
  const props = useMemo(() => {
    if (isString(options)) {
      return { content: options, placement };
    }
    return options;
  }, [options, placement]);

  /******************* tooltip wrapper *******************/
  const el = useCallback(
    ({ children, ...rest }: ChildProp & { innerRef?: Ref<HTMLElement> }) => {
      if (isEmpty(props)) {
        return (
          <Fragment>
            {cloneElement(children as AnyObject, { ref: rest.innerRef })}
          </Fragment>
        );
      }
      return (
        <AxTooltip {...props} {...rest} isDisabled={isDisabled}>
          {children}
        </AxTooltip>
      );
    },
    [props, isDisabled]
  );
  // @ts-ignore
  el.displayName = "Tooltip.Wrapper";

  return el;
};
