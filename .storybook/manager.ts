/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { addons, types } from "@storybook/addons";
import { ThemeToggle } from "./addon-theme/register";

addons.setConfig({
  sidebar: {
    showRoots: true,
  },
});

addons.getChannel().on("PRIMARY_CHANGED", (theme: any) => {
  document.documentElement.dataset.primaryScheme = theme;
});
addons.getChannel().on("ACCENT_CHANGED", (theme: any) => {
  document.documentElement.dataset.accentScheme = theme;
});

// Register the addon
addons.register("themeToggle", () => {
  // Register the tool
  addons.add("themeToggle", {
    type: types.TOOL,
    title: "Theme toggle",
    match: ({ viewMode }) => viewMode === "story" || viewMode === "docs",
    render: ThemeToggle,
  });
});
