/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ElementProps } from "@axux/core/dist/types";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useImperativeHandle,
  useTransition,
  type FC,
  type PropsWithChildren,
  type ReactElement,
  type Ref,
} from "react";
import {
  FormProvider,
  Controller as HFController,
  useForm,
  type DefaultValues,
} from "react-hook-form";
import type * as yup from "yup";
import { type InputProps } from "../types";

export interface FormRef<K> {
  reset: () => void;
  clear: () => void;
  submit: () => void;
  validate: () => Promise<boolean>;
  getValues: () => K;
  setValue: (key: keyof K, value: AnyObject) => void;
  setValues: (values: K) => void;
}

export interface FormProps<K extends KeyValue = KeyValue> extends ElementProps {
  formRef?: Ref<FormRef<K>>;
  /**
   * form data schema
   */
  schema?: yup.ObjectSchema<K>;
  /**
   * default data values
   */
  defaultValues?: K;
  /**
   * change callback
   */
  onChange?: (values: K) => void;
  /**
   * submit callback after successful validation
   */
  onSubmit?: (values: K) => void;
}

export interface ControllerProps {
  name: string;
  children:
    | ReactElement
    | ((
        props: InputProps & { inputRef?: React.Ref<HTMLInputElement> }
      ) => ReactElement);
}

export const AxController: FC<ControllerProps> = ({ name, children }) => {
  return (
    <HFController
      name={name}
      render={({
        field: { ref, onChange, ...field },
        fieldState: { error },
        formState: { isSubmitting },
      }) =>
        isValidElement<AnyObject>(children)
          ? cloneElement(Children.only(children), {
              ...field,
              inputRef: (el: AnyObject) => {
                el && ref(el);
                try {
                  if (
                    children.props.inputRef &&
                    "current" in children.props.inputRef
                  )
                    children.props.inputRef.current = el;
                  if (children.props.inputRef?.prototype)
                    children.props.inputRef(el);
                } catch (_) {
                  //
                }
              },
              isReadOnly: isSubmitting || children.props.isReadOnly,
              isInvalid: !!error?.message || children.props.isInvalid,
              error: error?.message,
              onChange: (v: AnyObject) => {
                onChange(v);
                children.props.onChange?.(v);
              },
            })
          : children({
              ...field,
              inputRef: (el: AnyObject) => {
                el && ref(el);
              },
              isReadOnly: isSubmitting,
              isInvalid: !!error?.message,
              error: error?.message,
              onChange: (v: AnyObject) => {
                onChange(v);
              },
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
  onSubmit = () => undefined,
  onChange,
  ...rest
}: PropsWithChildren<FormProps<K>>) => {
  const form = useForm({
    shouldFocusError: true,
    resolver: schema && yupResolver(schema as AnyObject),
    defaultValues: defaultValues as DefaultValues<K>,
  });

  const [, startTransition] = useTransition();
  useEffect(() => {
    const subscription = form.watch((value) => {
      startTransition(() => onChange?.(value as K));
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  useImperativeHandle(
    formRef,
    () => ({
      reset: () => (form.reset(defaultValues), form.clearErrors()),
      clear: () => (form.reset({} as AnyObject), form.clearErrors()),
      submit: () => form.handleSubmit(onSubmit),
      validate: async () => await form.trigger(),
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

  const onInvalid = useCallback((_: AnyObject, e: AnyObject) => {
    const el = e.target;
    setTimeout(
      () =>
        el
          .querySelector(
            "input[data-invalid='true'],textarea[data-invalid='true'],.ax-select__input"
          )
          ?.focus(),
      10
    );
  }, []);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit, onInvalid) as AnyObject}
        data-loading={form.formState.isSubmitting}
        className="ax-form contents"
        autoComplete="off"
        {...rest}
      >
        {children}
        <input type="submit" className="absolute invisible" />
      </form>
    </FormProvider>
  );
};
AxForm.Controller = AxController;
