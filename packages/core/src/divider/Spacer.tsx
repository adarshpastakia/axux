// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, VFC } from "react";
import { Size } from "../types";

const Flex: VFC = () => <div style={{ flex: "1 1 1em" }} />;

interface ExtendedFC extends FC<{ size?: Size; children?: never }> {
  Flex: typeof Flex;
}

/** @internal */
export const AxSpacer: ExtendedFC = ({ size }) =>
  (
    <div className={`ax-margin${size ? "--" + size : ""}`} style={{ width: 1, height: 1 }} />
  ) as AnyObject;
AxSpacer.Flex = Flex;

AxSpacer.displayName = "AxSpacer";
AxSpacer.Flex.displayName = "AxSpacer.Flex";
