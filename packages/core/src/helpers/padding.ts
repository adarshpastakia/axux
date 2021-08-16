// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { PaddingProps } from "../types";
import { multipleValues } from "./_multipleValues";

/** @internal */
export const makePadding = ({
  padding,
  paddingX,
  paddingY,
  paddingTop,
  paddingBottom,
  paddingStart,
  paddingEnd
}: PaddingProps) => {
  const cls = [];
  cls.push(multipleValues("ax-padding", padding));
  cls.push(multipleValues("ax-padding--x", paddingX));
  cls.push(multipleValues("ax-padding--y", paddingY));
  cls.push(multipleValues("ax-padding--t", paddingTop));
  cls.push(multipleValues("ax-padding--b", paddingBottom));
  cls.push(multipleValues("ax-padding--s", paddingStart));
  cls.push(multipleValues("ax-padding--e", paddingEnd));
  return cls.join(" ");
};
