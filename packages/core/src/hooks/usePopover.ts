/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isRtl } from "@axux/utilities";
import { Placement } from "@popperjs/core";
import { defaultModifiers } from "@popperjs/core/lib/popper";
import { useState } from "react";
import { Modifier, usePopper } from "react-popper";

/******************* popperjs: same width modifier *******************/
const sameWidthModifier: Modifier<"sameWidth", KeyValue> = {
  name: "sameWidth",
  enabled: true,
  phase: "afterWrite",
  requires: ["computeStyles"],
  fn: ({ state }: KeyValue) => {
    state.styles.popper = {
      ...state.styles.popper,
      width: `${state.rects.reference.width}px`,
    };
  },
  effect: ({ state }: KeyValue) => {
    state.elements.popper.style.width = `${
      (state.elements.reference as HTMLElement).offsetWidth
    }px`;
  },
};

/******************* popperjs: rtl flip *******************/
const rtlFlip: Modifier<"rtlFlip", KeyValue> = {
  name: "rtlFlip",
  enabled: true,
  phase: "beforeRead",
  fn: ({ state }: KeyValue) => {
    if (isRtl()) {
      const hash: KeyValue = {
        end: "start",
        start: "end",
        left: "right",
        right: "left",
      };
      state.placement = state.placement.replace(
        /start|end|left|right/g,
        (matched: string) => hash[matched]
      );
    }
  },
};

defaultModifiers.push(sameWidthModifier as AnyObject, rtlFlip as AnyObject);

export const usePopover = (
  options: { placement: Placement; sameWidth: boolean; hideArrow: boolean } = {
    hideArrow: false,
    sameWidth: false,
    placement: "bottom",
  }
) => {
  const [referenceElement, setReferenceElement] = useState<any>();
  const [popperElement, setPopperElement] = useState<any>();
  const [arrowElement, setArrowElement] = useState<any>();

  /******************* popperjs *******************/
  const { styles, attributes, forceUpdate } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: options.placement,
      strategy: "fixed",
      modifiers: [
        {
          name: "arrow",
          enabled: !options.hideArrow,
          options: {
            element: arrowElement,
            padding: 10,
          },
        },
        {
          name: "offset",
          options: {
            offset: [0, options.hideArrow ? 0 : 5],
          },
        },
        { name: "rtlFlip" },
        { name: "sameWidth", enabled: !!options.sameWidth },
      ],
    }
  );

  return {
    styles,
    attributes,
    popperElement,
    referenceElement,
    forceUpdate,
    setArrowElement,
    setPopperElement,
    setReferenceElement,
  };
};
