/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */
/* istanbul ignore file */

/**
 * debounce callback
 * @internal
 */
export const debounce = (
  fn: (...rest: AnyObject) => AnyObject,
  timeout = 500
) => {
  /******************* create debounce timer id using callback hash *******************/
  let _timer: AnyObject;

  /******************* return debounced function *******************/
  const cb = (...args: AnyObject) => {
    _timer && clearTimeout(_timer);
    _timer = window.setTimeout(() => fn?.(...args), timeout);
  };
  cb.cancel = () => clearTimeout(_timer);
  return cb;
};
