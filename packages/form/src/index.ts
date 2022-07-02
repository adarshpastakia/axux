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
import { Slider } from "./inputs/Slider";
import { Switch } from "./inputs/Switch";
import { Text } from "./inputs/Text";
import { Textarea } from "./inputs/Textarea";

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
  Options,
  Checkbox,
  Radio,
  Switch,
};

export { AxForm } from "./form/Form";

AxField.Container.displayName = "AxField.Container";
AxField.Addon.displayName = "AxField.Addon";
AxField.Text.displayName = "AxField.Text";
AxField.Textarea.displayName = "AxField.Text";
AxField.Password.displayName = "AxField.Password";
AxField.Number.displayName = "AxField.Number";
AxField.Slider.displayName = "AxField.Slider";
AxField.File.displayName = "AxField.File";
AxField.Checkbox.displayName = "AxField.Text";
AxField.Radio.displayName = "AxField.Radio";
AxField.Switch.displayName = "AxField.Switch";
