/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { DarkThemeBase } from "./darkBase";
import { LightThemeBase } from "./lightBase";
import { ChartPalette } from "./palettes";

export * from "./palettes";

const makePaletteSequence = (colors: string[]) => {
  return [...colors, ...[...colors.slice(1, -1)].reverse()];
};

export const registerThemes = (echarts: AnyObject) => {
  echarts.registerTheme("default", {
    ...LightThemeBase,
    color: ChartPalette.Default,
  });
  echarts.registerTheme("default_dark", {
    ...DarkThemeBase,
    color: ChartPalette.Default,
  });

  echarts.registerTheme("activity", {
    ...LightThemeBase,
    color: ChartPalette.Activity,
  });
  echarts.registerTheme("activity_dark", {
    ...DarkThemeBase,
    color: ChartPalette.Activity,
  });

  echarts.registerTheme("qualitative", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Qualitative),
  });
  echarts.registerTheme("qualitative_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Qualitative),
  });

  echarts.registerTheme("diverging", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Diverging),
  });
  echarts.registerTheme("diverging_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Diverging),
  });

  echarts.registerTheme("sequential", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Sequential),
  });
  echarts.registerTheme("sequential_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Sequential),
  });

  echarts.registerTheme("spectral", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Spectral),
  });
  echarts.registerTheme("spectral_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Spectral),
  });

  echarts.registerTheme("uber", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.UberPool),
  });
  echarts.registerTheme("uber_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.UberPool),
  });

  echarts.registerTheme("fireice", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.FireIce),
  });
  echarts.registerTheme("fireice_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.FireIce),
  });

  echarts.registerTheme("warming", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.GlobalWarming),
  });
  echarts.registerTheme("warming_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.GlobalWarming),
  });

  echarts.registerTheme("sunrise", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Sunrise),
  });
  echarts.registerTheme("sunrise_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Sunrise),
  });

  echarts.registerTheme("ocean", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Ocean),
  });
  echarts.registerTheme("ocean_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Ocean),
  });

  echarts.registerTheme("wine", {
    ...LightThemeBase,
    color: makePaletteSequence(ChartPalette.Wine),
  });
  echarts.registerTheme("wine_dark", {
    ...DarkThemeBase,
    color: makePaletteSequence(ChartPalette.Wine),
  });
};
