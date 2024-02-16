/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { addTranslationBundle } from "@axux/core";
import ar from "./ar.json";
import en from "./en.json";
import graphAr from "./graph-ar.json";
import graphEn from "./graph-en.json";

addTranslationBundle("data", { en, ar });
addTranslationBundle("graph", { en: graphEn, ar: graphAr });
