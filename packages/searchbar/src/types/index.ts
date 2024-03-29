/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type MenuChildren } from "@axux/core/dist/menu/types";
import { type SuggestItem } from "@axux/form/dist/select/Suggest";
import { type ReactElement } from "react";

export enum EnumFieldType {
  KEYWORD = "KEYWORD",
  STRING = "string",
  INT = "int",
  FLOAT = "float",
  BOOLEAN = "boolean",
  DATE = "date",
  GEO = "geo",
}

export enum EnumOperator {
  EXISTS = "EXISTS",
  IS = "IS",
  IN = "IN",
  LT = "LT",
  GT = "GT",
  LTE = "LTE",
  GTE = "GTE",
  INCLUDES = "INCLUDES",
  STARTS = "STARTS",
  ENDS = "ENDS",
  WITHIN = "WITHIN",
  BETWEEN = "BETWEEN",
}

/**
 * @internal
 */
export const TypeOperators: { [key in EnumFieldType]: EnumOperator[] } = {
  [EnumFieldType.KEYWORD]: [EnumOperator.IS, EnumOperator.IN],
  [EnumFieldType.STRING]: [
    EnumOperator.IS,
    EnumOperator.IN,
    EnumOperator.INCLUDES,
    EnumOperator.STARTS,
    EnumOperator.ENDS,
  ],
  [EnumFieldType.INT]: [
    EnumOperator.IS,
    EnumOperator.BETWEEN,
    EnumOperator.LT,
    EnumOperator.GT,
    EnumOperator.LTE,
    EnumOperator.GTE,
  ],
  [EnumFieldType.FLOAT]: [
    EnumOperator.IS,
    EnumOperator.BETWEEN,
    EnumOperator.LT,
    EnumOperator.GT,
    EnumOperator.LTE,
    EnumOperator.GTE,
  ],
  [EnumFieldType.BOOLEAN]: [EnumOperator.IS],
  [EnumFieldType.DATE]: [
    EnumOperator.BETWEEN,
    EnumOperator.LT,
    EnumOperator.GT,
    EnumOperator.LTE,
    EnumOperator.GTE,
  ],
  [EnumFieldType.GEO]: [],
};

/**
 * @internal
 */
export const OperatorValueType: {
  [key in EnumOperator]: "single" | "double" | "multiple";
} = {
  [EnumOperator.EXISTS]: "single",
  [EnumOperator.IS]: "single",
  [EnumOperator.IN]: "multiple",
  [EnumOperator.BETWEEN]: "double",
  [EnumOperator.WITHIN]: "single",
  [EnumOperator.STARTS]: "single",
  [EnumOperator.ENDS]: "single",
  [EnumOperator.INCLUDES]: "single",
  [EnumOperator.LT]: "single",
  [EnumOperator.GT]: "single",
  [EnumOperator.LTE]: "single",
  [EnumOperator.GTE]: "single",
};

/**
 * @internal
 */
export type FilterValue =
  | undefined
  | boolean
  | string
  | string[]
  | number
  | [number, number]
  | KeyValue;

/**
 * @internal
 */
export type FieldValue =
  | string
  | { value: string; label: string; icon?: AnyObject };

export interface FilterField {
  field: string;
  label: string;
  type: EnumFieldType;
  values?: FieldValue[];
  defaultOperator?: EnumOperator;
  onSearch?: (q: string) => Promise<FieldValue[]> | FieldValue[];
}

interface BaseFilter {
  id?: string;
  type: "filter" | "query";
  label?: string;
  isScope?: boolean;
  isGlobal?: boolean;
  isDisabled?: boolean;
  isNegative?: boolean;
  isRequired?: boolean;
  canEdit?: false;
  canInvert?: false;
  canDisable?: false;
}
export interface FilterByField extends BaseFilter {
  type: "filter";
  field: string;
  operator: EnumOperator;
  value?: FilterValue;
}
export interface FilterByQuery extends BaseFilter {
  type: "query";
  label: string;
  query: KeyValue[];
}

export type FilterObject = FilterByField | FilterByQuery;

export interface QueryObject {
  query?: string;
  filters: FilterObject[];
}

export interface SearchProps {
  /**
   * Query string
   */
  query?: string;

  /**
   * Search history count
   * @default 20
   */
  historyCount?: number;

  /**
   * Search history storage key
   * @default: "ax:search"
   */
  historyKey?: string;

  /**
   * Default query items for suggest
   */
  defaultQueryList?: SuggestItem[];

  /**
   * Add-on before search input
   */
  prepend?: ReactElement;
  /**
   * Add-on after search input
   */
  append?: ReactElement;

  /**
   * Additional actions menu
   */
  actions?: MenuChildren | MenuChildren[];

  /**
   * Hide filter bar
   */
  hideFilters?: boolean;

  /**
   * Disable component
   */
  isDisabled?: boolean;

  /**
   * Collapse filters
   * @default true
   */
  isCollapsed?: boolean;
  /**
   * On filter collapsed
   * @param collapsed
   */
  onCollapsed?: (collapsed: boolean) => void;

  /**
   * On suggestion select
   */
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  onSelect?: (item: SuggestItem) => Promise<boolean> | boolean;

  /**
   * On search event
   * @param queryObject
   */
  onSearch?: (queryObject: QueryObject) => void;
  /**
   * On query string change event
   * @param query
   */
  onQuery?: (query: string) => Promise<SuggestItem[]> | SuggestItem[];
}

export interface FilterProps {
  /**
   * Filters list
   * @default []
   */
  filters?: FilterObject[];

  /**
   * Field list
   * (Required when filter bar enabled)
   */
  fields?: FilterField[];

  /**
   * Editable filters
   */
  isEditable?: boolean;

  /**
   * Disable component
   */
  isDisabled?: boolean;

  /**
   * Message for empty field list
   */
  emptyFields?: string;

  /**
   * On filters change, (add/update/delete)
   * @param filters
   */
  onFilterChanged?: (filters: FilterObject[]) => void;
}
