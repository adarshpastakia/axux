// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxText } from "@axux/core";
import { useCallback, useMemo, useState } from "react";

export const useAxNavigator = <T extends KeyValue>(records: T[] = []) => {
  const [recordIndex, setCurrentIndex] = useState(-1);
  const onNavigate = useCallback(
    (dir) => {
      if (dir === "prev") {
        setCurrentIndex(recordIndex > 0 ? recordIndex - 1 : records.length - 1);
      }
      if (dir === "next") {
        setCurrentIndex(recordIndex + 1 < records.length ? recordIndex + 1 : 0);
      }
    },
    [recordIndex, records]
  );
  const record = useMemo(
    () => (recordIndex > -1 ? records[recordIndex] : undefined),
    [records, recordIndex]
  );
  const headLabel = useMemo(
    () => (
      <AxText color="muted" size="sm">
        {recordIndex}/{records.length}
      </AxText>
    ),
    [recordIndex, records]
  );

  return {
    record,
    headLabel,
    onNavigate,
    setCurrentIndex
  };
};
