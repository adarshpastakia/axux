// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxDivider } from "@axux/core";
import { Color, ColorPalette } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, useMemo } from "react";

export interface ProfileCardProps {
  avatarImage?: string;
  avatarIcon?: string;
  avatarBg?: Color | ColorPalette;
  avatarColor?: Color | ColorPalette;
  headBg?: Color | ColorPalette;

  name?: string | JSX.Element;

  activityMap?: JSX.Element;

  size?: "sm" | "default" | "md";
}

export const AxProfileCard: FC<ProfileCardProps> = ({
  name,
  children,
  size,
  headBg,
  avatarBg,
  avatarColor,
  avatarIcon,
  avatarImage,
  activityMap
}) => {
  const headClass = useMemo(() => {
    return ["ax-profileCard__head", headBg ? `ax-bg--${headBg}` : "ax-bg--light"].join(" ");
  }, [headBg]);
  return (
    <div className="ax-profileCard" data-size={size}>
      <div className="ax-profileCard__inner">
        <div className={headClass}>
          <AxAvatar
            title=""
            image={avatarImage}
            icon={avatarIcon ?? AppIcons.iconFace}
            bg={avatarBg}
            color={avatarColor ?? "light"}
          />
        </div>
        <div>
          <div className="ax-profileCard__name">{name}</div>
          <AxDivider />
        </div>
        {activityMap && <div>{activityMap}</div>}
        <div className="ax-profileCard__body">{children}</div>
      </div>
    </div>
  );
};
