/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

export const getRawHtml = (el: HTMLElement) => {
  // Mapping between tag names and css default values lookup tables. This allows to exclude default values in the result.
  const defaultStylesByTagName: KeyValue = {};

  // Styles inherited from style sheets will not be rendered for elements with these tag names
  const noStyleTags: KeyValue = {
    BASE: true,
    HEAD: true,
    HTML: true,
    META: true,
    NOFRAME: true,
    NOSCRIPT: true,
    PARAM: true,
    SCRIPT: true,
    STYLE: true,
    TITLE: true,
  };

  // This list determines which css default values lookup tables are precomputed at load time
  // Lookup tables for other tag names will be automatically built at runtime if needed
  const tagNames = [
    "A",
    "P",
    "DIV",
    "SPAN",
    "BR",
    "PRE",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HR",
    "IMG",
    "OL",
    "UL",
    "LI",
    "TABLE",
    "TBODY",
    "TD",
    "TFOOT",
    "TH",
    "THEAD",
    "TR",
    "EM",
    "STRONG",
  ];

  const computeDefaultStyleByTagName = (tagName: string) => {
    const defaultStyle: KeyValue = {};
    const element = document.body.appendChild(document.createElement(tagName));
    const computedStyle: KeyValue = getComputedStyle(element);
    for (let i = 0; i < computedStyle.length; i++) {
      defaultStyle[computedStyle[i]] = computedStyle[computedStyle[i]];
    }
    document.body.removeChild(element);
    return defaultStyle;
  };

  const getDefaultStyleByTagName = (tagName: string) => {
    tagName = tagName.toUpperCase();
    if (!defaultStylesByTagName[tagName]) {
      defaultStylesByTagName[tagName] = computeDefaultStyleByTagName(tagName);
    }
    return defaultStylesByTagName[tagName];
  };

  if (el.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError();
  }
  const cssTexts = [];
  const elements = el.querySelectorAll("*") as AnyObject;
  for (let i = 0; i < elements.length; i++) {
    const e = elements[i] as HTMLElement;
    if (!noStyleTags[e.tagName]) {
      const computedStyle: KeyValue = getComputedStyle(e);
      const defaultStyle = getDefaultStyleByTagName(e.tagName);
      cssTexts[i] = e.style.cssText;
      for (let ii = 0; ii < computedStyle.length; ii++) {
        const cssPropName: string = computedStyle[ii];
        if (computedStyle[cssPropName] !== defaultStyle[cssPropName]) {
          e.style[cssPropName as AnyObject] = computedStyle[cssPropName];
        }
      }
    }
  }
  // Precompute the lookup tables.
  for (let i = 0; i < tagNames.length; i++) {
    if (!noStyleTags[tagNames[i]]) {
      defaultStylesByTagName[tagNames[i]] = computeDefaultStyleByTagName(
        tagNames[i]
      );
    }
  }

  const result = el.outerHTML;
  for (let i = 0; i < elements.length; i++) {
    elements[i].style.cssText = cssTexts[i];
  }
  return result;
};
