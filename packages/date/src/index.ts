// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import "./i18n";

import { AxDateInput } from "./inputs/DateInput";
import { AxRangeInput } from "./inputs/RangeInput";
import { AxDatePanel } from "./panels/DatePanel";
import { AxRangePanel } from "./panels/RangePanel";

export const AxDateTime = {
  Panel: AxDatePanel,
  Input: AxDateInput
};

export const AxDateRange = {
  Panel: AxRangePanel,
  Input: AxRangeInput
};

export { AxSuperDate } from "./superdate/SuperDate";
export { AxDateDisplay } from "./display/DateDisplay";
export { DateUtils } from "./utils/dateMath";
