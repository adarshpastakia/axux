// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useMemo } from "react";
import { AxTag } from "../buttons/Tag";
import { VFC } from "../types";
import { HotKey, reduceHotKey } from "./commons";

/**
 * HotKey label
 * @param keyCombo
 * @constructor
 * @internal
 */
export const AxHotKeyLabel: VFC<Omit<HotKey, "global" | "handler">> = ({ keyCombo }) => {
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

  return (
    <AxTag color="muted" size="sm" className="ax-tag--hotkey">
      {label}
    </AxTag>
  );
};
AxHotKeyLabel.displayName = "AxHotKeyLabel";
