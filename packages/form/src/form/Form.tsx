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
  Ref,
  useImperativeHandle,
} from "react";
import {
  Controller as HFController,
  DeepPartial,
  FormProvider,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

interface FormRef<K> {
  reset: () => void;
  submit: () => void;
  validate: () => Promise<boolean>;
  getValues: () => K;
  setValue: (key: keyof K, value: AnyObject) => void;
  setValues: (values: K) => void;
}

export interface FormProps<K = KeyValue> extends ElementProps {
  formRef?: Ref<FormRef<K>>;
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

export const AxForm = <K extends KeyValue>({
  formRef,
  schema,
  children,
  defaultValues,
  isSubmitting,
  onSubmit = () => undefined,
  ...rest
}: PropsWithChildren<FormProps<K>>) => {
  const form = useForm({
    resolver: schema && yupResolver(schema),
    defaultValues: defaultValues as DeepPartial<K>,
  });

  useImperativeHandle(
    formRef,
    () => ({
      reset: () => form.reset(defaultValues),
      submit: () => form.handleSubmit(onSubmit),
      validate: () => form.trigger(),
      getValues: () => form.getValues(),
      setValues: (v) => form.reset(v),
      setValue: (k, v) =>
        form.setValue(k as AnyObject, v, {
          shouldDirty: false,
          shouldTouch: false,
        }),
    }),
    [onSubmit, form, defaultValues]
  );

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        autoComplete="off"
        data-disabled={isSubmitting}
        {...rest}
      >
        {children}
        <input type="submit" className="absolute invisible" />
      </form>
    </FormProvider>
  );
};
AxForm.Controller = Controller;

AxForm.displayName = "AxForm";
AxForm.Controller.displayName = "AxForm.Controller";
