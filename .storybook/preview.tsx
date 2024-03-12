/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxApplicationProvider } from "@axux/core/src";
import "@mdi/font/css/materialdesignicons.min.css";
import { Anchor } from "@storybook/addon-docs";
import { withTests } from "@storybook/addon-jest";
import {
  Controls,
  Description,
  DocsContainer,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/blocks";
import { addons, useGlobals } from "@storybook/preview-api";
import { Preview } from "@storybook/react";
import { create } from "@storybook/theming";
import { Fragment } from "react";
import { I18nextProvider } from "react-i18next";
import { default as i18n } from "./i18n";
import results from "./jest-test-results.json";
import "./styles/styles.css";

const brandTitle = "AxUx UI Framework";
const reset = {
  fontBase: 'Montserrat, "Helvetica Neue", Arial, sans-serif',
  fontCode: "Consolas, Monaco, monospace",
  brandTitle,
};

const lightTheme = create({
  base: "light",
  appBg: "#f5f6fa",
  barBg: "#fefefe",
  appContentBg: "#fafdfd",
  brandImage: "poster-light.png",
  colorPrimary: "#be185d",
  colorSecondary: "#0074e3",
  ...reset,
});
const darkTheme = create({
  base: "dark",
  appBg: "#272f36",
  barBg: "#2f3640",
  appContentBg: "#1e272e",
  brandImage: "poster-dark.png",
  colorPrimary: "#f472b6",
  colorSecondary: "#3490de",
  ...reset,
});

document.documentElement.dir = i18n.dir();

export default {
  parameters: {
    layout: "centered",
    actions: { argTypesRegex: "^on(?!Label).*" },
    backgrounds: { disable: true, grid: { disable: true } },
    controls: {
      matchers: {
        date: /^date$/,
      },
    },
    themeToggle: {
      darkTheme,
      lightTheme,
    },
    docs: {
      toc: {},
      controls: { exclude: /^on.*/, sort: "alpha" },
      container: ({ children, context }: any) => {
        const globals = context.store.globals.get();
        return (
          <DocsContainer
            context={context}
            theme={globals.theme === "dark" ? darkTheme : lightTheme}
          >
            {children}
          </DocsContainer>
        );
      },
      page: () => {
        return (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <div>
              <div>Controls</div>
              <Controls />
            </div>
            <hr />
            <Stories includePrimary={false} />
          </>
        );
      },
      components: {
        h1: ({ storyId, ...props }: any) => (
          <Fragment>
            {storyId && <Anchor storyId={storyId} />}
            <div className="sbdocs-title" {...props} />
            <hr />
          </Fragment>
        ),
        h2: ({ storyId, ...props }: any) => (
          <Fragment>
            {storyId && <Anchor storyId={storyId} />}
            <cite className="toc-selector" {...props} />
          </Fragment>
        ),
        h3: (props: any) => <code {...props} />,
      },
    },
  },
  globalTypes: {
    locale: {
      name: "Locale",
      description: "Internationalization locale",
      defaultValue: "en",
      toolbar: {
        icon: "globe",
        active: true,
        items: [
          { value: "en", left: "🇺🇸", title: "English" },
          { value: "ar", left: "🇦🇪", title: "Arabic" },
        ],
      },
    },
    primary: {
      name: "Primary",
      description: "Primary theme",
      defaultValue: "blue",
      toolbar: {
        className: "primary-theme",
        icon: "circle",
        active: true,
        items: [
          { value: "blue", left: "🔵", title: "Blue" },
          { value: "green", left: "🟢", title: "Green" },
          { value: "orange", left: "🟠", title: "Orange" },
          { value: "red", left: "🔴", title: "Red" },
          { value: "purple", left: "🟣", title: "Purple" },
          { value: "pink", left: "⚪️", title: "Pink" },
          { value: "brown", left: "🟤", title: "Brown" },
        ],
      },
    },
    accent: {
      name: "Accent",
      description: "Accent theme",
      defaultValue: "pink",
      toolbar: {
        icon: "circle",
        active: true,
        items: [
          { value: "blue", left: "🔵", title: "Blue" },
          { value: "green", left: "🟢", title: "Green" },
          { value: "orange", left: "🟠", title: "Orange" },
          { value: "red", left: "🔴", title: "Red" },
          { value: "purple", left: "🟣", title: "Purple" },
          { value: "pink", left: "⚪️", title: "Pink" },
          { value: "brown", left: "🟤", title: "Brown" },
        ],
      },
    },
  },
  decorators: [
    (Story) => {
      const [globals] = useGlobals();
      return (
        <I18nextProvider i18n={i18n}>
          <AxApplicationProvider
            defaultMode={globals.theme}
            defaultTheme={globals.primary}
            defaultAccent={globals.accent}
            defaultLocale={globals.locale}
          >
            {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
            <Story />
          </AxApplicationProvider>
        </I18nextProvider>
      );
    },
    withTests({ results }),
  ],
} as Preview;

addons.getChannel().on("LOCALE_CHANGED", (locale: any) => {
  i18n.changeLanguage(locale).then(() => {
    document.documentElement.dir = i18n.dir();
  });
});
addons.getChannel().on("THEME_CHANGED", (theme: any) => {
  document.documentElement.dataset.colorScheme = theme;
  // (document.getElementById("arcgisCss") as HTMLLinkElement).href =
  //   `@arcgis/esri/themes/${theme}/main.css`;
});
addons.getChannel().on("PRIMARY_CHANGED", (theme: any) => {
  document.documentElement.dataset.primaryScheme = theme;
});
addons.getChannel().on("ACCENT_CHANGED", (theme: any) => {
  document.documentElement.dataset.accentScheme = theme;
});

const originalError = console.error;
window.console.error = (...args) => {
  if (
    /.*ReactDOM.render is no longer supported in React 18.*/.test(args[0]) ||
    /.*\:first-child.*/.test(args[0])
  ) {
    return;
  }
  originalError.call(console, ...args);
};
