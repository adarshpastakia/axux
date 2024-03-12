/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useMemo, type FC } from "react";
import { type COLORS, type COLOR_SCHEME, type ChildrenProp } from "../types";

interface Props extends ChildrenProp {
  colorScheme?: COLOR_SCHEME;
  primary?: COLORS;
  accent?: COLORS;
}

/**
 * Theme changer for nested themes
 *
 * @prop scheme - "light" "dark"
 * @prop primary
 * @prop accent
 */
export const AxTheme: FC<
  Props & {
    "data-rounded"?: "none" | "default" | "full";
    "data-gray-scheme"?: "silver" | "steel" | "olive" | "sand";
  }
> = ({ colorScheme, primary, accent, children, ...rest }) => {
  const dataset = useMemo(() => {
    const ds: KeyValue = {};
    if (colorScheme) ds["data-color-scheme"] = colorScheme;
    if (primary) ds["data-primary-scheme"] = primary;
    if (accent) ds["data-accent-scheme"] = accent;

    return ds;
  }, [colorScheme, primary, accent]);
  return (
    <div className="contents" {...rest} {...dataset}>
      {children}
    </div>
  );
};
