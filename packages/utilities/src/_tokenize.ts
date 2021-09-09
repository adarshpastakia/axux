// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { isArray, isEmpty } from "./_isType";

export const tokenize = (str: string, keywords?: string | string[]) => {
  if (isEmpty(keywords)) {
    return [str, ""];
  }
  const keys = isArray(keywords) ? keywords : [keywords];
  const regx = new RegExp(`(${keys.join("|").replace(/([+*.])/gm, "\\$1")})`, "img");
  let match;
  let lastIndex = 0;
  const tokens = [];
  while ((match = regx.exec(str)) !== null) {
    tokens.push([
      str.substring(lastIndex, match.index),
      str.substring(match.index, regx.lastIndex)
    ]);
    lastIndex = regx.lastIndex;
  }
  tokens.push([str.substring(lastIndex), ""]);
  return tokens;
};
