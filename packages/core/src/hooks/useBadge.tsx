/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { isEmpty, isNumber, isString } from "@axux/utilities";
import { useMemo } from "react";
import { type BadgeType } from "../types";
import { Badge } from "../typography/Badge";

export const useBadge = (options?: BadgeType) => {
  /** ***************** normalize badge props *******************/
  const props = useMemo(() => {
    if (isEmpty(options)) return null;

    if (isString(options) || isNumber(options)) {
      return { children: options };
    }
    return { ...options, children: options.value };
  }, [options]);

  /** ***************** render badge *******************/
  return props && <Badge {...props} />;
};
