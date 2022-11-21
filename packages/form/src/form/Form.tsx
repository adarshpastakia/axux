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
  useCallback,
  useEffect,
  useImperativeHandle,
  useTransition,
} from "react";
import {
  Controller as HFController,
  DeepPartial,
  FormProvider,
  useForm,
} from "react-hook-form";
import * as yup from "yup";

export interface FormRef<K> {
  reset: () => void;
  clear: () => void;
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
  children: ReactElement;
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
        cloneElement(Children.only(children), {
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
          isDisabled: isSubmitting || children.props.isDisabled,
          isInvalid: !!error?.message || children.props.isInvalid,
          error: error?.message,
          onChange: (v: AnyObject) => {
            onChange(v);
            children.props.onChange?.(v);
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
    resolver: schema && yupResolver(schema),
    defaultValues: defaultValues as DeepPartial<K>,
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
            "input[data-invalid='true'],textarea[data-invalid='true']"
          )
          ?.focus(),
      10
    );
  }, []);

  return (
    <FormProvider {...form}>
      <form
        onSubmit={() => form.handleSubmit(onSubmit, onInvalid)}
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
