// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxAvatar, AxDivider } from "@axux/core";
import { AvatarProps } from "@axux/core/dist/icons/Avatar";
import { ElementProps, EmptyCallback } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { AllColors } from "@axux/core/src/types";
import { FC, useMemo } from "react";

export interface ProfileCardProps extends ElementProps {
  avatarImage?: string;
  avatarIcon?: string;
  avatarTitle?: string;
  avatarBg?: AllColors;
  avatarColor?: AllColors;
  headBg?: AllColors;

  name?: string | JSX.Element;

  activityMap?: JSX.Element;

  size?: "sm" | "default" | "md";

  infograph?: AvatarProps["infograph"];

  onClick?: EmptyCallback;
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
  avatarTitle,
  activityMap,
  infograph,
  className,
  onClick,
  ...aria
}) => {
  const headClass = useMemo(() => {
    return ["ax-profileCard__head", headBg ? `ax-bg--${headBg}` : "ax-bg--light"].join(" ");
  }, [headBg]);
  return (
    <div
      className={`ax-profileCard ${className ?? ""}`}
      data-size={size}
      {...aria}
      data-clickable={!!onClick}
      onClick={onClick}
    >
      <div className="ax-profileCard__inner">
        <div className={headClass}>
          <AxAvatar
            title={avatarTitle ?? ""}
            image={avatarImage}
            icon={avatarIcon ?? AppIcons.iconFace}
            bg={avatarBg}
            color={avatarColor}
            infograph={infograph}
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
