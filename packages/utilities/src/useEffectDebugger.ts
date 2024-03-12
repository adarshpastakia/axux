/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */
/* istanbul ignore file */

import { useEffect, useLayoutEffect, useRef } from "react";
import { TagColors, TypeColors } from "./useLogger";

const compareInputs = (
  oldInputs: AnyObject[],
  newInputs: AnyObject[],
  prefix: string,
) => {
  // Edge-case: different array lengths
  if (oldInputs.length !== newInputs.length) {
    // Not helpful to compare item by item, so just output the whole array
    console.info(
      `%c${prefix}::%cInputs have a different length`,
      TypeColors.info,
      TagColors.info,
    );
    console.info("%cOld inputs:", TypeColors.info);
    console.table(oldInputs.map((e) => (e?.tagName ? e.tagName : e)));
    console.info("%cNew inputs:", TypeColors.info);
    console.table(newInputs.map((e) => (e?.tagName ? e.tagName : e)));
    return;
  }

  // Compare individual items
  oldInputs.forEach((oldInput, index) => {
    const newInput = newInputs[index];
    if (oldInput !== newInput) {
      console.info(
        `%c${prefix}::%cThe input changed in position ${index}`,
        TypeColors.info,
        TagColors.info,
      );
      console.info("%cOld value:", TypeColors.info);
      console.table(oldInput?.tagName ? oldInput.tagName : oldInput);
      console.info("%cNew value:", TypeColors.info);
      console.table(newInput?.tagName ? newInput.tagName : newInput);
    }
  });
};

export const useEffectDebugger = (
  func: AnyObject,
  inputs: AnyObject[],
  prefix = "useEffect",
) => {
  // Using a ref to hold the inputs from the previous run (or same run for initial run
  const oldInputsRef = useRef(inputs);
  useEffect(() => {
    // Get the old inputs
    const oldInputs = oldInputsRef.current;

    // Compare the old inputs to the current inputs
    compareInputs(oldInputs, inputs, prefix);

    // Save the current inputs
    oldInputsRef.current = inputs;

    // Execute wrapped effect
    func();
  }, inputs);
};

export const useLayoutEffectDebugger = (
  func: AnyObject,
  inputs: AnyObject[],
  prefix = "useEffect",
) => {
  // Using a ref to hold the inputs from the previous run (or same run for initial run
  const oldInputsRef = useRef(inputs);
  useLayoutEffect(() => {
    // Get the old inputs
    const oldInputs = oldInputsRef.current;

    // Compare the old inputs to the current inputs
    compareInputs(oldInputs, inputs, prefix);

    // Save the current inputs
    oldInputsRef.current = inputs;

    // Execute wrapped effect
    func();
  }, inputs);
};
