/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { usePopover } from "@axux/core/dist/hooks/usePopover";
import { ChildrenProp } from "@axux/core/dist/types";
import { AxField } from "@axux/form";
import { Listbox } from "@headlessui/react";
import { FC, useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { DatePart, DateParts } from "../types";
import { getDateParts } from "../utils/dateMath";

interface Props extends ChildrenProp {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const Select = ({ options, value, onChange, width }: KeyValue) => {
  const { attributes, styles, setPopperElement, setReferenceElement } =
    usePopover({ placement: "bottom", sameWidth: true, hideArrow: true });
  return (
    <AxField.Container>
      <Listbox value={value} onChange={onChange}>
        <div className="relative ax-field__wrapper" style={{ width }}>
          <Listbox.Button
            className="ax-field__input m-0 px-2"
            ref={setReferenceElement}
          >
            <span className="block truncate">{options[value]}</span>
          </Listbox.Button>
          <Listbox.Options
            className="bg-base ring-1 ring-bw-500/20 z-10 shadow-lg"
            ref={setPopperElement}
            style={styles.popper}
            {...attributes.popper}
          >
            {Object.entries<string>(options).map(([value, label], index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  `select-none ${
                    active ? "bg-primary-500/20" : "cursor-pointer"
                  }`
                }
                value={value}
              >
                {({ selected }) => (
                  <span
                    className={`px-2 py-1 block truncate ${
                      selected ? "bg-primary-500/50" : ""
                    }`}
                  >
                    {label}
                  </span>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </AxField.Container>
  );
};

export const RelativeInput: FC<Props> = ({
  label,
  value,
  onChange,
  children,
}) => {
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
      DateParts.DECADE,
    ],
    []
  );
  const dateParts = useMemo<DatePart>(
    () => getDateParts(value) ?? { part: DateParts.DAY, op: "-", diff: 1 },
    [value]
  );
  const updateDate = useCallback(
    (field: keyof DatePart, value?: string | number) => {
      const { part, op, diff }: DatePart = { ...dateParts, [field]: value };
      onChange && onChange(`${part}${op}${diff}`);
    },
    [dateParts, onChange]
  );
  return (
    <AxField.Container label={label} className="ax-superdate__relative">
      <AxField.Number
        width={"4rem"}
        value={dateParts.diff}
        onChange={(v) => updateDate("diff", v)}
      />
      <Select
        width={"6rem"}
        options={parts.reduce(
          (ret, value) => ({
            ...ret,
            [value]: t(`label.${value}`),
          }),
          {}
        )}
        value={dateParts.part}
        onChange={(v?: string) => updateDate("part", v)}
      />
      <Select
        width={"6rem"}
        value={dateParts.op}
        options={{
          "-": t("label.-"),
          "+": t("label.+"),
        }}
        onChange={(v?: string) => updateDate("op", v)}
      />
      {children && <AxField.Addon>{children}</AxField.Addon>}
    </AxField.Container>
  );
};
