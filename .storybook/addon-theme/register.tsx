/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { useGlobals, useParameter, useStorybookApi } from "@storybook/api";
import { IconButton } from "@storybook/components";
import { SunIcon, MoonIcon } from "@storybook/icons";
import { ThemeVars, themes } from "@storybook/theming";
import React, { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "storybook-theme";
const GLOBAL_KEY = "theme";
enum THEME {
  LIGHT = "light",
  DARK = "dark",
}

interface ThemeToggleParams {
  lightTheme: ThemeVars;
  darkTheme: ThemeVars;
}

export const ThemeToggle = () => {
  const api = useStorybookApi();
  const [globals, updateGlobals] = useGlobals();
  const { darkTheme = themes.dark, lightTheme = themes.light } = useParameter<
    Partial<ThemeToggleParams>
  >("themeToggle", {});
  const [theme, setTheme] = useState<THEME>(
    (localStorage.getItem(STORAGE_KEY) as THEME) ?? THEME.LIGHT,
  );

  // Function that will update the global value and trigger a UI refresh.
  const refreshAndUpdateGlobal = useCallback((key: THEME, theme: ThemeVars) => {
    api.setOptions({ theme });
    // Updates Storybook global value
    updateGlobals({
      [GLOBAL_KEY]: key,
    });
    api.getChannel()?.emit("THEME_CHANGED", key);
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === THEME.DARK ? THEME.LIGHT : THEME.DARK;
    localStorage.setItem(STORAGE_KEY, newTheme);
    setTheme(newTheme);
  }, [theme]);

  useEffect(() => {
    api.getChannel()?.emit("LOCALE_CHANGED", globals.locale);
  }, [globals.locale]);

  useEffect(() => {
    refreshAndUpdateGlobal(theme, {
      ...(theme === THEME.DARK ? darkTheme : lightTheme),
    });
  }, [theme, darkTheme, lightTheme, globals.primary, globals.accent]);

  return (
    <IconButton key="ThemeToggle" title="Toggle theme" onClick={toggleTheme}>
      {theme === THEME.DARK ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};
