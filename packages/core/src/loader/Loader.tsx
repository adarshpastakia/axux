// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useMemo } from "react";
import { AxIcon } from "../icons/Icon";
import { AllColors, Size } from "../types";
import { AppIcons } from "../types/appIcons";
import { AxText } from "../typography/Text";

/** @internal */
export interface LoaderProps {
  /**
   * Spinner color
   */
  color?: AllColors;
  /**
   * Spinner size
   */
  size?: Size;
  /**
   * Apply background blur
   */
  blur?: boolean;
}

/**
 * Loading indicator for pages/panels
 * @param color
 * @param size
 * @param blur
 * @param children
 * @constructor
 * @internal
 */
export const AxLoader: FC<LoaderProps> = ({ color = "primary", size, blur, children }) => {
  const classes = useMemo(() => {
    const cls = ["ax-loader"];
    if (color) {
      cls.push(`ax-color--${color}`);
    }
    if (blur) {
      cls.push(`ax-loader--blur`);
    }
    return cls.join(" ");
  }, [blur, color]);

  return (
    <div className={classes} data-size={size}>
      <div className="ax-loader__content">
        <AxIcon spin icon={AppIcons.iconLoader} />
        {children && <AxText color={color}>{children}</AxText>}
      </div>
    </div>
  );
};
AxLoader.displayName = "AxLoader";
