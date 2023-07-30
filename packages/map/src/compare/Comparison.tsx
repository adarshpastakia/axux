/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import { Fragment, useCallback, useState, type FC } from "react";
import { CompareLayer, type ComparisonProps } from "./CompareLayer";
import { CompareTool } from "./CompareTool";

type Events = Pick<ComparisonProps, "events" | "compareEvents">;
export interface CompareProps
  extends Pick<
    ComparisonProps,
    "color" | "compareColor" | "countField" | "compareCountField"
  > {
  onCompareStart: () => Promise<Events>;
}

export const Comparison: FC<CompareProps> = ({ onCompareStart, ...props }) => {
  const [isLoading, setLoading] = useState(false);
  const [events, setEvents] = useState<Events>();

  const onCompare = useCallback(() => {
    setLoading(true);
    void onCompareStart()
      .then(setEvents)
      .catch(() => false)
      .then(() => setLoading(false));
  }, [onCompareStart]);

  return (
    <Fragment>
      <CompareLayer {...events} {...props} />
      <CompareTool
        onCompare={onCompare}
        onCancel={() => setEvents(undefined)}
        isLoading={isLoading}
        isComparing={!!events}
      />
    </Fragment>
  );
};
