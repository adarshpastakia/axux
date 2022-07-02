/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { isArray, isEmpty } from "./_isType";

/**
 * split text into array of tokens by word boundaries
 * @param str 
 * @param keywords 
 * @internal
 */
export const tokenize = (str: string, keywords?: string | string[]) => {
  if (isEmpty(keywords)) {
    return [[str, ""]];
  }
  const keys = isArray(keywords) ? keywords : [keywords];
  const keyMap = keys.map((key) => {
    // escape regex control characters
    let escapedKey = key.replace(/([+*.?^$()[\]\\!&|\-=])/gm, "\\$1");
    // place token within word boundaries if start/end with alpha-numeric
    if (key.match(/^[a-z0-9]/i)) escapedKey = `\\b${escapedKey}`;
    if (key.match(/[a-z0-9]$/i)) escapedKey = `${escapedKey}\\b`;
    return escapedKey;
  });
  const regx = new RegExp(`(${keyMap.join("|")})`, "img");
  let match;
  let lastIndex = 0;
  const tokens = [];
  while ((match = regx.exec(str)) !== null) {
    tokens.push([
      str.substring(lastIndex, match.index),
      str.substring(match.index, regx.lastIndex),
    ]);
    lastIndex = regx.lastIndex;
  }
  tokens.push([str.substring(lastIndex), ""]);
  return tokens;
};
