/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useEffect, useState } from "react";

export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    setValue(
      JSON.parse(localStorage.getItem(key) as AnyObject) ?? defaultValue,
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
  defaultValue: T,
): [T, (value: T) => void] => {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    setValue(
      JSON.parse(sessionStorage.getItem(key) as AnyObject) ?? defaultValue,
    );
  }, [key, defaultValue]);

  const changeValue = (value: T) => {
    sessionStorage.setItem(key, JSON.stringify(value));
    setValue(value);
  };

  return [value, changeValue];
};
