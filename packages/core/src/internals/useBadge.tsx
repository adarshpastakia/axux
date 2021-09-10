// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isBoolean, isEmpty, isObject, isTrue } from "@axux/utilities";
import { useMemo, VFC } from "react";
import { isColor } from "../helpers";
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
  const styles = useMemo<AnyObject>(() => {
    const ret: KeyValue = {};
    if (color && isColor(color)) {
      ret.color = color;
    }
    return ret;
  }, [color]);
  return (
    <div className={classes} style={styles}>
      {value}
    </div>
  );
};
AxBadge.displayName = "AxBadge";

/** @internal */
export const useBadge = (props?: BadgeType) => {
  const badgeProps = useMemo(() => {
    if (isObject(props)) {
      return props as BadgeProps;
    } else if (isBoolean(props) && isTrue(props)) {
      return { pulse: true };
    } else if (!isEmpty(props)) {
      return { value: props };
    }
  }, [props]);

  return props !== undefined ? <AxBadge {...badgeProps} /> : null;
};
