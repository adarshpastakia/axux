/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton, AxMenu } from "@axux/core";
import { ChartPalette } from "../theme";
import { Icons } from "../types/icons";

const PaletteMap = ({ colors = [], label = "" }: KeyValue) => (
  <div className="flex items-center">
    {colors.slice(0, 8).map((c: string) => (
      <div
        key={c}
        className="inline-block rounded-full ring-1 ring-bw-500/20 w-3 h-3 mx-px"
        style={{ backgroundColor: c }}
      />
    ))}
    <div className="text-xs text-muted px-2">{label}</div>
  </div>
);

export const PaletteSelect = ({
  onClick,
  theme = "default",
  defaultTheme = "default",
}: KeyValue) => {
  return (
    <AxButton.Dropdown
      onClick={onClick}
      icon={Icons.iconPalette}
      size="sm"
      variant="link"
      showCaret={false}
      className="flush"
      usePortal
    >
      <AxMenu.Item
        id={defaultTheme}
        icon={theme === defaultTheme ? "◉" : "◯"}
        label={<PaletteMap label="Default" colors={ChartPalette.Default} />}
      />
      <AxMenu.Item
        id="qualitative"
        icon={theme === "qualitative" ? "◉" : "◯"}
        label={
          <PaletteMap label="Qualitative" colors={ChartPalette.Qualitative} />
        }
      />
      <AxMenu.Item
        id="diverging"
        icon={theme === "diverging" ? "◉" : "◯"}
        label={<PaletteMap label="Diverging" colors={ChartPalette.Diverging} />}
      />
      <AxMenu.Item
        id="sequential"
        icon={theme === "sequential" ? "◉" : "◯"}
        label={
          <PaletteMap label="Sequential" colors={ChartPalette.Sequential} />
        }
      />
      <AxMenu.Item
        id="spectral"
        icon={theme === "spectral" ? "◉" : "◯"}
        label={<PaletteMap label="Spectral" colors={ChartPalette.Spectral} />}
      />
      <AxMenu.Item
        id="uber"
        icon={theme === "uber" ? "◉" : "◯"}
        label={<PaletteMap label="Uber Pool" colors={ChartPalette.UberPool} />}
      />
      <AxMenu.Item
        id="fireice"
        icon={theme === "fireice" ? "◉" : "◯"}
        label={<PaletteMap label="Fire Ice" colors={ChartPalette.FireIce} />}
      />
      <AxMenu.Item
        id="warming"
        icon={theme === "warming" ? "◉" : "◯"}
        label={
          <PaletteMap
            label="Global Warming"
            colors={ChartPalette.GlobalWarming}
          />
        }
      />
      <AxMenu.Item
        id="sunrise"
        icon={theme === "sunrise" ? "◉" : "◯"}
        label={<PaletteMap label="Sunrise" colors={ChartPalette.Sunrise} />}
      />
      <AxMenu.Item
        id="ocean"
        icon={theme === "ocean" ? "◉" : "◯"}
        label={<PaletteMap label="Ocean" colors={ChartPalette.Ocean} />}
      />
      <AxMenu.Item
        id="wine"
        icon={theme === "wine" ? "◉" : "◯"}
        label={<PaletteMap label="Wine" colors={ChartPalette.Wine} />}
      />
    </AxButton.Dropdown>
  );
};
