// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, Fragment, useMemo } from "react";
import { AllColors, Size } from "../types";
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
    <Fragment>
      <div className={`ax-loader--progress ax-color--${color}`} />
      <div className={classes} data-size={size}>
        {children && (
          <div className="ax-loader__content">
            {children && <AxText color={color}>{children}</AxText>}
          </div>
        )}
      </div>
    </Fragment>
  );
};
AxLoader.displayName = "AxLoader";
