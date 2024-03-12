/**
 * AxUX React UI Framework with Tailwind CSS
 * @author    : Adarsh Pastakia
 * @version   : 4.0.0
 * @copyright : 2024
 * @license   : MIT
 */
/* istanbul ignore file */

export const TypeColors = {
  info: "color: #2B95D6;font-weight:bold;",
  debug: "color: #5C7080;font-weight:bold;",
  timer: "color: #5C7080;font-weight:bold;",
  error: "color: #F55656;font-weight:bold;",
  warning: "color: #F29D49;font-weight:bold;",
};

export const TagColors = {
  info: "\u001B[38;5;14m",
  debug: "\u001B[38;5;7m",
  timer: "\u001B[38;5;1m",
  error: "\u001B[38;5;9m",
  warning: "\u001B[38;5;3m",
};

/**
 * @internal
 */
export const useLogger = (base: string) => ({
  colors: typeof window === "undefined" ? TagColors : TypeColors,
  timer(key: string) {
    const startTime = new Date().getTime();
    let nextTime = new Date().getTime();
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self = this;
    const getTime = () => {
      const ret = (new Date().getTime() - nextTime) / 1000;
      nextTime = new Date().getTime();
      return `${ret}ms (${(new Date().getTime() - startTime) / 1000}ms)`;
    };
    const getFullTime = () => {
      return (new Date().getTime() - startTime) / 1000;
    };
    return {
      log: (msg: string) => self.log(msg),
      debug: (msg: string, ...rest: unknown[]) =>
        self.debug(key, msg, getTime(), ...rest),
      info: (msg: string, ...rest: unknown[]) =>
        self.info(key, msg, getTime(), ...rest),
      error: (msg: string, ...rest: unknown[]) =>
        self.error(key, msg, getTime(), ...rest),
      warning: (msg: string, ...rest: unknown[]) =>
        self.warning(key, msg, getTime(), ...rest),
      end: (msg = "completed", ...rest: unknown[]) =>
        self.info(key, msg, getFullTime(), ...rest),
    };
  },

  log(msg: string) {
    console.log(msg);
  },

  debug(msg: string, ...rest: unknown[]) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`%cDEBUG::${base} - ${msg}`, this.colors.debug, ...rest);
      rest.forEach((e) => console.table(e));
    }
  },

  info(msg: string, ...rest: unknown[]) {
    if (process.env.NODE_ENV === "development") {
      console.info(`%cINFO::${base} - ${msg}\n`, this.colors.info, ...rest);
    }
  },

  error(msg: string, ...rest: unknown[]) {
    if (process.env.NODE_ENV === "development") {
      console.error(`%cERROR::${base} - ${msg}\n`, this.colors.error, ...rest);
    }
  },

  warning(msg: string, ...rest: unknown[]) {
    if (process.env.NODE_ENV === "development") {
      console.warn(
        `%cWARNING::${base} - ${msg}\n`,
        this.colors.warning,
        ...rest,
      );
    }
  },
});
