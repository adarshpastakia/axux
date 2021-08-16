// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { FC, MouseEvent, useCallback } from "react";

/** @internal */
export const AxFieldLabel: FC<{ required?: boolean; appendLabel?: string | JSX.Element }> = ({
  children,
  appendLabel,
  required
}) => {
  const onClick = useCallback((e: MouseEvent<HTMLLabelElement>) => {
    const el =
      e.currentTarget.parentElement &&
      e.currentTarget.parentElement.parentElement &&
      (e.currentTarget.parentElement.parentElement.querySelector(
        ".ax-field__input"
      ) as HTMLInputElement);
    if (el) {
      el.focus();
    }
  }, []);

  return (
    <div className="ax-field__label">
      <label data-required={required} onClick={onClick}>
        {children}
      </label>
      {appendLabel && <div className="ax-field__label--append">{appendLabel}</div>}
    </div>
  );
};
AxFieldLabel.displayName = "AxFieldLabel";
