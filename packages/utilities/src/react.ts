// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

/* istanbul ignore file */
/** @internal */
export const getChildProps = (child: AnyObject) => {
  if ("props" in child) {
    return { ...child.props, key: child.key };
  }
  return {};
};
