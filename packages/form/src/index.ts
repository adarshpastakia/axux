/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Addon } from "./inputs/Addon";
import { Checkbox } from "./inputs/Checkbox";
import { Container } from "./inputs/Container";
import { File } from "./inputs/File";
import { Number } from "./inputs/Number";
import { Options } from "./inputs/Options";
import { Password } from "./inputs/Password";
import { Radio } from "./inputs/Radio";
import { Search } from "./inputs/Search";
import { Slider } from "./inputs/Slider";
import { Switch } from "./inputs/Switch";
import { Text } from "./inputs/Text";
import { Textarea } from "./inputs/Textarea";
import { Combo } from "./select/Combo";
import { Select } from "./select/Select";
import { Suggest } from "./select/Suggest";
import { Tag } from "./select/Tag";

import "./i18n";

export const AxField = {
  Container,
  Addon,
  Text,
  Textarea,
  Password,
  Number,
  Slider,
  File,
  Search,
  Options,
  Checkbox,
  Radio,
  Switch,
  Combo,
  Select,
  Suggest,
  Tag,
};

export { AxForm } from "./form/Form";
export type { FormRef } from "./form/Form";

AxField.Container.displayName = "AxField.Container";
AxField.Addon.displayName = "AxField.Addon";
AxField.Text.displayName = "AxField.Text";
AxField.Textarea.displayName = "AxField.Text";
AxField.Password.displayName = "AxField.Password";
AxField.Number.displayName = "AxField.Number";
AxField.Slider.displayName = "AxField.Slider";
AxField.File.displayName = "AxField.File";
AxField.Search.displayName = "AxField.Search";
AxField.Options.displayName = "AxField.Options";
AxField.Checkbox.displayName = "AxField.Text";
AxField.Radio.displayName = "AxField.Radio";
AxField.Switch.displayName = "AxField.Switch";
AxField.Combo.displayName = "AxField.Combo";
AxField.Select.displayName = "AxField.Select";
AxField.Suggest.displayName = "AxField.Suggest";
AxField.Tag.displayName = "AxField.Tag";
