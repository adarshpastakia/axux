/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T
): [T, (value: T) => void] => {
  const [value, setValue] = useState(defaultValue);

  useEffect(() => {
    setValue(
      JSON.parse(localStorage.getItem(key) as AnyObject) ?? defaultValue
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
      JSON.parse(sessionStorage.getItem(key) as AnyObject) ?? defaultValue
    );
  }, [key, defaultValue]);

  const changeValue = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, changeValue];
};
