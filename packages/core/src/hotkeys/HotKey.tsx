// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { useEffect } from "react";
import { VFC } from "../types";
import { HotKey } from "./commons";
import { useAxHotKeys } from "./HotKeyWrapper";

/**
 * HotKey handler
 * @param keyCombo
 * @param global
 * @param handler
 * @constructor
 * @internal
 */
export const AxHotKey: VFC<HotKey> = ({ keyCombo, global, handler }) => {
  const { addHotKey, removeHotKey } = useAxHotKeys();
  useEffect(() => {
    addHotKey(keyCombo, handler ?? (() => undefined), global);
    return () => removeHotKey(keyCombo);
  }, [addHotKey, global, handler, keyCombo, removeHotKey]);
  return null;
};
AxHotKey.displayName = "AxHotKey";
