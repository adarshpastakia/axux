/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ElementProps } from "@axux/core/dist/types";
import { Format } from "@axux/utilities";
import {
  FC,
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRanger } from "../ranger";
import { InputProps } from "../types";
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
    onChange,
    inputRef,
    isInvalid,
    showValue,
    showLabels,
    minLabel,
    maxLabel,
    info,
    error,
    width,
    color,
    inline,
    labelWidth,
    isVertical,
    isDisabled,
    isReadOnly,
    onSlide,
    onEnterPressed,
    height = 192,
    step = 1,
    min = 0,
    max = 100,
    ...rest
  }: SliderProps) => {
    const [actualValue, setActualValue] = useState(0);
    const [displayValue, setDisplayValue] = useState(false);
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? 0);
    }, [value]);
    useEffect(() => {
      setDisplayValue(!!showValue);
    }, [showValue]);
    const handleChange = useCallback(
      (value: number) => {
        setActualValue(value ?? 0);
        onChange != null && startTransition(() => onChange(value ?? undefined));
      },
      [onChange]
    );

    const minDisplay = useMemo(
      () => (
        <span className="ax-field__slider--label">
          {minLabel ?? Format.number(min)}
        </span>
      ),
      [minLabel, min]
    );
    const maxDisplay = useMemo(
      () => (
        <span className="ax-field__slider--label">
          {maxLabel ?? Format.number(max)}
        </span>
      ),
      [maxLabel, max]
    );

    const rangerInstance = useRanger({
      values: [actualValue],
      min,
      max,
      stepSize: step,
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
                      {Format.number(value)}
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
