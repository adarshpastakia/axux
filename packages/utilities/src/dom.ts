// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

/* istanbul ignore file */

/** @internal */
export const withinEl = (target: HTMLElement | null, ...classNames: string[]) => {
  if (!target) {
    return false;
  }
  return !!target.closest(`${classNames.join(",")}`);
};

/** @internal */
export const withinDomTree = (target: HTMLElement | null, className: string, before = "body") => {
  if (!target) {
    return false;
  }
  const nearest = target.closest(`${className}, ${before}`);
  return nearest && nearest.classList.contains(className.replace(/^\./, ""));
};

/** @internal */
export const withinElement = (target: HTMLElement | null, ...elements: (HTMLElement | null)[]) => {
  if (!target) {
    return false;
  }
  do {
    if (target && elements.includes(target)) return true;
    target = target?.parentElement ?? null;
  } while (target && target !== document.body);
  return false;
};

/** @internal */
export const isVisible = (el: HTMLElement | null) => {
  if (!el) return false;
  const visible = getComputedStyle(el).display !== "none";
  if (visible) {
    const { width, height } = el.getBoundingClientRect();
    return width !== 0 && height !== 0;
  }
  return false;
};
