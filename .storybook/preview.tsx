/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { useTooltipWatcher } from "@axux/core/src/hooks/useTooltip";
import "@mdi/font/css/materialdesignicons.min.css";
import {
  Anchor,
  Canvas,
  DocsContainer,
  DocsContext,
  getDescriptionProps,
} from "@storybook/addon-docs";
import { withTests } from "@storybook/addon-jest";
import { addons } from "@storybook/addons";
import { addParameters } from "@storybook/react";
import { create } from "@storybook/theming";
import { Fragment, useContext, useEffect } from "react";
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

const DC = DocsContainer as any;

addParameters({
  layout: "centered",
  actions: { argTypesRegex: "^on.*" },
  backgrounds: { disable: true, grid: { disable: true } },
  docs: {
    container: ({ children, context }: any) => {
      return (
        <I18nextProvider i18n={i18n}>
          <DC context={context}>{children}</DC>
        </I18nextProvider>
      );
    },
    components: {
      Title: ({ storyId, ...props }: any) => (
        <Fragment>
          {storyId && <Anchor storyId={storyId} />}
          <div
            className="text-primary-700 dark:text-primary-300 text-4xl"
            {...props}
          />
          <hr className="mb-4 mt-2" />
        </Fragment>
      ),
      Heading: ({ storyId, ...props }: any) => (
        <Fragment>
          {storyId && <Anchor storyId={storyId} />}
          <div
            className="text-accent-700 dark:text-accent-300 text-xl"
            {...props}
          />
        </Fragment>
      ),
      Subheading: (props: any) => <code className="text-lg" {...props} />,
      Description: (props: any) => {
        const context = useContext(DocsContext);
        return (
          <div className="text-lg mt-2">
            {getDescriptionProps(props, context).markdown}
          </div>
        );
      },
      Canvas: ({ withToolbar, ...props }: any) => {
        return <Canvas {...props} withToolbar={true} />;
      },
      PropRow: (props: any) => <span {...props} className="text-teal-500" />,
    },
  },
  themeToggle: {
    darkTheme,
    lightTheme,
  },
});

export const globalTypes = {
  theme: {},
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
};
export const decorators = [withTests({ results })];

const channel = addons.getChannel();
document.documentElement.dir = i18n.dir();
channel.on("LOCALE_CHANGE", (locale = "en") => {
  i18n.changeLanguage(locale).then(() => {
    document.documentElement.dir = i18n.dir();
  });
});
channel.on("THEME_TOGGLE", (theme: string) => {
  addParameters({
    docs: {
      theme: theme === "dark" ? darkTheme : lightTheme,
    },
  });
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(`${theme}`);
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
