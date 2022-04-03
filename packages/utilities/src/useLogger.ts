// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

export const TypeColors = {
  info: "color: #2B95D6;font-weight:bold;",
  debug: "color: #5C7080;font-weight:bold;",
  error: "color: #F55656;font-weight:bold;",
  warning: "color: #F29D49;font-weight:bold;"
};

export const TagColors = {
  info: "color: #106BA3;",
  debug: "color: #394B59;",
  error: "color: #C23030;",
  warning: "color: #BF7326;"
};

/* istanbul ignore file */
/** @internal */
export const useLogger = (base: string) => ({
  timer(key: string) {
    console.time(key);
    return {
      log: (...args: AnyObject[]) => console.timeLog(key, ...args),
      end: () => console.timeEnd(key)
    };
  },

  debug(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.debug(`%cDEBUG::%c${base} - ${msg}`, TypeColors.debug, TagColors.debug);
      rest.forEach((e) => console.table(e));
    }
  },

  info(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.info(`%cINFO::%c${base} - ${msg}\n`, TypeColors.info, TagColors.info, ...rest);
    }
  },

  error(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.error(`%cERROR::%c${base} - ${msg}\n`, TypeColors.error, TagColors.error, ...rest);
    }
  },

  warning(msg: string, ...rest: AnyObject[]) {
    if (process.env.NODE_ENV === "development") {
      // tslint:disable-next-line:no-console
      console.warn(
        `%cWARNING::%c${base} - ${msg}\n`,
        TypeColors.warning,
        TagColors.warning,
        ...rest
      );
    }
  }
});
