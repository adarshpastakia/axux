// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { GlobalProvider } from "@axux/core/dist/context/Globals";
import { Canvas, DocsContext, getDescriptionProps } from "@storybook/addon-docs";
import { withTests } from "@storybook/addon-jest";
import { addons } from "@storybook/addons";
import { addParameters, Story, StoryContext } from "@storybook/react";
import { create } from "@storybook/theming";
import { arSA as ar } from "date-fns/locale";
import i18next from "i18next";
import { useContext, useEffect, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import "../assets/styles/styles.css";
import i18n from "./i18n";
import results from "./jest-test-results.json";
import "./styles/preview.scss";

const brandTitle = "AxUx UI Framework";
const brandImage = "poster.png";
const reset = {
  fontBase: '"Montserrat", "Helvetica Neue", Arial, sans-serif',
  fontCode: '"Source Code Pro", mono',
  BASE_FONT_FAMILY: '"Source Code Pro", mono',
  brandTitle,
  brandImage
};

const lightColors = {
  primary: "#0984e3",
  secondary: "#e62e6b",
  info: "#0fbcf9",
  danger: "#c22626",
  success: "#218c74",
  warning: "#ffb142"
};
const darkColors = {
  primary: "#1e90ff",
  secondary: "#f7468a",
  info: "#25ccf7",
  danger: "#e03333",
  success: "#10ac84",
  warning: "#ffc048"
};
const lightTheme = create({
  base: "light",
  appBg: "#f5f6fa",
  barBg: "#fefefe",
  appContentBg: "#fafdfd",
  colorPrimary: lightColors.secondary,
  colorSecondary: lightColors.primary,
  ...reset
});
const darkTheme = create({
  base: "dark",
  appBg: "#272f36",
  barBg: "#2f3640",
  appContentBg: "#1e272e",
  colorPrimary: darkColors.secondary,
  colorSecondary: darkColors.primary,
  ...reset
});

export const parameters = {
  layout: "centered",
  actions: { argTypesRegex: "^on[A-Z].*" },
  backgrounds: { disable: true, grid: { disable: true } },
  docs: {
    components: {
      Title: (props: any) => (
        <div>
          <div className="ax-display--5 ax-color--primary" {...props} />
          <hr className="ax-margin--b" />
        </div>
      ),
      Heading: (props: any) => (
        <div>
          <div className="ax-heading--3 ax-color--secondary " {...props} />
          <hr className="ax-margin--b--sm" />
        </div>
      ),
      Subheading: (props: any) => <code className="ax-heading--5 " {...props} />,
      Description: (props: any) => {
        const context = useContext(DocsContext);
        return (
          <div className="ax-text ax-font--md ax-color--darkest ax-weight--light">
            {getDescriptionProps(props, context).markdown}
          </div>
        );
      },
      Canvas: ({ withToolbar, ...props }: any) => <Canvas {...props} withToolbar={true} />,
      PropRow: (props: any) => <span {...props} className="ax-color--teal" />
    }
  },
  themeToggle: {
    darkTheme,
    lightTheme
  }
};

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: "en",
    toolbar: {
      icon: "globe",
      active: false,
      items: [
        { value: "en", left: "🇺🇸", title: "English" },
        { value: "ar", left: "🇦🇪", title: "Arabic" }
      ]
    }
  }
};

const dateLocales: KeyValue = { ar };
const withI18nProvider = (StoryComp: Story, context: StoryContext) => {
  useEffect(() => {
    i18next.changeLanguage(context.globals.locale).then(() => {
      document.documentElement.dir = i18next.dir();
    });
  }, [context.globals.locale]);
  const dateLocale = useMemo(() => dateLocales[context.globals.locale], [context.globals.locale]);
  return (
    <div className="ax-root">
      <I18nextProvider i18n={i18n}>
        <GlobalProvider dateLocale={dateLocale}>
          <StoryComp {...context} />
        </GlobalProvider>
      </I18nextProvider>
    </div>
  );
};
export const decorators = [withI18nProvider, withTests({ results })];

const channel = addons.getChannel();
channel.on("THEME_TOGGLE", (theme: string) => {
  addParameters({
    docs: {
      theme: theme === "dark" ? darkTheme : lightTheme
    }
  });
  document.documentElement.classList.remove(`ax-light`);
  document.documentElement.classList.remove(`ax-dark`);
  document.documentElement.classList.add(`ax-${theme}`);
});

const originalError = console.error;
document.body.classList.add(`ax-root`);
window.console.error = (...args) => {
  if (/.*ReactDOM.render is no longer supported in React 18.*/.test(args[0])) {
    return;
  }
  originalError.call(console, ...args);
};
