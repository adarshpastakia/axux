// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { MarginProps } from "../types";
import { multipleValues } from "./_multipleValues";

/** @internal */
export const makeMargin = ({
  margin,
  marginX,
  marginY,
  marginTop,
  marginBottom,
  marginStart,
  marginEnd
}: MarginProps) => {
  const cls = [];
  cls.push(multipleValues("ax-margin", margin));
  cls.push(multipleValues("ax-margin--x", marginX));
  cls.push(multipleValues("ax-margin--y", marginY));
  cls.push(multipleValues("ax-margin--t", marginTop));
  cls.push(multipleValues("ax-margin--b", marginBottom));
  cls.push(multipleValues("ax-margin--s", marginStart));
  cls.push(multipleValues("ax-margin--e", marginEnd));
  return cls.join(" ");
};
