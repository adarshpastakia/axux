// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

/** @internal */
export interface HotKey {
  /**
   * Hot key combination
   *
   * ctrl, shift, alt, meta
   * enter, space, escape, tab, backspace, delete
   * left, right, up, down
   */
  keyCombo: string;
  /**
   * Global hot key
   */
  global?: boolean;
  /**
   * Callback handler
   */
  handler?: () => void;
}

/** @internal */
export const reduceHotKey = ({ keyCombo, global, handler }: HotKey) => {
  const item = {
    key: "",
    meta: false,
    shift: false,
    ctrl: false,
    alt: false,
    _key: keyCombo,
    handler,
    global
  };
  keyCombo.split("+").forEach((e) => {
    if (e.trim().toLowerCase() === "ctrl") {
      item.ctrl = true;
    } else if (e.trim().toLowerCase() === "alt") {
      item.alt = true;
    } else if (e.trim().toLowerCase() === "meta") {
      item.meta = true;
    } else if (e.trim().toLowerCase() === "shift") {
      item.shift = true;
    } else {
      if (e.trim().toLowerCase() === "left") item.key = "arrowleft";
      else if (e.trim().toLowerCase() === "right") item.key = "arrowright";
      else if (e.trim().toLowerCase() === "up") item.key = "arrowup";
      else if (e.trim().toLowerCase() === "down") item.key = "arrowdown";
      else if (e.trim().toLowerCase().startsWith("del")) item.key = "delete";
      else if (e.trim().toLowerCase().startsWith("esc")) item.key = "escape";
      else item.key = e.trim().toLowerCase();
    }
  });
  return item;
};
