/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { FC, useEffect } from "react";
import { HotKey } from "./commons";
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
