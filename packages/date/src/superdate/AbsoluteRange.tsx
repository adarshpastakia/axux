// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxPanel, AxToolbar } from "@axux/core";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AxRangePanel } from "../panels/RangePanel";
import { ParsedDate, RelativeProps } from "../types";
import { DateUtils } from "../utils/dateMath";

export const AbsoluteRange: FC<Omit<RelativeProps, "type" | "presets">> = ({
  date,
  onChange,
  ...props
}) => {
  const { t } = useTranslation("superdate");
  const [parsed, setParsed] = useState<[ParsedDate, ParsedDate] | undefined>();
  useEffect(() => setParsed(DateUtils.parseRange(date)), [date]);
  return (
    <AxPanel>
      <AxRangePanel date={parsed as AnyObject} onChange={setParsed} {...props} />
      <AxPanel.Footer>
        <AxToolbar align="end">
          <AxButton.Positive
            size="sm"
            isDisabled={!parsed}
            onClick={() => onChange && onChange(DateUtils.convert(parsed))}
          >
            {t("core:action.apply")}
          </AxButton.Positive>
        </AxToolbar>
      </AxPanel.Footer>
    </AxPanel>
  );
};
