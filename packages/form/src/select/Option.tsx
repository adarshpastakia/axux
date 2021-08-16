// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon } from "@axux/core";
import { useBadge } from "@axux/core/dist/internals/useBadge";
import { FC } from "react";
import { OptionProps } from "../types";

/** @internal */
export const AxSelectOption: FC<OptionProps<string | KeyValue> & { selected?: boolean }> = ({
  icon,
  label,
  badge,
  value,
  isDisabled,
  selected = false
}) => {
  const badgeEl = useBadge(badge);

  return (
    <div
      className="ax-select__option"
      data-disabled={isDisabled}
      data-selected={selected}
      data-value={value}
    >
      {icon && <AxIcon icon={icon} />}
      <label>{label}</label>
      {badgeEl}
    </div>
  );
};
AxSelectOption.displayName = "AxSelect.Option";
