// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isEmpty } from "@axux/utilities";
import { getChildProps } from "@axux/utilities/dist/react";
import { Children, cloneElement, FC, ReactElement } from "react";
import { ElementProps } from "../types";

/** @internal */
export interface ButtonGroupProps extends ElementProps {
  /**
   * Vertical layout
   */
  vertical?: boolean;
  /**
   * Value for toggle group
   */
  value?: string;
  /**
   * on change of toggled value
   * @param v
   */
  onChange?: (v: AnyObject) => void;
}

/**
 * Button group
 * @param className
 * @param vertical
 * @param value
 * @param onChange
 * @param children
 * @param aria
 * @internal
 */
export const AxButtonGroup: FC<ButtonGroupProps> = ({
  className,
  vertical,
  value,
  onChange,
  children,
  ...aria
}) => {
  return (
    <div className={`ax-button__group ${className ?? ""}`} data-vertical={vertical} {...aria}>
      {Children.toArray(children).map((el) => {
        const { value: elValue, onClick: elHandler } = getChildProps(el);
        return cloneElement(el as ReactElement, {
          "data-toggle-active": !isEmpty(value) && elValue === value,
          onClick: (b: AnyObject) => [onChange && onChange(elValue), elHandler && elHandler(b)]
        });
      })}
    </div>
  );
};
