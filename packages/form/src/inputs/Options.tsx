/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ChildrenProp, type ElementProps } from "@axux/core/dist/types";
import { Children, cloneElement, type FC, memo } from "react";
import { type InputProps } from "../types";
import { FieldWrapper } from "./Wrapper";

export interface OptionsProps extends ChildrenProp, InputProps, ElementProps {
  /**
   * Vertical layout
   */
  vertical?: boolean;
  /**
   * Field name, applicable to radio options only
   */
  name?: string;
}

// eslint-disable-next-line react/display-name
export const Options: FC<OptionsProps> = memo(
  ({
    vertical,
    name,
    onChange,
    label,
    labelAppend,
    isRequired,
    value,
    placeholder,
    inputRef,
    isInvalid,
    className,
    info,
    error,
    width,
    isDisabled,
    isReadOnly,
    allowClear,
    children,
    inline,
    labelWidth,
    onEnterPressed,
    ...rest
  }: OptionsProps) => {
    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
        inline={inline}
        labelWidth={labelWidth}
        className={`ax-field--plain ${className ?? ""}`}
        labelAppend={labelAppend}
        isInvalid={!isDisabled && isInvalid}
        isRequired={isRequired}
        disabled={isDisabled}
      >
        <div {...rest} className="ax-field__options" data-vertical={vertical}>
          {Children.toArray(children).map((child: AnyObject) => {
            const newProps = { ...child.props };
            newProps.isReadOnly = isReadOnly;
            newProps.isDisabled = isDisabled;
            if (value) {
              newProps.checked = newProps.value === value;
            }
            if (name) {
              newProps.name = name;
              newProps.onChange = onChange;
            }
            return cloneElement(child, newProps);
          })}
        </div>
      </FieldWrapper>
    );
  }
);
