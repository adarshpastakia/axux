/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import { AxApplicationProvider, AxText } from "@axux/core/src";
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
  colorPrimary: "#10ac84",
  colorSecondary: "#2e86de",
  ...reset,
});
const darkTheme = create({
  base: "dark",
  appBg: "#272f36",
  barBg: "#2f3640",
  appContentBg: "#1e272e",
  brandImage: "poster-dark.png",
  colorPrimary: "#10ac84",
  colorSecondary: "#2e86de",
  ...reset,
});

document.documentElement.dir = i18n.dir();

export default {
  parameters: {
    layout: "centered",
    backgrounds: { disable: true, grid: { disable: true } },
    controls: {
      exclude: /^(on.*)/,
      sort: "requiredFirst",
      matchers: {
        date: /^date$/,
        text: /^className$/,
      },
    },
    viewport: {
      viewports: {
        mobile1: {
          name: "Small mobile",
          styles: { height: "568px", width: "320px" },
          type: "mobile",
        },
        mobile2: {
          name: "Large mobile",
          styles: { height: "896px", width: "414px" },
          type: "mobile",
        },
        tablet: {
          name: "Tablet",
          styles: { height: "1112px", width: "834px" },
          type: "tablet",
        },
      },
      // defaultViewport: "responsive",
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
          <AxApplicationProvider
            {...{ forceTheme: globals.theme, forceLocale: globals.locale }}
          >
            <DocsContainer
              context={context}
              theme={globals.theme === "dark" ? darkTheme : lightTheme}
            >
              {children}
            </DocsContainer>
          </AxApplicationProvider>
        );
      },
      page: () => {
        return (
          <>
            <Title />
            <Subtitle />
            <Description />
            <Primary />
            <Controls />
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
  },
  decorators: [
    (Story) => {
      const [globals] = useGlobals();
      return (
        <I18nextProvider i18n={i18n}>
          <AxApplicationProvider
            {...{ forceTheme: globals.theme, forceLocale: globals.locale }}
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
