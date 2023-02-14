/**
 * react-ranger
 * https://github.com/TanStack/ranger
 */
import { useIsRtl } from "@axux/core";
import {
  KeyboardEvent as KE,
  MouseEvent as ME,
  TouchEvent as TE,
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getBoundingClientRect,
  linearInterpolator,
  sortNumList,
} from "./utils";

type RangerChangeEvent = (newValue: readonly number[]) => void;

type RangerConfig = {
  values: readonly number[];

  min: number;
  max: number;

  tickSize: number;
  ticks?: number[];

  vertical?: boolean;

  onChange: RangerChangeEvent;
  onDrag?: RangerChangeEvent;
  onDragStart?: () => void;
  onDragEnd?: () => void;

  debug?: boolean;
} & ({ stepSize: number } | { steps: number[] });

const useGetLatest = (val: AnyObject) => {
  const ref = useRef(val);
  ref.current = val;
  return useCallback(() => {
    return ref.current;
  }, []);
};

export const useRanger = (opts: RangerConfig) => {
  const tickSize = opts.tickSize ?? 10;
  const values = opts.values;
  const min = opts.min;
  const max = opts.max;
  const isVertical = opts.vertical;
  const controlledTicks = opts.ticks;
  const steps = "steps" in opts ? opts.steps : undefined;
  const onChange = opts.onChange;
  const onDrag = opts.onDrag;
  const onDragStart = opts.onDragStart;
  const onDragEnd = opts.onDragEnd;
  const stepSize = "stepSize" in opts ? opts.stepSize : 1;

  const [activeHandleIndex, setActiveHandleIndex] = useState<number>();
  const [tempValues, setTempValues] = useState<number[]>();
  const isRtl = useIsRtl();

  const positionProp = useMemo(
    () => (isVertical ? "bottom" : isRtl ? "right" : "left"),
    [isVertical, isRtl]
  );
  const marginProp = useMemo(
    () => (isVertical ? "marginBottom" : isRtl ? "marginRight" : "marginLeft"),
    [isVertical, isRtl]
  );

  const getLatest = useGetLatest({
    activeHandleIndex,
    onChange,
    onDrag,
    onDragStart,
    onDragEnd,
    values,
    tempValues,
  });
  const trackElRef = useRef<HTMLDivElement>(null);
  const getValueForClientX = useCallback(
    (clientX: number) => {
      const trackDims = getBoundingClientRect(trackElRef.current);
      return linearInterpolator.getValueForClientX(
        clientX,
        trackDims,
        min,
        max,
        isRtl
      );
    },
    [max, min, isRtl]
  );
  const getValueForClientY = useCallback(
    (clientY: number) => {
      const trackDims = getBoundingClientRect(trackElRef.current);
      return linearInterpolator.getValueForClientY(
        clientY,
        trackDims,
        min,
        max
      );
    },
    [max, min]
  );
  const getNextStep = useCallback(
    (val: number, direction: number) => {
      if (steps) {
        const currIndex = steps.indexOf(val);
        const nextIndex = currIndex + direction;

        if (nextIndex >= 0 && nextIndex < steps.length) {
          return steps[nextIndex];
        } else {
          return val;
        }
      } else {
        if (process.env.NODE_ENV !== "production") {
          if (typeof stepSize === "undefined") {
            throw new Error(
              "Warning: The option `stepSize` is expected in `useRanger`, but its value is `undefined`"
            );
          }
        }

        const nextVal = val + stepSize * direction;

        if (nextVal >= min && nextVal <= max) {
          return nextVal;
        } else {
          return val;
        }
      }
    },
    [max, min, stepSize, steps]
  );
  const roundToStep = useCallback(
    (val: number) => {
      let left = min;
      let right = max;

      if (steps) {
        steps.forEach((step) => {
          if (step <= val && step > left) {
            left = step;
          }

          if (step >= val && step < right) {
            right = step;
          }
        });
      } else {
        if (process.env.NODE_ENV !== "production") {
          if (typeof stepSize === "undefined") {
            throw new Error(
              "Warning: The option `stepSize` is expected in `useRanger`, but its value is `undefined`"
            );
          }
        }

        while (left < val && left + stepSize < val) {
          left += stepSize;
        }

        right = Math.min(left + stepSize, max);
      }

      if (val - left < right - val) {
        return left;
      }

      return right;
    },
    [max, min, stepSize, steps]
  );
  const handleDrag = useCallback(
    (e: MouseEvent | TouchEvent) => {
      const { activeHandleIndex, onDrag } = getLatest();

      const clientX =
        // @ts-expect-error
        e.type === "touchmove" ? e.changedTouches[0].clientX : e.clientX;
      const clientY =
        // @ts-expect-error
        e.type === "touchmove" ? e.changedTouches[0].clientY : e.clientY;
      const newValue = isVertical
        ? getValueForClientY(clientY)
        : getValueForClientX(clientX);
      const newRoundedValue = roundToStep(newValue);
      const newValues = [
        ...values.slice(0, activeHandleIndex),
        ...[newRoundedValue],
        ...values.slice(+activeHandleIndex + 1),
      ];
      onDrag?.(newValues);
      setTempValues(newValues);
    },
    [getLatest, getValueForClientX, roundToStep, values, isVertical]
  );
  const handleKeyDown = useCallback(
    (e: KE, i: number) => {
      const { values, onChange } = getLatest();

      if (["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(e.key)) {
        setActiveHandleIndex(i);
        const direction = ["ArrowLeft", "ArrowDown"].includes(e.key) ? -1 : 1;
        const newValue = getNextStep(values[i], direction);
        const newValues = [
          ...values.slice(0, i),
          ...[newValue],
          ...values.slice(i + 1),
        ];
        const sortedValues = sortNumList(newValues);
        onChange?.(sortedValues);
      }
    },
    [getLatest, getNextStep]
  );
  const handlePress = useCallback(
    (e: ME | TE, i: number) => {
      const { onDragStart } = getLatest();
      setActiveHandleIndex(i);

      const handleRelease = (e: MouseEvent | TouchEvent) => {
        const { tempValues, onChange, onDragEnd } = getLatest();

        document.removeEventListener("mousemove", handleDrag);
        document.removeEventListener("touchmove", handleDrag);
        document.removeEventListener("mouseup", handleRelease);
        document.removeEventListener("touchend", handleRelease);
        const sortedValues = sortNumList(tempValues || values);
        onDragEnd?.();
        onChange?.(sortedValues);
        setActiveHandleIndex(undefined);
        setTempValues(undefined);
      };

      onDragStart?.();
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("touchmove", handleDrag);
      document.addEventListener("mouseup", handleRelease);
      document.addEventListener("touchend", handleRelease);
    },
    [getLatest, handleDrag]
  );
  const getPercentageForValue = useCallback(
    (val: number) => {
      return linearInterpolator.getPercentageForValue(val, min, max);
    },
    [max, min]
  );
  // Build the ticks
  const ticks = useMemo(() => {
    let ticks = controlledTicks ?? steps;

    if (!ticks) {
      ticks = [min];
      const count = tickSize - (tickSize % stepSize);
      while (ticks[ticks.length - 1] < max - count) {
        ticks.push(ticks[ticks.length - 1] + count);
      }

      ticks.push(max);
    }

    return ticks.map((value, i) => {
      return {
        key: i,
        value,
        percentage: getPercentageForValue(value),
        styles: {
          [positionProp]: `${getPercentageForValue(value)}%`,
          [marginProp]: "-0.125rem",
        },
      };
    });
  }, [
    controlledTicks,
    getPercentageForValue,
    max,
    min,
    steps,
    tickSize,
    positionProp,
    marginProp,
  ]);
  const segments = useMemo(() => {
    const sortedValues = sortNumList(tempValues ?? values);
    return [...sortedValues, max].map((value, i) => {
      return {
        key: i,
        value,
        active: i === sortedValues.length - 1,
        styles: (() => {
          const left = getPercentageForValue(
            sortedValues[i - 1] ? sortedValues[i - 1] : min
          );
          const width: number = getPercentageForValue(value) - left;
          return {
            [positionProp]: `${left}%`,
            [isVertical ? "height" : "width"]: `${width}%`,
          };
        })(),
      };
    });
  }, [
    getPercentageForValue,
    max,
    min,
    tempValues,
    values,
    positionProp,
    marginProp,
  ]);
  const handles = useMemo(() => {
    return (tempValues ?? values).map((value, i) => {
      return {
        key: i,
        value,
        percentage: getPercentageForValue(value),
        active: i === activeHandleIndex,
        props: {
          role: "slider",
          "aria-valuemin": min,
          "aria-valuemax": max,
          "aria-valuenow": value,
          onKeyDown: (e: KE) => {
            e.persist();
            handleKeyDown(e, i);
          },
          onMouseDown: (e: ME) => {
            e.persist();
            handlePress(e, i);
          },
          onTouchStart: (e: TE) => {
            e.persist();
            handlePress(e, i);
          },
        },
        styles: {
          [positionProp]: `${getPercentageForValue(value)}%`,
          [marginProp]: "-0.375rem",
        },
        valueStyles: {
          [positionProp]: `${getPercentageForValue(value)}%`,
        },
      };
    });
  }, [
    activeHandleIndex,
    getPercentageForValue,
    handleKeyDown,
    handlePress,
    min,
    max,
    tempValues,
    values,
    positionProp,
    marginProp,
  ]);

  return { trackElRef, activeHandleIndex, ticks, segments, handles };
};
