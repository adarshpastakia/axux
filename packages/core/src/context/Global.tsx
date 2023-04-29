/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import i18next from "i18next";
import {
  type ComponentType,
  createContext,
  type FC,
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { type ChildrenProp } from "../types";
import {
  NotificationContainer,
  type NotificationRef,
} from "./NotificationContainer";
import { OverlayContainer, type OverlayRef } from "./OverlayContainer";

interface State {
  theme: "light" | "dark";
  locale: string;
  calendar: "gregorian" | "hijri";
}

export interface GlobalProps extends ChildrenProp {
  /**
   * template for react-helmet
   */
  titleTemplate?: string;
  /**
   * default title for react-helmet
   */
  defaultTitle?: string;
  /**
   * meta description for react-helmet
   */
  description?: string;
  /**
   * application default error display
   */
  errorElement?: ComponentType<{ error?: string }>;

  defaultLocale?: string;
  defaultTheme?: State["theme"];
  defaultCalendar?: State["calendar"];
}

interface GlobalContextType {
  /**
   * toggle theme between light and dark
   * or force to theme provided
   * @param theme
   */
  toggleTheme: (theme?: State["theme"]) => void;
  /**
   * change language locale
   * @param locale
   */
  changeLocale: (locale: string) => void;
  /**
   * change date calendat
   * @param locale
   */
  changeCalendar: (calendar: State["calendar"]) => void;
  /**
   * application default error display
   */
  errorElement: GlobalProps["errorElement"];

  /**
   * close all open overlays
   */
  closeOverlays: () => void;

  currentTheme: State["theme"];
  currentLocale: string;
  currentCalendar: State["calendar"];

  overlayRef: RefObject<OverlayRef>;
  notificationRef: RefObject<NotificationRef>;
}

const KEY_THEME = "ax:theme";
const KEY_LOCALE = "ax:locale";
const KEY_CALENDAR = "ax:calendar";
const systemTheme = () => {
  const theme: AnyObject =
    localStorage.getItem(KEY_THEME) ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  return theme;
};
const systemLocale = () => {
  return localStorage.getItem(KEY_LOCALE) ?? "en";
};
const systemCalendar = () => {
  return (localStorage.getItem(KEY_CALENDAR) as AnyObject) ?? "gregorian";
};

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType
);

/**
 * global context provider
 */
export const AxApplicationProvider: FC<GlobalProps> = ({
  children,
  description,
  titleTemplate,
  defaultTitle,
  errorElement,
  defaultLocale,
  defaultTheme,
  defaultCalendar,
}) => {
  const overlayRef = useRef<OverlayRef>(null);
  const notificationRef = useRef<NotificationRef>(null);
  const [theme, setTheme] = useState<State["theme"]>(
    defaultTheme ?? systemTheme()
  );
  const [calendar, setCalendar] = useState<State["calendar"]>(
    defaultCalendar ?? systemCalendar()
  );
  const [locale, setLocale] = useState<State["locale"]>(
    defaultLocale ?? systemLocale()
  );

  /** ***************** set initial theme and locale dir  *******************/
  useEffect(() => {
    document.documentElement.lang = locale;
    if (
      !document.documentElement.classList.contains("dark") &&
      !document.documentElement.classList.contains("light")
    ) {
      document.documentElement.classList.add(`${theme}`);
    } else {
      setTheme(
        document.documentElement.classList.contains("light") ? "light" : "dark"
      );
    }
    void i18next.changeLanguage(locale).then(() => {
      document.documentElement.dir = i18next.dir();
    });
  }, []);

  /** ***************** theme toggle *******************/
  const toggleTheme = useCallback(
    (forceTheme?: State["theme"]) => {
      const newTheme = forceTheme ?? (theme === "dark" ? "light" : "dark");
      setTheme(newTheme);
      localStorage.setItem(KEY_THEME, newTheme);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(newTheme);
    },
    [theme]
  );

  /** ***************** change locale *******************/
  const changeLocale = useCallback((locale: string) => {
    void i18next.changeLanguage(locale).then(() => {
      localStorage.setItem(KEY_LOCALE, locale);
      document.documentElement.lang = locale;
      document.documentElement.dir = i18next.dir();
      setLocale(locale);
    });
  }, []);

  /** ***************** change calendar *******************/
  const changeCalendar = useCallback((calendar: State["calendar"]) => {
    setCalendar(calendar);
    localStorage.setItem(KEY_CALENDAR, calendar);
  }, []);

  const closeOverlays = useCallback(() => {
    notificationRef.current?.closeAll();
    overlayRef.current?.closeAll();
  }, []);

  /** ***************** context provider *******************/
  return (
    <GlobalContext.Provider
      value={{
        closeOverlays,
        toggleTheme,
        changeLocale,
        changeCalendar,
        errorElement,
        currentTheme: theme,
        currentCalendar: calendar,
        currentLocale: locale,
        notificationRef,
        overlayRef,
      }}
    >
      <HelmetProvider>
        <Helmet titleTemplate={titleTemplate} defaultTitle={defaultTitle}>
          <meta name="description" content={description} />
        </Helmet>
        {children}

        <OverlayContainer itemRef={overlayRef} />
        <NotificationContainer itemRef={notificationRef} />
      </HelmetProvider>
    </GlobalContext.Provider>
  );
};

/**
 * internal usage only
 * @internal
 */
export const useGlobals = () => useContext(GlobalContext);

/**
 * global application context
 */
export const useApplicationContext = () => {
  const {
    errorElement: _1,
    notificationRef: _2,
    overlayRef: _3,
    ...rest
  } = useContext(GlobalContext);
  return rest;
};
