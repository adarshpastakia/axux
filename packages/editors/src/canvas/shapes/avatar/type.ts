/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import {
  DefaultColorStyle,
  DefaultFillStyle,
  DefaultFontStyle,
  DefaultSizeStyle,
  T,
  type TLBaseShape,
} from "@tldraw/tldraw";

export const AvatarShapeProps = {
  color: DefaultColorStyle,
  fill: DefaultFillStyle,
  size: DefaultSizeStyle,
  font: DefaultFontStyle,
  text: T.string,
};

export type AvatarShape = TLBaseShape<"avatar", typeof AvatarShapeProps>;
