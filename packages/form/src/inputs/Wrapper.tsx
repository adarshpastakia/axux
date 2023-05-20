/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { type ChildrenProp } from "@axux/core/dist/types";
import {
  type FC,
  memo,
  type MouseEvent,
  type ReactNode,
  type Ref,
  useCallback,
} from "react";
import { Icons } from "../types/icons";
import { Container } from "./Container";

interface WrapperProps extends ChildrenProp {
  info?: string;
  label?: string;
  className?: string;
  isRequired?: boolean;
  labelAppend?: ReactNode;
  isInvalid?: boolean;
  disabled?: boolean;
  canClear?: boolean;
  isPlain?: boolean;
  error?: string;
  inline?: boolean;
  labelWidth?: string;
  width?: number | string;
  onClear?: () => void;
  wrapperRef?: Ref<HTMLDivElement>;
}

export const FieldWrapper: FC<WrapperProps> = memo(
  ({
    children,
    isInvalid,
    canClear,
    error,
    disabled,
    onClear,
    width,
    isPlain = true,
    wrapperRef,
    ...rest
  }: WrapperProps) => {
    const handleClear = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        (
          e.currentTarget.parentElement?.querySelector(
            "input,textarea,button"
          ) as HTMLElement
        )?.focus();
        onClear?.();
      },
      [onClear]
    );
    return (
      <Container width={width} {...rest} data-plain={false}>
        <div
          className="ax-field__wrapper"
          data-invalid={!disabled && isInvalid}
          data-disabled={disabled}
          data-plain={isPlain}
          ref={wrapperRef}
        >
          {error && (
            <div className="ax-field__error">
              <AxIcon
                icon={Icons.iconError}
                data-tooltip={error}
                data-tooltip-color="danger"
                data-tooltip-placement="bottom"
              />
            </div>
          )}
          {children}
          {canClear && (
            <div className="ax-field__clear" onClick={handleClear}>
              <AxIcon icon={Icons.iconClear} />
            </div>
          )}
        </div>
      </Container>
    );
  }
);
FieldWrapper.displayName = "AxField.Wrapper";
