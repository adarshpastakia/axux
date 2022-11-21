/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  createContext,
  FC,
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { ChildrenProp, EmptyCallback } from "../types";
import { reduceHotKey } from "./commons";

/** @internal */
export const HotKeysContext = createContext<{
  addHotKey: (key: string, handler: EmptyCallback, global?: boolean) => void;
  removeHotKey: (key: string) => void;
}>({} as AnyObject);

export const useHotKeys = () => useContext(HotKeysContext);

export const HotKeyWrapper: FC<ChildrenProp> = memo(
  ({ children }: ChildrenProp) => {
    const refEl = useRef<HTMLDivElement>(null);
    const keyList = useRef<KeyValue[]>([]);

    const addHotKey = useCallback(
      (keyCombo: string, handler: EmptyCallback, global = false) =>
        (keyList.current = [
          ...keyList.current.filter(({ _key }) => _key !== keyCombo),
          reduceHotKey({ keyCombo, handler, global }),
        ]),
      []
    );
    const removeHotKey = useCallback(
      (key: string) =>
        (keyList.current = [
          ...keyList.current.filter(({ _key }) => _key !== key),
        ]),
      []
    );

    const handler = useCallback((items: KeyValue[], event: KeyboardEvent) => {
      if (items.length === 0) return;
      const { key: keyCode, code, altKey, ctrlKey, metaKey, shiftKey } = event;
      if (
        keyCode !== "Enter" &&
        keyCode !== "Esc" &&
        ["INPUT", "TEXTAREA", "SELECT"].includes(
          (event.target as HTMLElement).tagName
        )
      )
        return;
      const find = items.find(
        ({ key, alt, ctrl, meta, shift }: KeyValue) =>
          (key.toLowerCase() === keyCode.toLowerCase() ||
            key.toLowerCase() === code.toLowerCase()) &&
          alt === altKey &&
          ctrl === ctrlKey &&
          meta === metaKey &&
          shift === shiftKey
      );
      if (find?.handler) {
        find.handler();
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }, []);

    const handleGlobal = useCallback(
      (event: KeyboardEvent) => {
        handler(
          keyList.current.filter((i) => i.global),
          event
        );
      },
      [handler]
    );
    const handleHotKey = useCallback(
      (event: KeyboardEvent) => {
        handler(
          keyList.current.filter((i) => !i.global),
          event
        );
      },
      [handler]
    );

    useEffect(() => {
      const el = refEl.current?.parentElement as HTMLElement;
      el.tabIndex = 0;
      el.addEventListener("keydown", handleHotKey);
      document.addEventListener("keydown", handleGlobal);
      return () => {
        el.removeEventListener("keydown", handleHotKey);
        document.removeEventListener("keydown", handleGlobal);
      };
    }, [handleGlobal, handleHotKey]);

    return (
      <HotKeysContext.Provider value={{ addHotKey, removeHotKey }}>
        <div ref={refEl} style={{ display: "contents" }}>
          {children}
        </div>
      </HotKeysContext.Provider>
    );
  }
);
HotKeyWrapper.displayName = "AxHotKey.Provider";
