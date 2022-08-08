/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isTrue } from "@axux/utilities";
import { useEffect, useState } from "react";

const getValue = (value: string = "") => {
  if (value === "true" || value === "false") {
    return isTrue(value);
  }
  if (!isNaN(parseFloat(value))) {
    return parseFloat(value);
  }
  return value;
};

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(
      JSON.parse(
        getValue(
          localStorage.getItem(key) ?? JSON.stringify(defaultValue)
        ) as AnyObject
      )
    );
  }, [key, defaultValue]);

  const changeValue = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, changeValue];
};

export const useSessionStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(
      JSON.parse(
        getValue(
          sessionStorage.getItem(key) ?? JSON.stringify(defaultValue)
        ) as AnyObject
      )
    );
  }, [key, defaultValue]);

  const changeValue = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, changeValue];
};
