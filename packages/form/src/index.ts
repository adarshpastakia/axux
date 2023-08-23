/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { Addon } from "./inputs/Addon";
import { Array } from "./inputs/Array";
import { Checkbox } from "./inputs/Checkbox";
import { Color } from "./inputs/Color";
import { ColorPicker } from "./inputs/ColorPicker";
import { Container } from "./inputs/Container";
import { File } from "./inputs/File";
import { Masked } from "./inputs/Masked";
import { Number } from "./inputs/Number";
import { Options } from "./inputs/Options";
import { Password } from "./inputs/Password";
import { Radio } from "./inputs/Radio";
import { Range } from "./inputs/Range";
import { Search } from "./inputs/Search";
import { Slider } from "./inputs/Slider";
import { Switch } from "./inputs/Switch";
import { Text } from "./inputs/Text";
import { Textarea } from "./inputs/Textarea";
import { Combo } from "./select/Combo";
import { List } from "./select/List";
import { Select } from "./select/Select";
import { Suggest } from "./select/Suggest";
import { Tag } from "./select/Tag";

import "./i18n";

export const AxField = {
  Container,
  Addon,
  Array,
  Text,
  Color,
  ColorPicker,
  Textarea,
  Password,
  Number,
  Slider,
  Range,
  File,
  Masked,
  Search,
  Options,
  Checkbox,
  Radio,
  Switch,
  Combo,
  Select,
  Suggest,
  Tag,
  List,
};

export { AxForm } from "./form/Form";
export type { FormRef } from "./form/Form";

AxField.Container.displayName = "AxField.Container";
AxField.Addon.displayName = "AxField.Addon";
AxField.Text.displayName = "AxField.Text";
AxField.Masked.displayName = "AxField.Masked";
AxField.Textarea.displayName = "AxField.Textare";
AxField.Password.displayName = "AxField.Password";
AxField.Number.displayName = "AxField.Number";
AxField.Slider.displayName = "AxField.Slider";
AxField.Range.displayName = "AxField.Range";
AxField.File.displayName = "AxField.File";
AxField.Search.displayName = "AxField.Search";
AxField.Options.displayName = "AxField.Options";
AxField.Checkbox.displayName = "AxField.Checkbox";
AxField.Radio.displayName = "AxField.Radio";
AxField.Switch.displayName = "AxField.Switch";
AxField.Combo.displayName = "AxField.Combo";
AxField.Select.displayName = "AxField.Select";
AxField.Suggest.displayName = "AxField.Suggest";
AxField.Tag.displayName = "AxField.Tag";
AxField.List.displayName = "AxField.List";
AxField.Color.displayName = "AxField.Color";
AxField.ColorPicker.displayName = "AxField.ColorPicker";
