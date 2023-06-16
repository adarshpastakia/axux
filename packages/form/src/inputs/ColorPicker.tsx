/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type ElementProps } from "@axux/core/dist/types";
import {
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
  type FC,
} from "react";
import { SketchPicker } from "react-color";

export interface ColorProps extends ElementProps {
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

  value?: string;
  onChange?: (color: string) => void;
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
export const ColorPicker: FC<ColorProps> = memo(
  ({
    value,
    onChange,
    hideAlpha,
    defaultColor = "#ff0000",
    swatches = DEFAULT_SWATCHES,
  }: ColorProps) => {
    const [_actualValue, setActualValue] = useState<string>(defaultColor);
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? defaultColor);
    }, [value]);
    const handleChange = useCallback(
      (e: string) => {
        setActualValue(e ?? defaultColor);
        onChange != null && startTransition(() => onChange(e));
      },
      [onChange]
    );

    return (
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
        onChange={({ hex, rgb: { a = 1 } }) =>
          setActualValue(
            `${hex}${
              a < 1
                ? Math.round(a * 255)
                    .toString(16)
                    .padStart(2, "0")
                : ""
            }`
          )
        }
        onChangeComplete={({ hex, rgb: { a = 1 } }) =>
          handleChange(
            `${hex}${
              a < 1
                ? Math.round(a * 255)
                    .toString(16)
                    .padStart(2, "0")
                : ""
            }`
          )
        }
      />
    );
  }
);
