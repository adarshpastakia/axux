// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxPopover, AxTabPanel, AxTag, useAxGlobals } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DateValue, RelativeProps, Type } from "../types";
import { DateUtils, superDateType } from "../utils/dateMath";
import { AbsoluteRange } from "./AbsoluteRange";
import { QuickSelect } from "./QuickSelect";
import { RelativeRange } from "./RelativeRange";

export const AxSuperDate: FC<RelativeProps> = ({ type = "button", onChange, date, ...props }) => {
  const {
    t,
    i18n: { language }
  } = useTranslation("superdate");
  const { dateLocale } = useAxGlobals();
  const [isOpen, setOpen] = useState(false);

  const [value, setValue] = useState<RelativeProps["date"]>(date ?? "$now");

  const [label, tooltip] = useMemo(
    () => language && [DateUtils.label(value, dateLocale), DateUtils.toString(value, dateLocale)],
    [dateLocale, value, language]
  );
  const activeTab = useMemo<Type>(() => superDateType(value), [value]);

  useEffect(() => {
    setValue(date);
  }, [date]);

  const Wrapper = useMemo(() => (type === "button" ? AxButton : AxTag), [type]);
  const wrapperProps = useMemo(() => {
    const ret: KeyValue = {
      icon: AppIcons.iconClock,
      color: "primary",
      className: "ax-superdate__button",
      onClick: () => setOpen(true),
      tooltip
    };
    if (type === "button") {
      ret.hideCaret = true;
    }
    return ret;
  }, [tooltip, type]);

  const afterChange = useCallback(
    (v: DateValue) => {
      onChange && onChange(v);
      setValue(v);
      setOpen(false);
    },
    [onChange]
  );
  return (
    <AxPopover
      isOpen={isOpen}
      closeOnClick={false}
      className="ax-superdate__popover"
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
    >
      <Wrapper {...wrapperProps}>{label}</Wrapper>
      <AxTabPanel className="ax-superdate__tabs" activeTab={activeTab}>
        <AxTabPanel.Tab id={Type.QUICK} label={t("label.quick")}>
          <QuickSelect
            {...props}
            onChange={afterChange}
            date={activeTab === Type.QUICK ? value : undefined}
          />
        </AxTabPanel.Tab>
        <AxTabPanel.Tab id={Type.RELATIVE} label={t("label.relative")}>
          <RelativeRange
            {...props}
            onChange={afterChange}
            date={activeTab === Type.RELATIVE ? value : undefined}
          />
        </AxTabPanel.Tab>
        <AxTabPanel.Tab id={Type.ABSOLUTE} label={t("label.absolute")}>
          <AbsoluteRange
            {...props}
            onChange={afterChange}
            date={activeTab === Type.ABSOLUTE ? value : undefined}
          />
        </AxTabPanel.Tab>
      </AxTabPanel>
    </AxPopover>
  );
};
