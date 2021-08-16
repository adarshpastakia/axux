// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  Children,
  cloneElement,
  FC,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
  useState
} from "react";
import { ElementProps } from "../types";

/**
 * Panel stack
 * @param children
 * @param className
 * @param aria
 * @constructor
 */
export const AxPanelStack: FC<ElementProps> = ({ children, className, ...aria }) => {
  const stackRef = useRef<HTMLDivElement>(null);
  const [history, setHistory] = useState<string[]>([]);

  const fireUpdate = useCallback(() => {
    const el = stackRef.current;
    setTimeout(() => el && el.dispatchEvent(new Event("updatePopper", { bubbles: true })), 10);
  }, []);

  const goBack = useCallback(() => {
    setHistory(history.slice(1));
    fireUpdate();
  }, [fireUpdate, history]);

  const checkMenuClick = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.dataset.panel) {
        setHistory([target.dataset.panel, ...history]);
        fireUpdate();
        e.stopPropagation();
        e.preventDefault();
        return false;
      }
    },
    [fireUpdate, history]
  );

  const panels = useMemo(() => Children.toArray(children), [children]);
  const currentPanel = useMemo<AnyObject>(
    () => panels.find((p: AnyObject) => p.props.panelId === history[0]) ?? panels[0],
    [history, panels]
  );

  return (
    <div
      className={`ax-panel__stack ${className}`}
      {...aria}
      onClick={checkMenuClick}
      ref={stackRef}
    >
      {cloneElement(currentPanel, {
        onBack: history.length > 0 ? goBack : undefined
      })}
    </div>
  );
};
