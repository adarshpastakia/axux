/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2023
 * @license   : MIT
 */

import * as DOMPurify from "dompurify";
import hljs from "highlight.js/lib/core";
import { Marked } from "marked";
import * as admonition from "marked-admonition-extension";
import { markedEmoji } from "marked-emoji";
import { markedHighlight } from "marked-highlight";

import bash from "highlight.js/lib/languages/bash";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import yaml from "highlight.js/lib/languages/yaml";
import { emojiMap } from "./emojis";
hljs.registerLanguage("javascript", js);
hljs.registerLanguage("typescript", ts);
hljs.registerLanguage("css", css);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("html", html);
hljs.registerLanguage("yaml", yaml);
hljs.registerLanguage("default", html);
const LANGS = [
  "javascript",
  "typescript",
  "css",
  "json",
  "bash",
  "html",
  "yaml",
];
const _marked = new Marked(
  admonition.default,
  markedEmoji({
    emojis: emojiMap,
    unicode: true,
  }),
  markedHighlight({
    langPrefix: "hljs language-",
    highlight(code, language) {
      return hljs.highlight(code, {
        language: LANGS.includes(language) ? language : "default",
      }).value;
    },
  })
);
_marked.use({
  gfm: true,
  breaks: true,
  renderer: {
    code(code, infostring = "") {
      return `<pre class="hljs language-${infostring}"><code>${code}</code><button onclick='navigator.clipboard.writeText(this.previousSibling.innerText)' class="hljs-copy"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19,21H8V7H19M19,5H8A2,2 0 0,0 6,7V21A2,2 0 0,0 8,23H19A2,2 0 0,0 21,21V7A2,2 0 0,0 19,5M16,1H4A2,2 0 0,0 2,3V17H4V3H16V1Z" /></svg></button></pre>`;
    },
  },

  hooks: {
    postprocess: (source: string) => DOMPurify.sanitize(source),
  } as AnyObject,
});

export const marked = _marked;
