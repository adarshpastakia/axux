// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { addTranslationBundle } from "@axux/core";
import ar from "./ar.json";
import en from "./en.json";
import arSuper from "./superdate/ar.json";
import enSuper from "./superdate/en.json";

addTranslationBundle("date", { en, ar });
addTranslationBundle("superdate", { en: enSuper, ar: arSuper });
