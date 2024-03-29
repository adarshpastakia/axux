/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxPopover } from "@axux/core";
import { type ChildrenProp, type ElementProps } from "@axux/core/dist/types";
import { isEmpty } from "@axux/utilities";
import { handleEnter } from "@axux/utilities/dist/handlers";
import {
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
  type FC,
} from "react";
import { type InputProps } from "../types";
import { ColorPicker } from "./ColorPicker";
import { FieldWrapper } from "./Wrapper";

export interface ColorProps extends ElementProps, InputProps, ChildrenProp {
  /**
   * color swatches
   */
  swatches?: string[];
  /**
   * default color
   */
  defaultColor?: string;
  /**
   * hide alpha value
   */
  hideAlpha?: boolean;

  showInput?: boolean;

  size?: "sm";
}

const DEFAULT_SWATCHES = [
  "#0c2461",
  "#2980b9",
  "#0abde3",
  "#27ae60",
  "#6ab04c",
  "#f7b731",
  "#fa8231",
  "#eb3b5a",
  "#6D214F",

  "#1e3799",
  "#3498db",
  "#48dbfb",
  "#2ecc71",
  "#badc58",
  "#fed330",
  "#fd9644",
  "#fc5c65",
  "#B33771",

  "#1e272e",
  "#2f3542",
  "#34495e",
  "#576574",
  "#7f8c8d",
  "#95a5a6",
  "#bdc3c7",
  "#ecf0f1",
  "#f5f6fa",
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
    isPlain,
    placeholder,
    isDisabled,
    isReadOnly,
    allowClear,
    children,
    hideAlpha,
    showInput,
    size,
    swatches = DEFAULT_SWATCHES,
    onEnterPressed,
    inline,
    defaultColor = "#ff0000",
    ...rest
  }: ColorProps) => {
    const [, startTransition] = useTransition();
    const [actualValue, setActualValue] = useState(defaultColor);
    useEffect(() => {
      setActualValue(value ?? defaultColor);
    }, [value]);
    const handleChange = useCallback(
      (e?: string) => {
        setActualValue(e ?? defaultColor);
        onChange != null && startTransition(() => onChange(e));
      },
      [onChange]
    );

    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
        inline={inline}
        isPlain={isPlain}
        labelAppend={labelAppend}
        className={className}
        disabled={isDisabled}
        isInvalid={isInvalid}
        isRequired={isRequired}
        onClear={handleChange}
        canClear={allowClear && !isEmpty(actualValue)}
      >
        <AxPopover
          isDisabled={!!isDisabled || !!isReadOnly}
          placement="bottom-start"
        >
          <div
            data-size={size}
            className={`${showInput ? "w-12" : "w-full"} ax-field__color`}
          >
            <div
              className="flex-1 border border-bw-500/30"
              style={{ backgroundColor: actualValue }}
            />
          </div>
          <ColorPicker
            value={actualValue}
            defaultColor={defaultColor}
            onChange={handleChange}
            swatches={swatches}
            hideAlpha={hideAlpha}
          />
        </AxPopover>
        {showInput && (
          <input
            ref={inputRef}
            aria-label={label}
            aria-disabled={isDisabled}
            aria-readonly={isReadOnly}
            aria-required={isRequired}
            aria-errormessage={error}
            value={actualValue}
            size={1}
            placeholder={placeholder}
            disabled={isDisabled}
            readOnly={isReadOnly}
            data-invalid={isInvalid}
            className="ax-field__input"
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
            onKeyDown={handleEnter(onEnterPressed)}
            {...rest}
          />
        )}
      </FieldWrapper>
    );
  }
);
