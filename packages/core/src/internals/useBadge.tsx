// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty, isFalse, isObject, isTrue } from "@axux/utilities";
import { useMemo, VFC } from "react";
import { AllColors } from "../types";

/** @internal */
export interface BadgeProps {
  value?: string | number;
  color?: AllColors;
  pulse?: boolean;
}
/** @internal */
export type BadgeType = true | string | number | BadgeProps;

/** @internal */
const AxBadge: VFC<BadgeProps> = ({ color, value, pulse }) => {
  const classes = useMemo(() => {
    const cls = ["ax-badge"];

    if (pulse || isEmpty(value)) {
      cls.push("ax-badge--pulse");
      if (color) {
        cls.push(`ax-color--${color}`);
      }
    } else {
      if (color) {
        cls.push(`ax-bg--${color} ax-color--contrast`);
      } else {
        cls.push(`ax-bg--muted ax-color--invert`);
      }
    }
    return cls.join(" ");
  }, [color, pulse, value]);
  return <div className={classes}>{value}</div>;
};
AxBadge.displayName = "AxBadge";

/** @internal */
export const useBadge = (props?: BadgeType) => {
  const badgeProps = useMemo(() => {
    if (isObject(props)) {
      return props as BadgeProps;
    } else if (isTrue(props)) {
      return { pulse: true };
    } else if (!isFalse(props) && !isEmpty(props)) {
      return { value: props };
    }
  }, [props]);

  return props !== undefined ? <AxBadge {...badgeProps} /> : null;
};
