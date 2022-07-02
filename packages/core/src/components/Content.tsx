/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC } from "react";
import { ChildrenProp, ElementProps, Gutter } from "../types";
import { EmptyContent } from "./EmptyContent";

/**
 * content panel
 */
export const AxContent: FC<
  ElementProps &
    ChildrenProp & {
      /**
       * padding
       */
      padding?: Gutter;
    }
> & { Empty: typeof EmptyContent } = ({ className, padding, ...rest }) => (
  <div
    {...rest}
    data-padding={padding}
    className={`ax-content ${className ?? ""}`}
  />
);
AxContent.Empty = EmptyContent;
AxContent.displayName = "AxContent";
AxContent.Empty.displayName = "AxContent.Empty";
