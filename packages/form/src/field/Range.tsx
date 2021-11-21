// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon, AxTooltip } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Format } from "@axux/utilities";
import { memo, useCallback, useEffect, useState } from "react";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldLabel } from "../internals/FieldLabel";
import { ControllerProps, FieldStateProps, WrapperProps } from "../types";

/** @internal */
export interface RangeFieldProps
  extends Omit<ControllerProps<[number, number]>, "allowClear" | "onClear" | "onEnterPressed">,
    Omit<WrapperProps, "placeholder" | "minWidth" | "maxWidth">,
    FieldStateProps {
  /**
   * Step value
   */
  step?: number;
  /**
   * Minimum value
   */
  min?: number;
  /**
   * Maximum value
   */
  max?: number;
  showLabel?: boolean;
  showValue?: boolean;
}

/**
 * Slider input field
 * @internal
 */
export const AxSliderRange: VFC<RangeFieldProps> = memo(
  ({
    step = 1,
    min = 0,
    max = 100,
    showLabel,
    showValue,
    isDisabled,
    isReadonly,
    label,
    value: _value,
    onChange,
    name,
    hint,
    error,
    autoFocus,
    required,
    appendLabel,
    width,
    span = 1
  }) => {
    const [value, setValue] = useState(_value ?? [min, max]);
    useEffect(() => {
      setValue(_value ?? [min, max]);
    }, [_value, max, min]);

    const [hilight, setHilight] = useState(0);
    const updateHilight = useCallback(
      (value) => {
        setHilight(((value - min) / (max - min)) * 100);
      },
      [max, min]
    );

    const getUpdatedRange = useCallback(
      (v = [min, max]) => {
        const [n, x] = v;
        return n < x ? [n, x] : [x, n];
      },
      [max, min]
    );

    const updateValue = useCallback(
      (v = [min, max]) => {
        setValue(v);
        onChange && onChange(v);
      },
      [max, min, onChange]
    );

    return (
      <AxFieldController
        value={value}
        error={error}
        name={name}
        autoFocus={autoFocus}
        onChange={updateValue}
      >
        {({ ref, onChange, value, error, onBlur, onEnter }) => {
          return (
            <div
              className="ax-field"
              data-invalid={!!error}
              ref={() => updateHilight(value)}
              style={{
                gridColumnEnd: `span ${Math.min(4, Math.max(1, span))}`
              }}
            >
              {label && (
                <AxFieldLabel required={required} appendLabel={appendLabel}>
                  {label}
                  {error && (
                    <AxTooltip color="danger" content={error} placement="bottom">
                      <span className="ax-field__error">
                        <AxIcon icon={AppIcons.iconExclaim} color="danger" />
                      </span>
                    </AxTooltip>
                  )}
                </AxFieldLabel>
              )}
              <div className="ax-field__range">
                {showLabel && <span>{Format.number(min)}</span>}
                <div className="ax-field__range--container">
                  <div
                    className="ax-field__range--wrapper"
                    style={{
                      width
                    }}
                  >
                    <div className="ax-field__range--handle" data-pos="min"/>
                    <div className="ax-field__range--handle" data-pos="max"/>
                  </div>
                </div>
                {showLabel && <span>{Format.number(max)}</span>}
              </div>
            </div>
          );
        }}
      </AxFieldController>
    );
  }
);
