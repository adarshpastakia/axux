/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useCallback, useEffect, useState, useTransition } from "react";

export interface SelectableProps {
  /**
   * list items
   */
  items: Array<{ label: string } & KeyValue>;
  /**
   * selected item ids
   */
  selected?: string[];
  /**
   * selected negative item ids
   */
  nonselected?: string[];
  /**
   * change callback
   */
  onChange?: (ids: string[], nonIds?: string[]) => void;
  /**
   * item click callback
   */
  onClick?: (id: string, isNegative: boolean) => void;
}

export const useSelectableList = ({
  items,
  selected,
  nonselected,
  onChange,
  onClick,
}: SelectableProps) => {
  const [selection, setSelection] = useState<KeyValue>({});
  const [pending, startTransition] = useTransition();
  useEffect(() => {
    setSelection(
      items.reduce(
        (ret, { id }) => ({
          ...ret,
          [id]: selected?.includes?.(id)
            ? 1
            : nonselected?.includes?.(id)
            ? -1
            : 0,
        }),
        {}
      )
    );
  }, [items, selected, nonselected]);

  const toggleSelection = useCallback(
    (id: string, isNegative = false) => {
      const check = isNegative ? -1 : 1;
      const newSelection = { ...selection, [id]: 0 };
      if (selection[id] === 0) newSelection[id] = 1;
      if (selection[id] !== 0) newSelection[id] = 0;
      if (check) {
        newSelection[id] = check;
        if (selection[id] === 1 && check === 1) newSelection[id] = 0;
        if (selection[id] === -1 && check === -1) newSelection[id] = 0;
      }
      const change: string[][] = [[], []];
      Object.entries(newSelection).forEach(([id, select]) =>
        select === 1
          ? change[0].push(id)
          : select === -1
          ? change[1].push(id)
          : undefined
      );
      startTransition(() => {
        onClick?.(id, isNegative);
        onChange?.(change[0], change[1]);
      });
    },
    [selection]
  );

  return { selection, toggleSelection };
};
