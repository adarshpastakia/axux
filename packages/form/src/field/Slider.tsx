// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxIcon, AxTooltip } from "@axux/core";
import { VFC } from "@axux/core/dist/types";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Format, isEmpty } from "@axux/utilities";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { AxFieldController } from "../internals/FieldController";
import { AxFieldLabel } from "../internals/FieldLabel";
import { ControllerProps, FieldStateProps, WrapperProps } from "../types";

/** @internal */
export interface SliderFieldProps
  extends Omit<ControllerProps<number>, "allowClear" | "onClear" | "onEnterPressed">,
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
  vertical?: boolean;
  showLabel?: boolean;
  showTicks?: boolean;
  showValue?: boolean;

  ticks?: number[];

  height?: string | number;
}

/**
 * Slider input field
 * @internal
 */
export const AxSliderField: VFC<SliderFieldProps> = memo(
  ({
    step = 1,
    min = 0,
    max = 100,
    showLabel,
    showTicks,
    showValue,
    isDisabled,
    isReadonly,
    vertical = false,
    label,
    ticks: _ticks,
    value: _value = 0,
    onChange,
    name,
    hint,
    error,
    autoFocus,
    required,
    appendLabel,
    width,
    height = "24em",
    span = 1
  }) => {
    const [value, setValue] = useState(_value ?? 0);
    useEffect(() => {
      setValue(_value ?? 0);
    }, [_value]);

    const [hilight, setHilight] = useState(0);
    const updateHilight = useCallback(
      (value) => {
        setHilight(((value - min) / (max - min)) * 100);
      },
      [max, min]
    );

    const ticks = useMemo(() => {
      if (_ticks) return _ticks;
      const diff = (max - min) / 10;
      return new Array(11).fill(0).map((_, i) => min + diff * i);
    }, [_ticks, max, min]);

    const updateValue = useCallback(
      (v = 0) => {
        setValue(v);
        onChange && onChange(v);
      },
      [onChange]
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
                      <span className="ax-field__error">!</span>
                    </AxTooltip>
                  )}
                </AxFieldLabel>
              )}
              <div className="ax-field__slider" data-vertical={vertical}>
                {showLabel && <span>{Format.number(min)}</span>}
                <div className="ax-field__slider--container">
                  <div
                    className="ax-field__slider--wrapper"
                    style={{
                      width: vertical ? undefined : width,
                      height: vertical ? height : undefined
                    }}
                  >
                    <input
                      className="ax-field__input"
                      ref={ref}
                      name={name}
                      size={1}
                      step={step}
                      min={min}
                      max={max}
                      type="range"
                      formNoValidate
                      disabled={isDisabled}
                      readOnly={isReadonly}
                      value={value}
                      onBlur={onBlur}
                      onKeyUp={onEnter}
                      style={{
                        width: vertical ? height : width
                      }}
                      onChange={(event) => {
                        updateHilight(event.target.valueAsNumber);
                        onChange && onChange(event.target.valueAsNumber);
                      }}
                    />
                    <div
                      className="ax-field__slider--hilight"
                      style={{ [vertical ? "height" : "width"]: `${hilight}%` }}
                    />
                    {showValue && !isEmpty(value) && (
                      <div className="ax-field__slider--value-wrapper">
                        <div
                          className="ax-field__slider--value"
                          style={{ [vertical ? "bottom" : "insetInlineStart"]: `${hilight}%` }}
                          data-align={hilight > 50 ? "start" : "end"}
                        >
                          <div>{Format.number(value)}</div>
                        </div>
                      </div>
                    )}
                  </div>
                  {showTicks && (
                    <div
                      className="ax-field__slider--ticks"
                      style={{
                        width: vertical ? undefined : width,
                        height: vertical ? height : undefined
                      }}
                    >
                      {ticks.map((v) => (
                        <button
                          type="button"
                          key={v}
                          tabIndex={-1}
                          onClick={() => onChange && onChange(v)}
                        >
                          <span>{Format.number(v)}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {showLabel && <span>{Format.number(max)}</span>}
              </div>
              {hint && <div className="ax-field__hint">{hint}</div>}
            </div>
          );
        }}
      </AxFieldController>
    );
  }
);
