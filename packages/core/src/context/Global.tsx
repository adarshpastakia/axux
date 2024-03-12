/**
 * AxUX React UI Framework with Tailwind CSS
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
import { type COLORS, type COLOR_SCHEME } from "../types";
import {
  NotificationContainer,
  type NotificationRef,
} from "./NotificationContainer";
import { OverlayContainer, type OverlayRef } from "./OverlayContainer";

type CALENDARS = "gregorian" | "hijri";

interface State {
  colorScheme: COLOR_SCHEME;
  primary: COLORS;
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
   */
  defaultColorScheme?: State["colorScheme"];
  /**
   * default i18n locale
   */
  defaultLocale?: string;
  /**
   * default calendar type
   */
  defaultCalendar?: State["calendar"];

  /**
   * default primary theme color
   */
  defaultPrimary?: State["primary"];
  /**
   * default accent theme color
   */
  defaultAccent?: State["accent"];
}

interface GlobalContextType {
  /**
   * toggle color scheme between light and dark
   * or force to scheme provided
   * @param theme
   */
  toggleColorScheme: (scheme?: State["colorScheme"]) => void;
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
  changePrimary: (color: State["primary"]) => void;
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
  currentColorScheme: State["colorScheme"];
  /**
   * current primary theme color
   */
  currentPrimary: State["primary"];
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

  portalRoot: RefObject<HTMLDivElement>;
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
 * The Application Provider is designed to manage and provide customization options across the application.
 * It allows for setting user preferences for prefered color schemes, calendar type and localization locales.
 *
 * It also wraps the application with ReactHelmet for providing templated route titles throughout the application.
 *
 * > **Note**: Ensure that the Application Provider wraps around the root component of the application to make the customization options available throughout the component tree.
 */
export const AxApplicationProvider: FC<GlobalProps> = ({
  children,
  description,
  titleTemplate,
  defaultTitle,
  errorElement,
  defaultColorScheme,
  defaultLocale = "en",
  defaultPrimary = "denim",
  defaultAccent = "jade",
  defaultCalendar = "gregorian",
  // @ts-expect-error ignore
  forceTheme,
  // @ts-expect-error ignore
  forceLocale,
}) => {
  const portalRoot = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<OverlayRef>(null);
  const notificationRef = useRef<NotificationRef>(null);
  const [colorScheme, setColorScheme] = useLocalStorage<State["colorScheme"]>(
    KEY_MODE,
    defaultColorScheme ?? SYSTEM_MODE,
  );
  const [primary, setPrimary] = useLocalStorage<State["primary"]>(
    KEY_THEME,
    defaultPrimary,
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
    void i18next.changeLanguage(locale).then(() => {
      document.documentElement.dir = i18next.dir();
    });
  }, []);

  /** ***************** theme toggle *******************/
  const toggleColorScheme = useCallback(
    (forceMode?: State["colorScheme"]) => {
      const newMode = forceMode ?? (colorScheme === "dark" ? "light" : "dark");
      setColorScheme(newMode);
    },
    [colorScheme],
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
  const changePrimary = useCallback((color: State["primary"]) => {
    setPrimary(color);
  }, []);

  /** ***************** change accent theme *******************/
  const changeAccent = useCallback((color: State["accent"]) => {
    setAccent(color);
  }, []);

  const closeOverlays = useCallback((closeNotifs = false) => {
    closeNotifs && notificationRef.current?.closeAll();
    overlayRef.current?.closeAll();
  }, []);

  useEffect(() => {
    forceTheme && toggleColorScheme(forceTheme);
    forceLocale && changeLocale(forceLocale);
  }, [forceLocale, forceTheme]);

  /** ***************** context provider *******************/
  return (
    <GlobalContext.Provider
      value={{
        closeOverlays,
        toggleColorScheme,
        changePrimary,
        changeAccent,
        changeLocale,
        changeCalendar,
        errorElement,
        portalRoot,
        currentColorScheme: colorScheme,
        currentPrimary: primary,
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
        <div
          ref={portalRoot}
          className="contents"
          data-color-scheme={colorScheme}
          data-primary-scheme={primary}
          data-accent-scheme={accent}
        >
          {children}
          <OverlayContainer itemRef={overlayRef} />
          <NotificationContainer itemRef={notificationRef} />
          <TooltipWatcher />
        </div>
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
 * The useApplicationContext hook provides access to current color scheme, calendar type, localization locale.
 *
 * Use context provides the following options
 *
 * > `currentColorScheme`
 *
 * > `currentPrimary`
 *
 * > `currentAccent`
 *
 * > `currentLocale`
 *
 * > `currentCalendar`
 *
 * >`toggleColorScheme: (scheme?: "dark" | "light") => void`
 * > _toggle current color scheme between light/dark unless scheme provided_
 *
 * > `changeLocale: (locale: string) => void`
 * > _switch current localization locale_
 *
 * > `changeCalendar: (calendar: "gregorian" | "hijri") => void`
 * > _switch current calendar_
 *
 * > `changePrimary: (color: Colors | ColorHex) => void`
 * > _apply new primary color_
 *
 * > `changeAccent: (color: Colors | ColorHex) => void`
 * > _apply new accent color_
 *
 * > `closeOverlays: (closeNotifs?: true) => void`
 * > _provide mechanism to close all overlays, useful when navigating between routes_
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
