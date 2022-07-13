/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxTabPanel, AxTag } from "@axux/core";
import { useGlobals } from "@axux/core/dist/context/Global";
import { AxPopover } from "@axux/core/dist/overlays/Popover";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RelativeProps, Type } from "../types";
import { Icons } from "../types/icons";
import { DateMath, superDateType } from "../utils/dateMath";
import { AbsoluteRange } from "./AbsoluteRange";
import { EventCalendar } from "./EventCalendar";
import { QuickSelect } from "./QuickSelect";
import { RelativeRange } from "./RelativeRange";

export const AxSuperDate: FC<RelativeProps> = ({
  type = "button",
  onChange,
  date = "$now|$now",
  events,
  defaultView,
  presets,
  isDisabled,
  ...props
}) => {
  const {
    t,
    i18n: { language },
  } = useTranslation("superdate");
  const panelRef = useRef<HTMLDivElement>(null);
  const { currentCalendar, currentLocale } = useGlobals();
  const isHijri = useMemo(() => currentCalendar === "hijri", [currentCalendar]);

  const [value, setValue] = useState<RelativeProps["date"]>(date ?? "$now");

  const [label, tooltip] = useMemo(
    () => [
      DateMath.label(value, language),
      isHijri
        ? DateMath.toHijri(value, undefined, language)
        : DateMath.toString(value, undefined, language),
    ],
    [language, value, language, isHijri]
  );
  const activeTab = useMemo<Type>(
    () => defaultView || superDateType(value),
    [defaultView, value]
  );

  useEffect(() => {
    setValue(date);
  }, [date]);

  const Wrapper = useMemo(() => (type === "button" ? AxButton : AxTag), [type]);
  const wrapperProps = useMemo(() => {
    const ret: KeyValue = {
      icon: Icons.iconClock,
      color: "primary",
      tooltip,
      isDisabled: isDisabled,
      className: "ax-superdate__button",
    };
    return ret;
  }, [tooltip, type, isDisabled]);
  const updatePopup = useCallback(() => {
    if (panelRef.current) {
      const el = panelRef.current;
      setTimeout(
        () => el.dispatchEvent(new Event("updatePopper", { bubbles: true })),
        10
      );
    }
  }, []);
  const afterChange = useCallback(
    (v?: string) => {
      onChange && onChange(v, DateMath.parseRange(v));
      setValue(v);
    },
    [onChange]
  );
  return (
    <AxPopover placement="bottom-start" hideArrow>
      <Wrapper {...wrapperProps}>{label}</Wrapper>
      <div ref={panelRef} className="ax-superdate">
        <AxTabPanel
          align="start"
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
