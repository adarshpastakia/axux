/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { ChildrenProp, ElementProps } from "@axux/core/dist/types";
import { ReactElement } from "react";
import { InputProps } from "../types";

export interface BaseSelectProps<T> extends ElementProps, ChildrenProp {
  options: T[] | { label: string; items: T[] }[];

  allowCreate?: boolean;
  isEditable?: boolean;

  labelProperty?: string;
  valueProperty?: string;

  matcher?: (option: T, value: string) => boolean;
  renderer?: (option: T) => ReactElement;
  makeLabel?: (option: T) => string;

  onQuery?: (text: string) => T[];
  onCreateOption?: (text: string) => void;
}

export interface SelectProps<T> extends BaseSelectProps<T>, InputProps {
  onSelect?: (option: T) => void;
}
export interface TagProps<T> extends BaseSelectProps<T>, InputProps<string[]> {
  onSelect?: (option: T[]) => void;
}

export const CreatePlaceholder = "~create_option~";

/******************* default option matcher *******************/
export const defaultMatcher = (
  option: AnyObject,
  value?: string,
  prop?: string
) =>
  (Object.hasOwn((option ?? "") as AnyObject, prop ?? "")
    ? option[prop as AnyObject]
    : option) === value;

/******************* get option value *******************/
export const getValue = (option: AnyObject, prop?: string) =>
  !option ? "" : option[prop ?? ""] ?? option;

/******************* get option label *******************/
export const getLabel = (option: AnyObject, prop?: string) =>
  !option ? "" : option[prop ?? ""] ?? option;
