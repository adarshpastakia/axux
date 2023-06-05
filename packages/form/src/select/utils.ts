/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { type ChildrenProp, type ElementProps } from "@axux/core/dist/types";
import { isEmpty, isObject } from "@axux/utilities";
import { type ReactElement } from "react";
import { type InputProps } from "../types";

export interface BaseSelectProps<T> extends ElementProps, ChildrenProp {
  options: T[] | Array<{ label: string; items: T[] }>;

  allowCreate?: boolean;
  isEditable?: boolean;

  labelProperty?: string;
  valueProperty?: string;

  usePortal?: boolean;

  matcher?: (option: T, value: string) => boolean;
  renderer?: (option: T) => ReactElement;

  onQuery?: (text: string) => Promise<T[]> | T[];
  onCreateOption?: (text: string) => void;
}

export interface SelectProps<T> extends BaseSelectProps<T>, InputProps {
  onSelect?: (option: T) => Promise<boolean> | boolean;
  makeLabel?: (option: T) => string;
}
export interface TagProps<T> extends BaseSelectProps<T>, InputProps<string[]> {
  onSelect?: (option: T[]) => Promise<boolean> | boolean;
  makeLabel?: (option: T) => string | ReactElement;
}

/** ***************** default option matcher *******************/
export const defaultMatcher = (
  option: AnyObject,
  value?: string,
  prop?: string
) =>
  ((Object.hasOwn || Object.hasOwnProperty)(option ?? "", prop ?? "")
    ? option[prop as AnyObject]
    : option) === value;

/** ***************** get option value *******************/
export const getValue = (option: AnyObject, prop?: string) =>
  !option ? undefined : option[prop ?? ""] ?? option;

/** ***************** get option label *******************/
export const getLabel = (option: AnyObject, prop?: string) =>
  isEmpty(option) ? "" : isObject(option) ? option[prop ?? ""] : option;
