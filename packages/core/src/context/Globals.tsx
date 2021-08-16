// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import i18next from "i18next";
import React, {
  ComponentType,
  createContext,
  FC,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState
} from "react";
import { Helmet } from "react-helmet";
import { I18nextProvider, useTranslation } from "react-i18next";
import { BooleanCallback } from "../types";
import { BreadcrumbProvider } from "./BreadcrumbService";

/** @internal */
export interface GlobalProps {
  /**
   * Application locales
   */
  locales: string[];
  /**
   * Date-fns locale object
   */
  dateLocale?: KeyValue;
  /**
   * Application default error
   */
  errorElement: ComponentType<{ error?: string }>;

  /**
   * Template for react-helmet
   */
  titleTemplate?: string;
  /**
   * Default title for react-helmet
   */
  defaultTitle?: string;
  /**
   * Meta description for react-helmet
   */
  description?: string;

  /**
   * Breadcrumb theme
   */
  breadcrumbTheme?: "classic" | "modern";
}

interface GlobalMethods {
  /**
   * Toggle theme between light and dark
   */
  toggleTheme: () => void;
  /**
   * Change language locale
   * @param locale
   */
  changeLocale: (locale: string) => void;
  /**
   * Open spotlight search
   */
  openSpotlight: () => void;
}

interface State {
  theme: "light" | "dark";
  locale: string;
}

const DefaultMessage: FC<{ error?: string }> = ({ error }) => {
  const { t } = useTranslation("core");
  return (
    <Fragment>
      <h4>{t("error.title")}</h4>
      <p>{error}</p>
    </Fragment>
  );
};

const KEY_THEME = "ax:theme";
const KEY_LOCALE = "ax:locale";
const defaultTheme = () => {
  const theme: AnyObject =
    localStorage.getItem(KEY_THEME) ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  return theme;
};
const defaultLocale = () => {
  return localStorage.getItem(KEY_LOCALE) ?? "en";
};

/** @internal */
export const Globals = createContext<
  GlobalProps & GlobalMethods & { showSpotlight?: boolean; setShowSpotlight: BooleanCallback }
>({} as AnyObject);

/** @internal */
export const GlobalProvider: FC<Partial<GlobalProps>> = ({
  children,
  locales = ["en", "ar"],
  dateLocale,
  breadcrumbTheme = "classic",
  errorElement = DefaultMessage,
  titleTemplate = "%s",
  defaultTitle,
  description
}) => {
  const theme = useRef<State["theme"]>(defaultTheme());
  const locale = useRef<State["locale"]>(defaultLocale());

  useEffect(() => {
    document.documentElement.lang = locale.current;
    if (
      !document.documentElement.classList.contains("ax-dark") &&
      !document.documentElement.classList.contains("ax-light")
    ) {
      document.documentElement.classList.add(`ax-${theme.current}`);
    } else {
      theme.current = document.documentElement.classList.contains("ax-light") ? "light" : "dark";
    }
    i18next.changeLanguage(locale.current).then(() => {
      document.documentElement.dir = i18next.dir();
    });
  }, []);

  const toggleTheme = useCallback(() => {
    theme.current = theme.current === "dark" ? "light" : "dark";
    localStorage.setItem(KEY_THEME, theme.current);
    document.documentElement.classList.remove("ax-light", "ax-dark");
    document.documentElement.classList.add(`ax-${theme.current}`);
  }, [theme]);
  const changeLocale = useCallback((locale: string) => {
    i18next.changeLanguage(locale).then(() => {
      localStorage.setItem(KEY_LOCALE, locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = i18next.dir();
    });
  }, []);

  const [showSpotlight, setShowSpotlight] = useState(false);
  const openSpotlight = useCallback(() => setShowSpotlight(true), []);

  return (
    <Globals.Provider
      value={{
        locales,
        dateLocale,
        errorElement,
        breadcrumbTheme,
        toggleTheme,
        changeLocale,
        showSpotlight,
        openSpotlight,
        setShowSpotlight
      }}
    >
      <BreadcrumbProvider>
        <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
          <meta name="description" content={description} />
        </Helmet>
        <I18nextProvider i18n={i18next}>{children}</I18nextProvider>
      </BreadcrumbProvider>
    </Globals.Provider>
  );
};
GlobalProvider.displayName = "AxGlobals";

/**
 * Global context
 */
export const useAxGlobals = () =>
  useContext<GlobalMethods & GlobalProps["dateLocale"]>(Globals as AnyObject);
