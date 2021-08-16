// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, useMemo } from "react";
import { AllColors, MarginProps, Size, TextAlign } from "../types";
import { AxText } from "../typography/Text";

/** @internal */
export interface DividerProps extends Pick<MarginProps, "margin"> {
  /**
   * Vertical divider for toolbars and flexbox
   */
  vertical?: boolean;
  /**
   * @default false
   */
  rainbow?: boolean;
  /**
   * Label alignment
   */
  align?: TextAlign;
  /**
   * Divider color
   */
  color?: AllColors;
  /**
   * Label size
   */
  size?: Size | string | number;
}

/**
 * Divider
 * @param children
 * @param margin
 * @param marginEnd
 * @param align
 * @param color
 * @param rainbow
 * @param vertical
 * @constructor
 * @internal
 */
export const AxDivider: FC<DividerProps> = ({
  children,
  margin = "sm",
  align = "start",
  color,
  rainbow = false,
  size,
  vertical = false
}) => {
  const classes = useMemo(() => {
    const cls = ["ax-divider"];
    if (vertical) {
      cls.push(`ax-margin--x--${margin}`);
    } else {
      cls.push(`ax-margin--y--${margin}`);
    }
    return cls.join(" ");
  }, [margin, vertical]);

  return (
    <div
      className={classes}
      data-vertical={vertical}
      data-rainbow={rainbow}
      data-align={align}
      data-has-label={!!children}
    >
      <hr data-vertical={vertical} />
      {children && (
        <AxText color={color} size={size}>
          {children}
        </AxText>
      )}
      {children && <hr />}
    </div>
  );
};
AxDivider.displayName = "AxDivider";
