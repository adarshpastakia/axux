/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { type ElementProps } from "@axux/core/dist/types";
import {
  type FC,
  memo,
  useCallback,
  useEffect,
  useState,
  useTransition,
} from "react";
import { SketchPicker } from "react-color";

export interface ColorProps extends ElementProps {
  /**
   * color swatches
   */
  swatches?: string[];
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
  ({ value, onChange, hideAlpha, swatches = DEFAULT_SWATCHES }: ColorProps) => {
    const [_actualValue, setActualValue] = useState<string>("");
    const [, startTransition] = useTransition();
    useEffect(() => {
      setActualValue(value ?? ("" as AnyObject));
    }, [value]);
    const handleChange = useCallback(
      (e: string) => {
        setActualValue(e ?? "");
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
        onChange={({ hex }) => setActualValue(hex)}
        onChangeComplete={({ hex }) => handleChange(hex)}
      />
    );
  }
);