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
import { AppIcons } from "../types/appIcons";
import { AxCard, type CardProps } from "./Card";

export interface TimelineCardProps
  extends CardProps,
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
}

export const AxTimelineCard = forwardRef<HTMLElement, TimelineCardProps>(
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
        <AxCard
          ref={ref}
          {...rest}
          className={`ax-timeline__body ${bodyClassName ?? ""}`}
        >
          {children}
        </AxCard>
      </div>
    );
  }
);

AxTimelineCard.displayName = "AxTimelineCard";
