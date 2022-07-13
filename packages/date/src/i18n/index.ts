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
import arSuper from "./superdate/ar.json";
import enSuper from "./superdate/en.json";

addTranslationBundle("date", { en, ar });
addTranslationBundle("superdate", { en: enSuper, ar: arSuper });
