/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxText } from "@axux/core";
import { NavigationDirection } from "@axux/core/dist/types";
import { useCallback, useMemo, useState } from "react";

export const useNavigator = (totalCount = 0) => {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const onNavigate = useCallback(
    (dir: NavigationDirection) => {
      if (dir === "prev") {
        setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : totalCount - 1);
      }
      if (dir === "next") {
        setCurrentIndex(currentIndex + 1 < totalCount ? currentIndex + 1 : 0);
      }
    },
    [currentIndex, totalCount]
  );
  const headLabel = useMemo(
    () => (
      <AxText className="text-muted">
        {currentIndex + 1}/{totalCount}
      </AxText>
    ),
    [currentIndex, totalCount]
  );

  return {
    headLabel,
    onNavigate,
    currentIndex,
    setCurrentIndex,
  };
};
