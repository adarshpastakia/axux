/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp, ElementProps } from "@axux/core/dist/types";
import { Children, cloneElement, FC, memo } from "react";
import { InputProps } from "../types";
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
    onEnterPressed,
    ...rest
  }) => {
    return (
      <FieldWrapper
        info={info}
        error={error}
        label={label}
        width={width}
        className={`ax-field--plain ${className ?? ""}`}
        labelAppend={labelAppend}
        isInvalid={!isDisabled && isInvalid}
        isRequired={isRequired}
        disabled={isDisabled}
      >
        <div {...rest} className="ax-field__options" data-vertical={vertical}>
          {Children.toArray(children).map((child: AnyObject) => {
            const newProps = { name, ...child.props, checked: false, onChange };
            if (value) {
              newProps.checked = newProps.value === value;
            }
            return cloneElement(child, newProps);
          })}
        </div>
      </FieldWrapper>
    );
  }
);
