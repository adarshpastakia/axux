/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import {
  Children,
  cloneElement,
  type FC,
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { type ChildrenProp, type ElementProps } from "../types";

export interface PanelStackProps extends ElementProps, ChildrenProp {
  /**
   * panel change event callback
   */
  onPanelChange?: (panelId: string) => void;
  /**
   * navigate to previous panel in history
   */
  onBack?: (panelId: string, nextPanelId: string) => boolean | undefined;
}

export const PanelStack: FC<PanelStackProps> = ({
  children,
  className,
  onPanelChange,
  onBack,
  ...rest
}) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [, startTransition] = useTransition();

  const panels = useMemo(
    () =>
      new Map(
        Children.toArray(children).map(
          (child: AnyObject) =>
            child.props && [child.props.panelId ?? "root", child]
        )
      ),
    [children]
  );

  useEffect(() => {
    startTransition(() => {
      onPanelChange?.(history[0] ?? "root");
      stackRef.current?.dispatchEvent(
        new Event("updatePopper", { bubbles: true })
      );
    });
  }, [onPanelChange, history]);

  const goBack = useCallback(() => {
    if (onBack?.(history[0], history[1] ?? "root") !== false) {
      setHistory(history.slice(1));
    }
  }, [history, onBack]);

  const currentPanel = useMemo<AnyObject>(
    () => panels.get(history[0]) ?? panels.values().next().value,
    [history, panels]
  );

  const checkMenuClick = useCallback(
    (e: MouseEvent) => {
      const panelKey = (e.target as HTMLElement)?.dataset?.panel;
      if (panelKey) {
        if (panelKey === "back") {
          goBack();
        } else if (panelKey === "root") {
          if (onBack?.(history[0], "root") !== false) {
            setHistory([]);
          }
        } else if (panels.has(panelKey)) {
          setHistory([panelKey, ...history]);
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
      return true;
    },
    [goBack, history, panels, onBack]
  );

  return (
    <div
      {...rest}
      ref={stackRef}
      onClickCapture={checkMenuClick}
      className={`ax-panel__stack ${className ?? ""}`}
    >
      {currentPanel &&
        cloneElement(currentPanel, {
          onBack: history.length > 0 ? goBack : undefined,
        })}
    </div>
  );
};
