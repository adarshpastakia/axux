/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type FC, useMemo } from "react";
import { type HotKey, reduceHotKey } from "./commons";

export const HotKeyLabel: FC<Omit<HotKey, "global" | "handler">> = ({
  keyCombo,
}) => {
  const label = useMemo(() => {
    const item = reduceHotKey({ keyCombo });

    const label = [];
    if (item.ctrl) label.push("⌃");
    if (item.alt) label.push("⌥");
    if (item.meta) label.push("⌘");
    if (item.shift) label.push("⇧");
    if (item.key.toLowerCase() === "tab") label.push("TAB");
    else if (item.key.toLowerCase() === "space") label.push("SPC");
    else if (item.key.toLowerCase() === "arrowleft") label.push("LEFT");
    else if (item.key.toLowerCase() === "arrowright") label.push("RIGHT");
    else if (item.key.toLowerCase() === "arrowup") label.push("UP");
    else if (item.key.toLowerCase() === "arrowdown") label.push("DOWN");
    else if (item.key.toLowerCase() === "enter") label.push("⏎");
    else if (item.key.toLowerCase() === "delete") label.push("DEL");
    else if (item.key.toLowerCase() === "escape") label.push("ESC");
    else if (item.key.toLowerCase() === "backspace") label.push("⌫");
    else label.push(item.key.toUpperCase());
    return label.join(" ");
  }, [keyCombo]);

  return <span className="ax-hotkey__label">{label}</span>;
};
