/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxPopover } from "@axux/core";
import { ChildrenProp, ElementProps } from "@axux/core/dist/types";
import { isEmpty } from "@axux/utilities";
import {
  FC,
  memo,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
  useTransition,
} from "react";
import { SketchPicker } from "react-color";
import { InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface ColorProps
  extends ElementProps,
    Omit<InputProps, "placeholder" | "isPlain">,
    ChildrenProp {
  /**
   * color swatches
   */
  swatches?: string[];
  /**
   * hide alpha value
   */
  hideAlpha?: boolean;
}

const DEFAULT_SWATCHES = [
  "#40407a",
  "#706fd3",
  "#34ace0",
  "#33d9b2",
  "#2c2c54",
  "#474787",
  "#227093",
  "#218c74",
  "#ff5252",
  "#ff793f",
  "#ffb142",
  "#b33939",
  "#cd6133",
  "#84817a",
  "#cc8e35",
  "#ccae62",
];

// eslint-disable-next-line react/display-name
export const Color: FC<ColorProps> = memo(
  ({
    label,
    labelAppend,
    isRequired,
    className,
    value,
    onChange,
    inputRef,
    isInvalid,
    info,
    error,
    width,
    isDisabled,
    isReadOnly,
    allowClear,
    children,
    hideAlpha,
    swatches = DEFAULT_SWATCHES,
    onEnterPressed,
    ...rest
  }: ColorProps) => {
    const [_actualValue, setActualValue] = useState<string>("");
    const [, startTransition] = useTransition();
    const actualValue = useDeferredValue(_actualValue);
    useEffect(() => {
      setActualValue(value ?? ("" as AnyObject));
    }, [value]);
    const handleChange = useCallback(
      (e?: KeyValue) => {
        setActualValue(e?.hex ?? "");
        onChange != null && startTransition(() => onChange(e?.hex));
      },
      [onChange]
    );
    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
        isPlain
        labelAppend={labelAppend}
        className={className}
        disabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        onClear={handleChange}
        canClear={allowClear && !isEmpty(actualValue)}
      >
        <AxPopover isDisabled={!!isDisabled || !!isReadOnly}>
          <div className="w-8 h-6 border border-bw-500/70 rounded p-1.5 cursor-pointer">
            <div
              className="h-full w-full border border-bw-500/30"
              style={{ backgroundColor: _actualValue }}
            />
          </div>
          <SketchPicker
            width="15rem"
            className="ax-input__color"
            styles={{
              default: {
                picker: { backgroundColor: "inherit" },
                controls: {
                  color: "inherit",
                  backgroundColor: "inherit",
                  boxShadow: "inherit",
                  border: "inherit",
                },
                color: {
                  border: 1,
                },
              },
            }}
            color={_actualValue}
            presetColors={swatches}
            disableAlpha={hideAlpha}
            onChangeComplete={handleChange}
          />
        </AxPopover>
        {children}
      </FieldWrapper>
    );
  }
);
