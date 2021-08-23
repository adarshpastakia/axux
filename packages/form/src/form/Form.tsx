// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { yupResolver } from "@hookform/resolvers/yup";
import { MutableRefObject, PropsWithChildren, useImperativeHandle, useRef } from "react";
import { FormProvider, useForm, UseFormSetValue } from "react-hook-form";
import yup from "yup";

export interface FormRef<T = KeyValue> {
  /**
   * Get form values
   */
  getValues: () => T;
  /**
   * Set form values
   */
  setValue: UseFormSetValue<T>;
  /**
   * Trigger form submit
   */
  submit: () => void;
  /**
   * Reset form to default values
   */
  reset: () => void;
  /**
   * Clear all values
   */
  clear: () => void;
  /**
   * Validate form
   */
  validate: () => void;
}

/** @internal */
export interface FormProps<T = KeyValue> {
  /**
   * Layout columns (1-4)
   * @default 2
   */
  columns?: number;
  /**
   * Stretch form to 100%
   */
  fluid?: boolean;
  /**
   * Default form values
   */
  defaultValues?: T;
  /**
   * Yup schema for validation
   */
  schema?: yup.SchemaOf<T>;
  /**
   * Ref object
   */
  formRef?: MutableRefObject<FormRef<T> | null | undefined>;
  /**
   * Submit handler
   */
  onSubmit?: (values: T) => void | Promise<void>;
}

/**
 * Form wrapper
 * @internal
 */
export const AxForm = <T extends KeyValue>({
  schema,
  children,
  formRef,
  fluid = false,
  columns = 2,
  onSubmit = () => Promise.resolve(),
  defaultValues
}: PropsWithChildren<FormProps<T>>) => {
  const methods = useForm<T>({
    mode: "all",
    shouldFocusError: true,
    resolver: yupResolver(schema as AnyObject),
    defaultValues: defaultValues as AnyObject
  });
  const formEl = useRef<HTMLFormElement>(null);

  useImperativeHandle(
    formRef,
    () => {
      return {
        setValue: methods.setValue,
        getValues: methods.getValues,
        validate: methods.trigger,
        isDirty: methods.formState.isDirty,
        isValid: methods.formState.isValid,
        submit: methods.handleSubmit(onSubmit as AnyObject),
        reset: () => methods.reset(defaultValues as AnyObject),
        clear: () => methods.reset({} as AnyObject)
      } as FormRef<T>;
    },
    [defaultValues, methods, onSubmit]
  );

  return (
    <FormProvider {...methods}>
      <form
        ref={formEl}
        noValidate
        className="ax-form"
        data-fluid={fluid}
        onSubmit={methods.handleSubmit(onSubmit as AnyObject)}
        style={{ "--columns": Math.min(4, Math.max(1, columns)) } as AnyObject}
      >
        {children}
        <input type="submit" style={{ position: "absolute", top: "-200%" }} />
      </form>
    </FormProvider>
  );
};
AxForm.displayName = "AxForm";
