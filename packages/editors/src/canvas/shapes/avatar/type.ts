/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  DefaultColorStyle,
  DefaultDashStyle,
  DefaultFillStyle,
  DefaultFontStyle,
  DefaultHorizontalAlignStyle,
  DefaultSizeStyle,
  T,
  TLBaseShape,
} from "@tldraw/tldraw";
import { ShapePropsType } from "@tldraw/tlschema/src/shapes/TLBaseShape";

export const AvatarShapeProps = {
  color: DefaultColorStyle,
  fill: DefaultFillStyle,
  dash: DefaultDashStyle,
  size: DefaultSizeStyle,
  font: DefaultFontStyle,
  align: DefaultHorizontalAlignStyle,
  text: T.string,
};

export type AvatarShape = TLBaseShape<
  "avatar",
  ShapePropsType<typeof AvatarShapeProps>
>;
