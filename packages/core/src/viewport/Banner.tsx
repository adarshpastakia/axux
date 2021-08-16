// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useCallback, useState } from "react";
import { AxButton } from "../buttons/Button";
import { AllColors, ElementProps, EmptyCallback } from "../types";
import { AppIcons } from "../types/appIcons";

/** @internal */
export interface ViewportBannerProps extends ElementProps {
  color?: AllColors;
  onClose?: EmptyCallback;
}

/**
 * Viewport banner
 * @param className
 * @param children
 * @param theme
 * @param onClose
 * @param aria
 * @constructor
 * @internal
 */
export const AxViewportBanner: FC<ViewportBannerProps> = ({
  className,
  children,
  color = "primary",
  onClose,
  ...aria
}) => {
  const [isClosed, setClosed] = useState(false);
  const handleClose = useCallback(() => {
    setClosed(true);
    onClose && onClose();
  }, [onClose]);
  return isClosed ? null : (
    <div
      className={`ax-viewport__banner ax-bg--${color} ax-color--contrast ${className ?? ""}`}
      {...aria}
    >
      <span>{children}</span>
      <AxButton size="sm" type="link" icon={AppIcons.iconClose} onClick={handleClose} />
    </div>
  );
};
