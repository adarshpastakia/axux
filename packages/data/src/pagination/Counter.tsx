// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { VFC } from "@axux/core/dist/types";
import { useTranslation } from "react-i18next";

export interface CounterProps {
  start: number;
  end: number;
  total: number;
}

export const AxRecordCounter: VFC<CounterProps> = ({ start, end, total }) => {
  const { t } = useTranslation("data");
  return (
    <bdi className="ax-padding--x--sm ax-font--sm ax-color--muted">
      {total > 0 ? `${start}-${end} of ${total}` : t("label.noRecords")}
    </bdi>
  );
};
