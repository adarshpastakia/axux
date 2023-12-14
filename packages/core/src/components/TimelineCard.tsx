/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { isString } from "@axux/utilities";
import { forwardRef, type ReactNode } from "react";
import { AxIcon, type IconProps } from "../icons/Icon";
import { type ChildrenProp } from "../types";
import { AppIcons } from "../types/appIcons";

export interface TimelineCardProps
  extends ChildrenProp,
    Omit<IconProps, "onClick" | "size" | "icon"> {
  /**
   * avatar size
   */
  size?: "sm" | "md" | "lg";
  /**
   * hide avatar
   */
  noAvatar?: boolean;
  /**
   * hide line
   */
  noLine?: boolean;
  /**
   * reverse layout
   */
  reverse?: boolean;
  /**
   * avatar icon
   */
  icon?: string | ReactNode;
  /**
   * icon className
   */
  iconClassName?: HTMLElement["className"];
  bodyClassName?: HTMLElement["className"];

  actions?: ReactNode | ReactNode[];
}

export const AxTimelineCard = forwardRef<HTMLDivElement, TimelineCardProps>(
  (
    {
      children,
      noLine,
      reverse,
      iconClassName,
      noAvatar,
      icon = AppIcons.iconFace,
      bg,
      color,
      rtlFlip,
      size,
      viewBox,
      animate,
      className,
      bodyClassName,
      actions,
      ...rest
    }: TimelineCardProps,
    ref
  ) => {
    /** ***************** component *******************/
    return (
      <div
        data-size={size}
        data-noline={noLine}
        data-reverse={reverse}
        className={`ax-timeline__card ${className ?? ""}`}
      >
        {!noAvatar && (
          <div className="ax-timeline__avatar">
            {isString(icon) && (
              <AxIcon
                className={iconClassName}
                {...{ icon, bg, color, rtlFlip, viewBox, animate }}
              />
            )}
            {!isString(icon) && icon}
          </div>
        )}
        <div
          ref={ref}
          {...rest}
          className={`ax-timeline__body ${bodyClassName ?? ""}`}
        >
          {children}
        </div>
        {actions}
      </div>
    );
  }
);

AxTimelineCard.displayName = "AxTimelineCard";
