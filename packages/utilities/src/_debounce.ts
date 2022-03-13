// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { hash } from "./_hash";

const _debounce = {
  _timer: {} as KeyValue,
  fn: (fn: (...rest: AnyObject) => AnyObject, timeout = 500) => {
    const id = hash(fn.toString());
    return (...args: AnyObject) => {
      _debounce._timer[id] && clearTimeout(_debounce._timer[id]);
      _debounce._timer[id] = window.setTimeout(() => fn(...args), timeout);
    };
  }
};

/* istanbul ignore file */
/** @internal */
export const debounce = _debounce.fn;
