/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon, AxTooltip } from "@axux/core";
import { ChildrenProp } from "@axux/core/dist/types";
import { FC, memo, MouseEvent, ReactNode, Ref, useCallback } from "react";
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
    isPlain,
    wrapperRef,
    ...rest
  }) => {
    const handleClear = useCallback(
      (e: MouseEvent<HTMLDivElement>) => {
        (
          e.currentTarget.parentElement?.querySelector(
            "input,textarea"
          ) as HTMLElement
        )?.focus();
        onClear?.();
      },
      [onClear]
    );
    return (
      <Container width={width} maxWidth={width} {...rest} data-plain={isPlain}>
        <div
          className="ax-field__wrapper"
          data-invalid={isInvalid}
          data-disabled={disabled}
          data-plain={isPlain}
          ref={wrapperRef}
        >
          {error && (
            <div className="ax-field__error">
              <AxTooltip content={error} color="danger">
                <AxIcon icon={Icons.iconError} />
              </AxTooltip>
            </div>
          )}
          {children}
          {canClear && (
            <div className="ax-field__clear" onClick={handleClear}>
              &times;
            </div>
          )}
        </div>
      </Container>
    );
  }
);
FieldWrapper.displayName = "AxField.Wrapper";
