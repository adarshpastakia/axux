/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { addons, types } from "@storybook/addons";
import { API, useGlobals, useParameter } from "@storybook/api";
import { IconButton } from "@storybook/components";
import { ThemeVars, ensure, themes } from "@storybook/theming";
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

const ThemeToggle = ({ api }: { api: API }) => {
  const [globals, updateGlobals] = useGlobals();
  const { darkTheme = themes.dark, lightTheme = themes.light } = useParameter<
    Partial<ThemeToggleParams>
  >("themeToggle", {});
  const [theme, setTheme] = useState<THEME>(
    (localStorage.getItem(STORAGE_KEY) as THEME) ?? THEME.LIGHT
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
    refreshAndUpdateGlobal(
      theme,
      theme === THEME.DARK ? darkTheme : lightTheme
    );
  }, [theme, darkTheme, lightTheme]);

  return (
    <IconButton
      key="ThemeToggle"
      title="Toggle theme"
      active={theme === THEME.DARK}
      onClick={toggleTheme}
    >
      <svg viewBox="0 0 32 32">
        <path
          fill="currentColor"
          d="M10.895 7.574c0 7.55 5.179 13.67 11.567 13.67 1.588 0 3.101-0.38 4.479-1.063-1.695 4.46-5.996 7.636-11.051 7.636-6.533 0-11.83-5.297-11.83-11.83 0-4.82 2.888-8.959 7.023-10.803-0.116 0.778-0.188 1.573-0.188 2.39z"
        />
      </svg>
    </IconButton>
  );
};

addons.register("storybook/theme-toggle", (api) => {
  addons.add("storybook/theme-toggle/button", {
    title: "Theme toggle",
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: () => <ThemeToggle api={api} />,
  });
});
