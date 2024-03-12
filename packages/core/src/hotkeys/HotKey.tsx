/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { type FC, useEffect } from "react";
import { type HotKey } from "./commons";
import { HotKeyLabel } from "./HotKeyLabel";
import { useHotKeys } from "./HotKeyWrapper";

export const AxHotKey: FC<HotKey> & { Label: typeof HotKeyLabel } = ({
  keyCombo,
  global,
  handler,
}: HotKey) => {
  const { addHotKey, removeHotKey } = useHotKeys();
  useEffect(() => {
    addHotKey?.(keyCombo, handler ?? (() => undefined), global);
    return () => removeHotKey?.(keyCombo);
  }, [addHotKey, global, handler, keyCombo, removeHotKey]);
  return null;
};
AxHotKey.Label = HotKeyLabel;

AxHotKey.displayName = "AxHotKey";
AxHotKey.Label.displayName = "AxHotKey.Label";
