/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ElementProps } from "@axux/core/dist/types";
import { Format, debounce } from "@axux/utilities";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FC,
} from "react";
import { useRanger } from "../ranger";
import { type InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface SliderProps
  extends ElementProps,
    Omit<InputProps<number>, "placeholder" | "allowClear"> {
  /**
   * min value
   */
  min?: number;
  /**
   * max value
   */
  max?: number;
  /**
   * increment step
   */
  step?: number;
  /**
   * slider color
   */
  color?: string;
  /**
   * slider height (only vertical)
   */
  height?: number;
  /**
   * vertical orientation
   */
  isVertical?: boolean;
  /**
   * display value tooltip
   */
  showValue?: boolean;
  /**
   * display min/max labels
   */
  showLabels?: boolean;
  /**
   * custom min label
   */
  minLabel?: string;
  /**
   * custom max label
   */
  maxLabel?: string;

  ranges?: number[];
  useInfinity?: true;
  format?: string;

  onSlide?: (val: number) => void;
}

// eslint-disable-next-line react/display-name
export const Slider: FC<SliderProps> = memo(
  ({
    label,
    labelAppend,
    isRequired,
    className,
    value,
    ranges,
    onChange,
    inputRef,
    isInvalid,
    showValue,
    showLabels,
    minLabel,
    maxLabel,
    info,
    format,
    error,
    width,
    color,
    inline,
    labelWidth,
    isVertical,
    isDisabled,
    isReadOnly,
    useInfinity,
    onSlide,
    onEnterPressed,
    height = 192,
    step = 1,
    min: _min = 0,
    max: _max = 100,
    ...rest
  }: SliderProps) => {
    const [actualValue, setActualValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(false);

    const min = useMemo(() => ranges?.[0] ?? _min, [_min, ranges]);
    const max = useMemo(() => ranges?.slice(-1)[0] ?? _max, [_max, ranges]);

    useEffect(() => {
      setActualValue(useInfinity && value === Infinity ? max : value ?? 0);
    }, [value, max, useInfinity]);
    useEffect(() => {
      setDisplayValue(!!showValue);
    }, [showValue]);

    const debounceChange = useMemo(
      () => debounce((q) => onChange?.(q), 100),
      [onChange]
    );

    const handleChange = useCallback(
      (value: number) => {
        const val = useInfinity && value === max ? Infinity : value;
        setActualValue(val ?? 0);
        debounceChange(val ?? undefined);
      },
      [debounceChange, max, useInfinity]
    );

    const minDisplay = useMemo(
      () => (
        <span className="ax-field__slider--label">
          {minLabel ?? Format.number(min, format)}
        </span>
      ),
      [minLabel, min, format]
    );
    const maxDisplay = useMemo(
      () => (
        <span className="ax-field__slider--label">
          {maxLabel ?? (useInfinity ? "∞" : Format.number(max, format))}
        </span>
      ),
      [maxLabel, max, format, useInfinity]
    );

    const rangerInstance = useRanger({
      values: [actualValue],
      min,
      max,
      stepSize: step,
      steps: ranges,
      vertical: isVertical,
      tickSize: Math.max((max - min) / 10, step),
      onDrag: (val) => onSlide?.(val[0]),
      onDragStart: () => setDisplayValue(true),
      onDragEnd: () => setDisplayValue(!!showValue),
      onChange: (values: readonly number[]) => handleChange(values[0]),
    });

    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
        inline={inline}
        labelWidth={labelWidth}
        labelAppend={labelAppend}
        className={`ax-field--plain ${className ?? ""}`}
        disabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
      >
        <div
          className="ax-field__slider"
          data-invalid={isInvalid}
          data-vertical={!!isVertical}
          style={{ color }}
        >
          {showLabels && (isVertical ? maxDisplay : minDisplay)}
          <div
            ref={rangerInstance.trackElRef}
            className="ax-field__slider--wrapper"
            style={{ height: isVertical ? height : undefined }}
          >
            {rangerInstance.ticks.map(({ value, key, styles }) => (
              <div
                key={key}
                className="ax-field__slider--dots"
                style={styles}
              />
            ))}
            {rangerInstance.segments.map(({ key, styles, active }) => (
              <div
                key={key}
                data-hilight={active}
                className="ax-field__slider--hilight"
                style={styles}
              />
            ))}
            {rangerInstance.handles.map(
              ({ key, value, props, styles, percentage, valueStyles }) => (
                <Fragment key={key}>
                  <button
                    type="button"
                    className="ax-field__slider--thumb"
                    {...props}
                    style={styles}
                  />
                  {displayValue && (
                    <div
                      className="ax-field__slider--value"
                      data-align={percentage > 50 ? "start" : "end"}
                      style={valueStyles}
                    >
                      {value === Infinity || (useInfinity && value === max)
                        ? maxLabel ?? "∞"
                        : Format.number(value, format)}
                    </div>
                  )}
                </Fragment>
              )
            )}
          </div>
          {showLabels && (isVertical ? minDisplay : maxDisplay)}
        </div>
      </FieldWrapper>
    );
  }
);
