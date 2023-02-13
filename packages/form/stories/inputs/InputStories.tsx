/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxIcon } from "@axux/core";
import { Countries, Country } from "@axux/utilities";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { Fragment } from "react";
import { AxField } from "../../src";

const TextTemplate: ComponentStory<typeof AxField.Text> = (props) => (
  <AxField.Text {...props} width="32rem" onChange={action("onChange")} />
);
export const TextStory = TextTemplate.bind({});
TextStory.args = {
  label: "Text input",
  placeholder: "Text value....",
  error: "",
  info: "",
  inline: false,
  allowClear: true,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const TextareaTemplate: ComponentStory<typeof AxField.Textarea> = (props) => (
  <AxField.Textarea {...props} width="32rem" onChange={action("onChange")} />
);
export const TextareaStory = TextareaTemplate.bind({});
TextareaStory.args = {
  label: "Textarea input",
  placeholder: "Textarea value....",
  error: "",
  info: "",
  rows: 5,
  inline: false,
  allowClear: true,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const PasswordTemplate: ComponentStory<typeof AxField.Password> = (props) => (
  <AxField.Password {...props} width="32rem" onChange={action("onChange")} />
);
export const PasswordStory = PasswordTemplate.bind({});
PasswordStory.args = {
  label: "Password input",
  placeholder: "Password....",
  error: "",
  info: "",
  strength: 81,
  inline: false,
  allowClear: true,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
  showToggle: true,
};

const NumberTemplate: ComponentStory<typeof AxField.Number> = (props) => (
  <AxField.Number {...props} width="32rem" onChange={action("onChange")} />
);
export const NumberStory = NumberTemplate.bind({});
NumberStory.args = {
  label: "Number input",
  placeholder: "Numeric value....",
  error: "",
  info: "",
  min: 0,
  max: 10,
  step: 0.5,
  inline: false,
  allowClear: true,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const SearchTemplate: ComponentStory<typeof AxField.Search> = (props) => (
  <AxField.Search {...props} width="32rem" onSearch={action("onSearch")} />
);
export const SearchStory = SearchTemplate.bind({});
SearchStory.args = {
  label: "Search input",
  placeholder: "Search value....",
  error: "",
  info: "",
  inline: false,
  autoFocus: false,
  isSearching: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const ColorTemplate: ComponentStory<typeof AxField.Color> = (props) => (
  <AxField.Color {...props} onChange={action("onChange")} />
);
export const ColorStory = ColorTemplate.bind({});
ColorStory.args = {
  label: "Color input",
  value: "#FC0000",
  error: "",
  info: "",
  hideAlpha: false,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const SelectIcons:KeyValue = {
  first: "mdi-numeric-1-circle",
  second: "mdi-numeric-2-circle",
  third: "mdi-numeric-3-circle",
}
const SelectColor:KeyValue = {
  first: "#ffc30b",
  second: "#adadc7",
  third: "#b2560c",
}

const SelectTemplate: ComponentStory<typeof AxField.Select<string>> = (props) => (
  <AxField.Select {...props} width="32rem" onSelect={action("onSelect")} onChange={action("onChange")} />
);
export const SelectStory = SelectTemplate.bind({});
SelectStory.args = {
  label: "Select input",
  placeholder: "Select value....",
  error: "",
  info: "",
  value:"first",
  options: ["first", "second","third"],
  makeLabel: (item) => (
    <div className="flex gap-1 items-center">
      <AxIcon
        icon={`mdi ${SelectIcons[item]}`}
        className="text-lg"
        color={SelectColor[item]
        }
      />
      <label className="flex-auto">{item}</label>
    </div>
  ),
  renderer: (item) => (
    <div className="flex gap-1 items-center">
      <AxIcon
        icon={`mdi ${SelectIcons[item]}`}
        className="text-lg"
        color={SelectColor[item]
        }
      />
      <label className="flex-auto">{item}</label>
    </div>
  ),
  allowClear:true,
  inline: false,
  autoFocus: false,
  isInvalid: false,
  isEditable: true,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const ComboTemplate: ComponentStory<typeof AxField.Combo<Country>> = (props) => (
  <AxField.Combo {...props} width="32rem" onSelect={action("onSelect")} onChange={action("onChange")} />
);
export const ComboStory = ComboTemplate.bind({});
ComboStory.args = {
  label: "Combo input",
  placeholder: "Combo value....",
  error: "",
  info: "",value:"AE",
  valueProperty: "iso2",
  labelProperty: "name",
  options: Object.entries(Countries.list.reduce<KeyValue>((r,c) => ({...r,
    [c.continent] :[...(r[c.continent]??[]), c]
  }),{})).map(([label, items]) => ({label,items})),
  renderer: (c) => (
    <div>
      {Countries.emoji(c.iso2)}&nbsp;{c.name}
    </div>
  ),
  makeLabel: (c) => (
    `${c.emoji} ${c.name}`
  ),
  allowClear:true,
  inline: false,
  autoFocus: false,
  isInvalid: false,
  isEditable: true,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const TagTemplate: ComponentStory<typeof AxField.Tag<Country>> = (props) => (
  <AxField.Tag {...props} width="32rem" onSelect={action("onSelect")} onChange={action("onChange")} />
);
export const TagStory = TagTemplate.bind({});
TagStory.args = {
  label: "Tag input",
  placeholder: "Select value....",
  error: "",
  info: "",
  valueProperty: "iso2",
  labelProperty: "name",
  options: Countries.list,
  renderer: (c) => (
    <div>
      {Countries.emoji(c.iso2)}&nbsp;{c.name}
    </div>
  ),
  makeLabel: (c) => (
    <div>
      {c.iso2 ? Countries.emoji(c.iso2)+" "+c.name : c.toString()}
    </div>
  ),
  allowCreate: true,
  inline: false,
  allowClear: true,
  autoFocus: false,
  isInvalid: false,
  isEditable: true,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const SuggestTemplate: ComponentStory<typeof AxField.Suggest> = (props) => (
  <AxField.Suggest {...props} width="32rem" onQuery={e=>{action("onQuery")(e);return []}} onSelect={action("onSelect")} onChange={action("onChange")} />
);
export const SuggestStory = SuggestTemplate.bind({});
SuggestStory.args = {
  label: "Suggest input",
  placeholder: "Search for something....",
  error: "",
  info: "",
  options:["category: latest", "category: trending"],
  defaultItems:[
    {value:"category: games",label:"Games", info:"Search latest games"},
    {value:"category: dev",label:"Dev Tools", info:"Search latest developer tools"},
  ],
  allowClear: true,
  autoFocus: false,
  inline: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const SliderTemplate: ComponentStory<typeof AxField.Slider> = (props) => (
  <AxField.Slider {...props} width="32rem" onChange={action("onChange")} />
);
export const SliderStory = SliderTemplate.bind({});
SliderStory.args = {
  label: "Slider input",
  error: "",
  info: "",
  min: 0,
  max: 10,
  step: 0.5,
  height: 144,
  inline: false,
  isVertical: false,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const FileTemplate: ComponentStory<typeof AxField.File> = (props) => (
  <AxField.File {...props} width="32rem" onChange={action("onChange")} />
);
export const FileStory = FileTemplate.bind({});
FileStory.args = {
  label: "File input",
  error: "",
  info: "",
  inline: false,
  multiple: false,
  showList: false,
  allowClear: true,
  autoFocus: false,
  isInvalid: false,
  isDisabled: false,
  isReadOnly: false,
  isRequired: false,
};

const CheckboxTemplate: ComponentStory<typeof AxField.Checkbox> = (props) => (
  <AxField.Checkbox {...props} onChange={action("onChange")} />
);
export const CheckboxStory = CheckboxTemplate.bind({});
CheckboxStory.args = {
  label: "Checkbox label",
  error: "",
  isChecked: false,
  isInvalid: false,
  isDisabled: false,
};

const RadioTemplate: ComponentStory<typeof AxField.Radio> = (props) => (
  <Fragment>
    <AxField.Radio
      {...props}
      name="test"
      value="1"
      onChange={action("onChange")}
    />
    <AxField.Radio
      {...props}
      name="test"
      value="2"
      onChange={action("onChange")}
    />
    <AxField.Radio
      {...props}
      name="test"
      value="3"
      onChange={action("onChange")}
    />
  </Fragment>
);
export const RadioStory = RadioTemplate.bind({});
RadioStory.args = {
  label: "Radio label",
  error: "",
  isInvalid: false,
  isDisabled: false,
};

const SwitchTemplate: ComponentStory<typeof AxField.Switch> = (props) => (
  <AxField.Switch {...props} onChange={action("onChange")} />
);
export const SwitchStory = SwitchTemplate.bind({});
SwitchStory.args = {
  label: "Switch label",
  error: "",
  color: "primary",
  offLabel: "",
  onLabel: "",
  isChecked: false,
  isInvalid: false,
  isDisabled: false,
};

const ContainerTemplate: ComponentStory<typeof AxField.Container> = (props) => (
  <AxField.Container {...props} width="32rem">
    <AxField.Addon>Username</AxField.Addon>
    <AxField.Text aria-label="Username">
      <AxField.Addon icon="mdi mdi-account" />
    </AxField.Text>
    <AxField.Addon>Password</AxField.Addon>
    <AxField.Text aria-label="Password">
      <AxField.Addon icon="mdi mdi-key" />
    </AxField.Text>
  </AxField.Container>
);
export const ContainerStory = ContainerTemplate.bind({});
ContainerStory.args = {
  label: "Container label",
  info: "",
  isRequired: false,
  isVertical: false,
};

export default { title: "AxField" };
