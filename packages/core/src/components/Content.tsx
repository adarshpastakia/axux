/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { forwardRef, type FC, type UIEventHandler } from "react";
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
    /**
     * scroll handler
     */
    onScroll?: UIEventHandler;
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
