// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC } from "react";

export const THEME = ["primary", "secondary", "muted", "info", "danger", "success", "warning"];

export const GRAYSCALE = ["empty", "lightest", "light", "medium", "dark", "darkest", "opaque"];

export const PALETTE = [
  "purple",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "yellow",
  "orange",
  "red",
  "pink",
  "fuchsia"
];

export const ColorBox: FC<{ color: string; showLabel?: boolean }> = ({ color, showLabel }) => (
  <div
    title={color}
    className={`ax-bg--${color} ax-border ax-inline-block ax-text--title ax-margin--sm`}
    style={{ height: 24, minWidth: 24, borderRadius: 3 }}
  >
    {showLabel && <span className="ax-padding--x--md ax-color--invert">{color}</span>}
  </div>
);

export const ColorTitle: FC<{ color: string }> = ({ color, children }) => (
  <div className="ax-text--title">
    <div
      className={`ax-bg--${color} ax-border ax-inline-block ax-margin--e--sm`}
      style={{ height: 16, width: 16, borderRadius: 3 }}
    />
    {children}
  </div>
);

export const ColorText: FC<{ color: string; bg?: string }> = ({
  children,
  bg = "base",
  color = "white"
}) => (
  <div className="ax-margin--b--md">
    <div
      className={`ax-bg--${bg} ax-color--${color} ax-inline-block ax-padding--y--xs ax-padding--x`}
      style={{ borderRadius: 3 }}
    >
      {children}
    </div>
  </div>
);
