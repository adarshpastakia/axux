/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxApplicationProvider, AxCollapsable } from "@axux/core";
import "@mdi/font/css/materialdesignicons.min.css";
import { Anchor, DocsContainer } from "@storybook/addon-docs";
import { withTests } from "@storybook/addon-jest";
import {
  Controls,
  Description,
  Primary,
  Stories,
  Subtitle,
  Title,
} from "@storybook/blocks";
import { addons } from "@storybook/preview-api";
import { Preview } from "@storybook/react";
import { create, ensure } from "@storybook/theming";
import { Fragment } from "react";
import { I18nextProvider } from "react-i18next";
import colors from "tailwindcss/colors";
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
  colorPrimary: colors.pink["700"],
  colorSecondary: "#0074e3",
  ...reset,
});
const darkTheme = create({
  base: "dark",
  appBg: "#272f36",
  barBg: "#2f3640",
  appContentBg: "#1e272e",
  brandImage: "poster-dark.png",
  colorPrimary: colors.pink["300"],
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
      theme: ensure(darkTheme),
      toc: {},
      controls: { exclude: /^on.*/, sort: "alpha" },
      container: ({ children, context }: any) => {
        return (
          <I18nextProvider i18n={i18n}>
            <AxApplicationProvider defaultTheme="light">
              <DocsContainer context={context}>{children}</DocsContainer>
            </AxApplicationProvider>
          </I18nextProvider>
        );
      },
      page: () => {
        return (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <AxCollapsable>
              <div>Controls</div>
              <Controls />
            </AxCollapsable>
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
            <hr className="mb-4 mt-2" />
          </Fragment>
        ),
        h2: ({ storyId, ...props }: any) => (
          <Fragment>
            {storyId && <Anchor storyId={storyId} />}
            <cite
              className="toc-selector text-accent-700 dark:text-accent-300 !text-xl"
              {...props}
            />
          </Fragment>
        ),
        h3: (props: any) => <code className="text-lg" {...props} />,
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
  },
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <AxApplicationProvider>
          {/* 👇 Decorators in Storybook also accept a function. Replace <Story/> with Story() to enable it  */}
          <Story />
        </AxApplicationProvider>
      </I18nextProvider>
    ),
    withTests({ results }),
  ],
} as Preview;

addons.getChannel().on("LOCALE_CHANGED", (locale: any) => {
  i18n.changeLanguage(locale).then(() => {
    document.documentElement.dir = i18n.dir();
  });
});
addons.getChannel().on("THEME_CHANGED", (theme: any) => {
  setTimeout(() => {
    document.documentElement.classList.remove("dark", "light");
    document.querySelectorAll("#storybook-root, .docs-story")?.forEach((el) => {
      el.classList.remove("light", "dark");
      el.classList.add(`${theme}`);
    });
  }, 100);
  (
    document.getElementById("arcgisCss") as HTMLLinkElement
  ).href = `@arcgis/esri/themes/${theme}/main.css`;
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
