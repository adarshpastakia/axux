/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ElementProps } from "@axux/core/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Children,
  cloneElement,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import {
  Controller as HFController,
  FormProvider,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

export interface FormProps<K = KeyValue> extends ElementProps {
  /**
   * form data schema
   */
  schema?: yup.SchemaOf<K>;
  /**
   * default data values
   */
  defaultValues?: K;
  /**
   * disable form input when submitting in progress
   */
  isSubmitting?: boolean;
  /**
   * submit callback after successful validation
   */
  onSubmit?: (values: K) => void;
}

export interface ControllerProps {
  name: string;
  children: ReactElement;
}

export const Controller: FC<ControllerProps> = ({ name, children }) => {
  return (
    <HFController
      name={name}
      render={({ field: { ref, ...field }, fieldState: { error } }) =>
        cloneElement(Children.only(children), {
          ...field,
          inputRef: ref,
          isInvalid: !!error?.message,
          error: error?.message,
        })
      }
    />
  );
};

export const AxForm: FC<FormProps> & { Controller: typeof Controller } = <
  K extends KeyValue
>({
  schema,
  children,
  defaultValues,
  isSubmitting,
  onSubmit,
  ...rest
}: PropsWithChildren<FormProps<K>>) => {
  const form = useForm({
    resolver: schema && yupResolver(schema),
    defaultValues: defaultValues as any,
  });

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit && form.handleSubmit(onSubmit)}
        action="none"
        autoComplete="off"
        data-disabled={isSubmitting}
        {...rest}
      >
        {children}
      </form>
    </FormProvider>
  );
};
AxForm.Controller = Controller;

AxForm.displayName = "AxForm";
AxForm.Controller.displayName = "AxForm.Controller";
