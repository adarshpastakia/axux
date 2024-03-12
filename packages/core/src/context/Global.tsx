/**
 * AxUX React UI Framework with Pure CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */

import i18next from "i18next";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ComponentType,
  type FC,
  type PropsWithChildren,
  type RefObject,
} from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocalStorage } from "../hooks/useStorage";
import { TooltipWatcher } from "../hooks/useTooltip";
import {
  NotificationContainer,
  type NotificationRef,
} from "./NotificationContainer";
import { OverlayContainer, type OverlayRef } from "./OverlayContainer";

type CALENDARS = "gregorian" | "hijri";
type COLORS =
  | "blue"
  | "green"
  | "red"
  | "orange"
  | "purple"
  | "pink"
  | "violet"
  | "brown";
type MODES = "light" | "dark";

interface State {
  mode: MODES;
  theme: COLORS;
  accent: COLORS;
  locale: string;
  calendar: CALENDARS;
}

export interface GlobalProps extends PropsWithChildren {
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

  /**
   * default color scheme
   * @param "light" | "dark"
   */
  defaultMode?: State["mode"];
  /**
   * default i18n locale
   * @param "en" | "ar"
   */
  defaultLocale?: string;
  /**
   * default calendar type
   * @param "gregorian" | "hijri"
   */
  defaultCalendar?: State["calendar"];

  /**
   * default primary theme color
   */
  defaultTheme?: State["theme"];
  /**
   * default accent theme color
   */
  defaultAccent?: State["accent"];
}

interface GlobalContextType {
  /**
   * toggle theme between light and dark
   * or force to theme provided
   * @param theme
   */
  toggleMode: (theme?: State["mode"]) => void;
  /**
   * change language locale
   * @param locale
   */
  changeLocale: (locale: string) => void;
  /**
   * change date calendar
   * @param calendar
   */
  changeCalendar: (calendar: State["calendar"]) => void;
  /**
   * change primary theme color
   * @param color
   */
  changeTheme: (color: State["theme"]) => void;
  /**
   * change accent theme color
   * @param color
   */
  changeAccent: (color: State["accent"]) => void;
  /**
   * application default error display
   */
  errorElement: GlobalProps["errorElement"];

  /**
   * close all open overlays
   */
  closeOverlays: (closeNotifs?: true) => void;

  /**
   * current color scheme
   */
  currentMode: State["mode"];
  /**
   * current primary theme color
   */
  currentTheme: State["theme"];
  /**
   * current accent theme color
   */
  currentAccent: State["accent"];
  /**
   * current i18n locale
   */
  currentLocale: string;
  /**
   * current date calendar type
   */
  currentCalendar: State["calendar"];

  overlayRef: RefObject<OverlayRef>;
  notificationRef: RefObject<NotificationRef>;
}

const KEY_MODE = "ax::mode";
const KEY_THEME = "ax::theme";
const KEY_ACCENT = "ax::accent";
const KEY_LOCALE = "ax::locale";
const KEY_CALENDAR = "ax::calendar";
const SYSTEM_MODE = window.matchMedia("(prefers-color-scheme: dark)").matches
  ? "dark"
  : "light";

export const GlobalContext = createContext<GlobalContextType>(
  {} as GlobalContextType,
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
  defaultMode,
  defaultLocale = "en",
  defaultTheme = "blue",
  defaultAccent = "pink",
  defaultCalendar = "gregorian",
}) => {
  const overlayRef = useRef<OverlayRef>(null);
  const notificationRef = useRef<NotificationRef>(null);
  const [mode, setMode] = useLocalStorage<State["mode"]>(
    KEY_MODE,
    defaultMode ?? SYSTEM_MODE,
  );
  const [theme, setTheme] = useLocalStorage<State["theme"]>(
    KEY_THEME,
    defaultTheme,
  );
  const [accent, setAccent] = useLocalStorage<State["accent"]>(
    KEY_ACCENT,
    defaultAccent,
  );
  const [calendar, setCalendar] = useLocalStorage<State["calendar"]>(
    KEY_CALENDAR,
    defaultCalendar,
  );
  const [locale, setLocale] = useLocalStorage<State["locale"]>(
    KEY_LOCALE,
    defaultLocale,
  );

  /** ***************** set initial theme and locale dir  *******************/
  useEffect(() => {
    document.documentElement.lang = locale;
    if (document.documentElement.dataset.colorScheme == null) {
      document.documentElement.dataset.colorScheme = mode;
    } else {
      setMode(
        document.documentElement.dataset.colorScheme === "dark"
          ? "dark"
          : "light",
      );
    }
    void i18next.changeLanguage(locale).then(() => {
      document.documentElement.dir = i18next.dir();
    });
  }, []);

  /** ***************** theme toggle *******************/
  const toggleMode = useCallback(
    (forceMode?: State["mode"]) => {
      const newMode = forceMode ?? (mode === "dark" ? "light" : "dark");
      setMode(newMode);
      document.documentElement.dataset.colorScheme = newMode;
    },
    [mode],
  );

  /** ***************** change locale *******************/
  const changeLocale = useCallback((locale: string) => {
    void i18next.changeLanguage(locale).then(() => {
      document.documentElement.lang = locale;
      document.documentElement.dir = i18next.dir();
      setLocale(locale);
    });
  }, []);

  /** ***************** change calendar *******************/
  const changeCalendar = useCallback((calendar: State["calendar"]) => {
    setCalendar(calendar);
  }, []);

  /** ***************** change primary theme *******************/
  const changeTheme = useCallback((color: State["theme"]) => {
    setTheme(color);
    document.documentElement.dataset.primaryScheme = color;
  }, []);

  /** ***************** change accent theme *******************/
  const changeAccent = useCallback((color: State["accent"]) => {
    setAccent(color);
    document.documentElement.dataset.accentScheme = color;
  }, []);

  const closeOverlays = useCallback((closeNotifs = false) => {
    closeNotifs && notificationRef.current?.closeAll();
    overlayRef.current?.closeAll();
  }, []);

  /** ***************** context provider *******************/
  return (
    <GlobalContext.Provider
      value={{
        closeOverlays,
        toggleMode,
        changeTheme,
        changeAccent,
        changeLocale,
        changeCalendar,
        errorElement,
        currentMode: mode,
        currentTheme: theme,
        currentAccent: accent,
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
        <TooltipWatcher />
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
