/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

import { hash } from "./_hash";

const _debounce = {
  _timer: {} as KeyValue,
  fn: (fn: (...rest: AnyObject) => AnyObject, timeout = 500) => {
    /******************* create debounce timer id using callback hash *******************/
    const id = hash(fn.toString());

    /******************* return debounced function *******************/
    const cb = (...args: AnyObject) => {
      _debounce._timer[id] && clearTimeout(_debounce._timer[id]);
      _debounce._timer[id] = window.setTimeout(() => fn(...args), timeout);
    };
    cb.cancel = () => clearTimeout(_debounce._timer[id]);
    return cb;
  },
};

/**
 * debounce callback
 * @internal
 */
export const debounce = _debounce.fn;
