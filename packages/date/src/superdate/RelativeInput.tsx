// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxField } from "@axux/form";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DatePart, DateParts } from "../types";
import { getDateParts } from "../utils/dateMath";

interface Props {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export const RelativeInput: FC<Props> = ({ label, value, onChange, children }) => {
  const { t } = useTranslation("superdate");
  const parts = useMemo(
    () => [
      DateParts.MINUTE,
      DateParts.HOUR,
      DateParts.DAY,
      DateParts.WEEK,
      DateParts.MONTH,
      DateParts.QUARTER,
      DateParts.YEAR,
      DateParts.DECADE
    ],
    []
  );
  const dateParts = useMemo<DatePart>(
    () => getDateParts(value) ?? { part: DateParts.DAY, op: "-", diff: 1 },
    [value]
  );
  const updateDate = useCallback(
    (field: keyof DatePart, value) => {
      const { part, op, diff }: DatePart = { ...dateParts, [field]: value };
      onChange && onChange(`${part}${op}${diff}`);
    },
    [dateParts, onChange]
  );
  return (
    <AxField label={label}>
      <AxField.Number width={48} value={dateParts.diff} onChange={(v) => updateDate("diff", v)} />
      <AxField.Select
        width={96}
        options={parts.map((value) => ({ value, label: t(`label.${value}`) }))}
        value={dateParts.part}
        usePortal={false}
        onChange={(v: string) => updateDate("part", v)}
      />
      <AxField.Select
        width={96}
        value={dateParts.op}
        usePortal={false}
        options={[
          { value: "-", label: t("label.-") },
          { value: "+", label: t("label.+") }
        ]}
        onChange={(v: string) => updateDate("op", v)}
      />
      {children && <AxField.Addon>{children}</AxField.Addon>}
    </AxField>
  );
};
