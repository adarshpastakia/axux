/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { forwardRef, type FC } from "react";
import {
  type ChildrenProp,
  type ElementProps,
  type Gutter,
  type RefProp,
} from "../types";
import { EmptyContent } from "./EmptyContent";

type Props = ElementProps &
  ChildrenProp &
  RefProp<HTMLDivElement> & {
    /**
     * padding
     */
    padding?: Gutter;
  };
/**
 * content panel
 */
export const AxContent: FC<Props> & { Empty: typeof EmptyContent } = forwardRef<
  HTMLDivElement,
  Props
>(({ className, padding, ...rest }: Props, ref) => (
  <div
    {...rest}
    ref={ref}
    data-padding={padding}
    className={`ax-content ${className ?? ""}`}
  />
)) as AnyObject;
AxContent.Empty = EmptyContent;
AxContent.displayName = "AxContent";
AxContent.Empty.displayName = "AxContent.Empty";
