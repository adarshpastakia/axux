// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxPopover, AxTabPanel, AxTag } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocale } from "../hooks/useLocale";
import { RelativeProps, Type } from "../types";
import { DateUtils, superDateType } from "../utils/dateMath";
import { AbsoluteRange } from "./AbsoluteRange";
import { EventCalendar } from "./EventCalendar";
import { QuickSelect } from "./QuickSelect";
import { RelativeRange } from "./RelativeRange";

export const AxSuperDate: FC<RelativeProps> = ({
  type = "button",
  onChange,
  date,
  events,
  defaultView,
  presets,
  isDisabled,
  ...props
}) => {
  const {
    t,
    i18n: { language }
  } = useTranslation("superdate");
  const { dateLocale } = useLocale();
  const panelRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const [value, setValue] = useState<RelativeProps["date"]>(date ?? "$now");

  const [label, tooltip] = useMemo(
    () =>
      language && [
        DateUtils.label(value, dateLocale),
        DateUtils.toString(value, undefined, dateLocale)
      ],
    [dateLocale, value, language]
  );
  const activeTab = useMemo<Type>(() => defaultView || superDateType(value), [defaultView, value]);

  useEffect(() => {
    setValue(date);
  }, [date]);

  const Wrapper = useMemo(() => (type === "button" ? AxButton : AxTag), [type]);
  const wrapperProps = useMemo(() => {
    const ret: KeyValue = {
      icon: AppIcons.iconClock,
      color: "primary",
      isDisabled: isDisabled,
      className: "ax-superdate__button",
      onClick: () => setOpen(true),
      tooltip
    };
    if (type === "button") {
      ret.hideCaret = true;
    }
    return ret;
  }, [tooltip, type, isDisabled]);
  const updatePopup = useCallback(() => {
    if (panelRef.current) {
      const el = panelRef.current;
      setTimeout(() => el.dispatchEvent(new Event("updatePopper", { bubbles: true })), 10);
    }
  }, []);
  const afterChange = useCallback(
    (v?: string) => {
      onChange && onChange(v, DateUtils.parseRange(v));
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
      <div ref={panelRef}>
        <AxTabPanel
          className="ax-superdate__tabs"
          activeTab={activeTab}
          onActiveChange={updatePopup}
        >
          <AxTabPanel.Tab id={Type.QUICK} label={t("label.quick")}>
            <QuickSelect
              presets={presets}
              onChange={afterChange}
              date={activeTab === Type.QUICK ? value : undefined}
            />
          </AxTabPanel.Tab>
          <AxTabPanel.Tab id={Type.RELATIVE} label={t("label.relative")}>
            <RelativeRange
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
          {events && (
            <AxTabPanel.Tab id={Type.EVENTS} label={t("label.events")}>
              <EventCalendar events={events} onChange={afterChange} />
            </AxTabPanel.Tab>
          )}
        </AxTabPanel>
      </div>
    </AxPopover>
  );
};