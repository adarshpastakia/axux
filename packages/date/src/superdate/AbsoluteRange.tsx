/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxContent, AxFooter, AxPopover } from "@axux/core";
import { type FC, Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxRangePanel } from "../panels/RangePanel";
import { type ParsedDate, type RelativeProps } from "../types";
import { DateMath } from "../utils";

export const AbsoluteRange: FC<Omit<RelativeProps, "type" | "presets">> = ({
  date,
  onChange,
  ...props
}) => {
  const { t } = useTranslation("superdate");
  const [parsed, setParsed] = useState<[ParsedDate, ParsedDate] | undefined>();
  useEffect(() => setParsed(DateMath.parseRange(date)), [date]);
  return (
    <Fragment>
      <AxContent padding="none">
        <AxRangePanel
          date={parsed as AnyObject}
          onChange={setParsed}
          {...props}
        />
      </AxContent>
      <AxFooter className="flex justify-end">
        <AxPopover.Dismiss>
          <AxButton
            size="sm"
            variant="solid"
            isDisabled={parsed == null}
            onClick={() => onChange?.(DateMath.convert(parsed))}
          >
            {t("core:action.apply")}
          </AxButton>
        </AxPopover.Dismiss>
      </AxFooter>
    </Fragment>
  );
};
