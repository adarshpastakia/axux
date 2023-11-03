/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import emojiList from "emojilib";

export const emojiMap = Object.entries(emojiList).reduce<KeyValue>(
  (ret, [emoji, names]) => {
    names.forEach((name) => (ret[name] = ret[name] ?? emoji));
    return ret;
  },
  {}
);
