/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxFlexBox, AxPopover } from "@axux/core";
import { AxField, AxForm, FormRef } from "@axux/form";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { useSearchContext } from "../context";
import {
  EnumFieldType,
  EnumOperator,
  FilterByField,
  FilterField,
  TypeOperators,
} from "../types";

const FilterSchema = new yup.ObjectSchema({
  field: yup.string().required(),
  operator: yup.string().required(),
  value: yup
    .mixed()
    .when("operator", {
      is: EnumOperator.EXISTS,
      then: (schema) => schema.optional(),
      otherwise: (schema) => schema.required(),
    })
    .when("operator", {
      is: EnumOperator.IN,
      then: (schema) =>
        schema.test({
          name: "array-check",
          message: "${path} is a required field",
          test: (val = []) => val?.length > 0,
        }),
    }),
});

export const FilterForm = ({
  index,
  ...filter
}: Partial<FilterByField> & { index: number }) => {
  const cancelRef = useRef<HTMLElement>(null);
  const formRef = useRef<FormRef<FilterByField>>(null);
  const { t } = useTranslation("searchbar");
  const [values, setValues] = useState(filter);
  const { updateFilter, addFilter, removeFilter, fields } = useSearchContext();

  const fieldList = useMemo(() => {
    return Object.entries(
      fields.reduce<KeyValue>(
        (r, c) => ({ ...r, [c.type]: [...(r[c.type] ?? []), c] }),
        {}
      )
    ).map(([label, items]) => ({ label: t(`type.${label}`), items }));
  }, [fields]);

  const field = useMemo<FilterField | undefined>(() => {
    if (!values.field) return undefined;
    return fields.find((f) => f.field === values.field);
  }, [values]);

  const operators = useMemo(() => {
    if (!field) return [];
    return [EnumOperator.EXISTS, ...TypeOperators[field.type]];
  }, [field]);

  useEffect(() => {
    if (field && !values.operator) {
      formRef.current?.setValue("operator", EnumOperator.EXISTS);
    }
    if (values.operator === EnumOperator.EXISTS && values.value !== undefined) {
      formRef.current?.setValue("value", undefined);
    }
    if (
      field?.type === EnumFieldType.BOOLEAN &&
      values.operator === EnumOperator.IS &&
      values.value === undefined
    ) {
      formRef.current?.setValue("value", false);
    }
  }, [values, field]);

  const valueInput = useMemo(() => {
    if (!field || !values.operator) return null;
    if (values.operator === EnumOperator.EXISTS) return null;
    if (field?.type === EnumFieldType.BOOLEAN) {
      return (
        <AxField.Container label={t("label.value")} data-plain="true">
          <AxForm.Controller name="value">
            <AxField.Switch onLabel="True" offLabel="False" />
          </AxForm.Controller>
        </AxField.Container>
      );
    }
    if (field?.type === EnumFieldType.STRING) {
      if (
        [
          EnumOperator.STARTS,
          EnumOperator.ENDS,
          EnumOperator.INCLUDES,
        ].includes(values.operator as AnyObject)
      ) {
        return (
          <AxForm.Controller name="value">
            <AxField.Text label={t("label.value")} allowClear />
          </AxForm.Controller>
        );
      } else if (values.operator === EnumOperator.IN) {
        return (
          <AxForm.Controller name="value">
            <AxField.Tag
              isEditable
              allowCreate
              allowClear
              options={field.values ?? []}
              label={t("label.value")}
            />
          </AxForm.Controller>
        );
      } else {
        return (
          <AxForm.Controller name="value">
            <AxField.Select
              isEditable
              allowCreate
              allowClear
              options={field.values ?? []}
              label={t("label.value")}
              onQuery={field.onSearch}
            />
          </AxForm.Controller>
        );
      }
    }
    if (
      field?.type === EnumFieldType.FLOAT ||
      field?.type === EnumFieldType.INT
    ) {
      const step = field.type === EnumFieldType.FLOAT ? 0.1 : 1;
      if (values.operator === EnumOperator.BETWEEN) {
        return (
          <AxField.Container label={t("label.value")}>
            <AxForm.Controller name="value[0]">
              <AxField.Number step={step} allowClear />
            </AxForm.Controller>
            <AxField.Addon>
              &gt;<i>n</i>&lt;
            </AxField.Addon>
            <AxForm.Controller name="value[1]">
              <AxField.Number step={step} allowClear />
            </AxForm.Controller>
          </AxField.Container>
        );
      } else {
        return (
          <AxForm.Controller name="value">
            <AxField.Number label={t("label.value")} step={step} allowClear />
          </AxForm.Controller>
        );
      }
    }
  }, [field, values.operator]);

  const handleSubmit = useCallback(
    (values: AnyObject) => {
      index === -1 ? addFilter(values) : updateFilter(index, values);
      cancelRef.current?.click();
    },
    [updateFilter, addFilter, index]
  );

  return (
    <AxForm
      formRef={formRef}
      schema={FilterSchema}
      defaultValues={filter as AnyObject}
      onSubmit={handleSubmit}
      onChange={setValues}
    >
      <AxFlexBox fluid>
        <AxFlexBox.Row>
          <AxFlexBox.Col flex="fill">
            <AxForm.Controller name="field">
              <AxField.Select
                autoFocus
                label={t("label.field")}
                options={fieldList}
                valueProperty="field"
              />
            </AxForm.Controller>
          </AxFlexBox.Col>
          <AxFlexBox.Col flex="auto">
            <AxField.Container label={t("label.exclude")} data-plain="true">
              <AxForm.Controller name="isNegative">
                <AxField.Switch
                  className="mt-2 mx-1"
                  color="danger"
                  onLabel="NOT"
                />
              </AxForm.Controller>
            </AxField.Container>
          </AxFlexBox.Col>
          <AxFlexBox.Col flex="auto" width="8rem">
            <AxForm.Controller name="operator">
              <AxField.Select
                label={t("label.operator")}
                options={operators.map((op) => ({
                  value: op,
                  label: t(`operator.${op}`),
                }))}
              />
            </AxForm.Controller>
          </AxFlexBox.Col>
        </AxFlexBox.Row>

        <AxFlexBox.Row>
          <AxFlexBox.Col flex="fill">{valueInput}</AxFlexBox.Col>
        </AxFlexBox.Row>

        <div className="pt-6">
          <AxForm.Controller name="label">
            <AxField.Text
              label={t("label.label")}
              placeholder="Filter label..."
            >
              <AxField.Addon showWhenEmpty>{t("label.optional")}</AxField.Addon>
            </AxField.Text>
          </AxForm.Controller>
        </div>

        <AxFlexBox.Row className="pt-8">
          <AxFlexBox.Col flex="fill">
            {index > -1 && (
              <AxPopover.Dismiss>
                <AxButton
                  size="sm"
                  style="link"
                  color="danger"
                  onClick={() => removeFilter(index)}
                >
                  {t("label.remove")}
                </AxButton>
              </AxPopover.Dismiss>
            )}
          </AxFlexBox.Col>
          <AxFlexBox.Col flex="auto">
            <AxPopover.Dismiss ref={cancelRef}>
              <AxButton size="sm" style="link">
                {t("label.cancel")}
              </AxButton>
            </AxPopover.Dismiss>
            <AxButton size="sm" style="solid" type="submit">
              {index === -1 ? t("label.add") : t("label.update")}
            </AxButton>
          </AxFlexBox.Col>
        </AxFlexBox.Row>
      </AxFlexBox>
    </AxForm>
  );
};
