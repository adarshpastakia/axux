// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { EmptyCallback } from "@axux/core/dist/types";
import { isEmpty } from "@axux/utilities";
import {
  FC,
  FocusEventHandler,
  Fragment,
  KeyboardEvent,
  KeyboardEventHandler,
  MutableRefObject,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Controller, RefCallBack, useFormContext } from "react-hook-form";
import { ControllerProps } from "../types";

interface ControlProps {
  ref: RefCallBack;
  refInput: MutableRefObject<HTMLInputElement | undefined>;
  canClear?: boolean;
  onChange?: (v: AnyObject) => void;
  value?: AnyObject;
  error?: string;
  onClear?: EmptyCallback;
  onBlur?: FocusEventHandler;
  onEnter: KeyboardEventHandler;
}
interface FieldControllerProps extends ControllerProps<AnyObject> {
  children: (control: ControlProps) => ReactElement;
}

export const AxFieldController: FC<FieldControllerProps> = ({
  children,
  name,
  autoFocus,
  value,
  onChange: inheritChangeHandler,
  onEnterPressed,
  error,
  allowClear
}) => {
  const formContext = useFormContext();

  const refInput = useRef<HTMLInputElement>();
  const [canClear, setCanClear] = useState(false);

  const handleEnter = useCallback(
    (e: KeyboardEvent) => {
      e.key === "Enter" && onEnterPressed && onEnterPressed();
    },
    [onEnterPressed]
  );

  useLayoutEffect(() => {
    if (autoFocus && refInput.current) {
      refInput.current.focus();
    }
  }, [autoFocus, refInput]);

  return useMemo(() => {
    if (formContext && name) {
      return (
        <Controller
          control={formContext.control}
          name={name}
          render={({ field: { ref, onChange, value = "", onBlur }, fieldState }) => {
            const canClear = allowClear && !isEmpty(value);
            const changeHandler = (event: AnyObject) => {
              onChange(event);
              inheritChangeHandler && inheritChangeHandler(event);
            };
            const clearHandler = () => {
              onChange("");
              inheritChangeHandler && inheritChangeHandler(undefined);
              refInput.current && refInput.current.focus();
            };
            return children({
              ref: (el: HTMLInputElement) => {
                ref(el);
                refInput.current = el;
              },
              refInput,
              canClear,
              onChange: changeHandler,
              onBlur,
              value,
              error: fieldState.error?.message,
              onEnter: handleEnter,
              onClear: clearHandler
            });
          }}
        />
      );
    } else {
      const changeHandler = (value: AnyObject) => {
        setCanClear(!!allowClear && !isEmpty(value));
        inheritChangeHandler && inheritChangeHandler(value);
      };
      const clearHandler = () => {
        setCanClear(false);
        refInput.current && (refInput.current.value = "");
        inheritChangeHandler && inheritChangeHandler(undefined);
        refInput.current && refInput.current.focus();
      };
      return (
        <Fragment>
          {children({
            ref: (el) => (refInput.current = el),
            refInput,
            onChange: changeHandler,
            error,
            value,
            onEnter: handleEnter,
            canClear,
            onClear: clearHandler
          })}
        </Fragment>
      );
    }
  }, [
    allowClear,
    canClear,
    children,
    error,
    formContext,
    handleEnter,
    inheritChangeHandler,
    name,
    value
  ]);
};
