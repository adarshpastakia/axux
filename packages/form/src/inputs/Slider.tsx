/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ElementProps } from "@axux/core/dist/types";
import { Format } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import {
  ChangeEvent,
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
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
    const handleChange = useCallback(
      (e?: ChangeEvent<HTMLInputElement>) => {
        setActualValue(e?.target.valueAsNumber ?? 0);
        onChange != null &&
          startTransition(() => onChange(e?.target.valueAsNumber ?? undefined));
      },
      [onChange]
    );

    const hilight = useMemo(
      () =>
        Math.min(Math.max(((actualValue - min) / (max - min)) * 100, 0), 100),
      [min, max, actualValue]
    );

    const dots = useMemo(() => {
      const base = (max - min) / step;
      let diff = 1;
      const count = Math.min(base + 1, 11);
      if (count > 11) diff = Math.ceil(base / 11);
      return new Array(count).fill(null).map((_, i) => i * diff);
    }, [min, max, step]);

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
            className="ax-field__slider--wrapper"
            style={{ height: isVertical ? height : undefined }}
          >
            <input
              ref={inputRef}
              type="range"
              size={1}
              min={min}
              max={max}
              step={step}
              aria-disabled={isDisabled}
              aria-readonly={isReadOnly}
              aria-errormessage={error}
              value={actualValue}
              disabled={isDisabled}
              readOnly={isReadOnly}
              onChange={handleChange}
              {...rest}
              onWheel={(e) => e.currentTarget.blur()}
              onKeyDown={handleEnter(onEnterPressed)}
              onMouseDown={() => setDisplayValue(true)}
              onMouseUp={() => setDisplayValue(false)}
              onFocus={() => setDisplayValue(true)}
              onBlur={() => setDisplayValue(false)}
              style={{
                width: isVertical
                  ? `calc(${height} * 1px + 0.375rem)`
                  : undefined,
              }}
            />
            <div
              data-hidden={actualValue === 0}
              className="ax-field__slider--hilight"
              style={{ [isVertical ? "height" : "width"]: `${hilight}%` }}
            />
            <div className="ax-field__slider--dots">
              {dots.map((i) => (
                <span key={i} />
              ))}
            </div>
            {(!!showValue || !!displayValue) && (
              <div
                className="ax-field__slider--value"
                data-align={hilight > 50 ? "start" : "end"}
                style={{
                  [isVertical ? "bottom" : "insetInlineStart"]: `${hilight}%`,
                }}
              >
                <div>{Format.number(actualValue)}</div>
              </div>
            )}
          </div>
          {showLabels && (isVertical ? minDisplay : maxDisplay)}
        </div>
      </FieldWrapper>
    );
  }
);
