// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { action } from "@storybook/addon-actions";
import { Story } from "@storybook/react";
import { PropsWithChildren } from "react";
import { StateLabel } from "../../../../storybook/components";
import { AxButton, AxFlexBox, AxMenu, COLOR } from "../../src";
import { ButtonProps } from "../../src/buttons/Button";

export const ButtonTemplate: Story<PropsWithChildren<ButtonProps>> = (props) => (
  <AxButton {...props} />
);

export const ButtonStyles: Story<Omit<ButtonProps, "type">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {["default", "outline", "solid", "link"].map((type: AnyObject) => (
        <AxFlexBox.Col flex="auto" key={type}>
          <StateLabel>{type}</StateLabel>
          <AxButton {...props} type={type}>
            Click Me!
          </AxButton>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonSizes: Story<Omit<ButtonProps, "size">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {[
        ["sm", "Small"],
        ["default", "Default"],
        ["md", "Medium"],
        ["lg", "Large"]
      ].map(([size, label]: AnyObject) => (
        <AxFlexBox.Col flex="auto" key={size}>
          <StateLabel>{label}</StateLabel>
          <AxButton {...props} size={size}>
            Click Me!
          </AxButton>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonThemes: Story<Omit<ButtonProps, "color">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      {Object.values(COLOR).map((color) => (
        <AxFlexBox.Col flex="auto" key={color}>
          <StateLabel>{color}</StateLabel>
          <AxButton {...props} color={color}>
            {color}
          </AxButton>
        </AxFlexBox.Col>
      ))}
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const DropdownStory: Story<Omit<ButtonProps, "split" | "children">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      <AxFlexBox.Col flex="auto">
        <AxButton.Dropdown label="Click Me!" {...props} split={false}>
          <AxMenu>
            <AxMenu.Item label="Dropdown menu" />
          </AxMenu>
        </AxButton.Dropdown>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <AxButton.Dropdown label="Click Me!" {...props} split="Button dropdown">
          <AxMenu>
            <AxMenu.Item label="Dropdown menu" />
          </AxMenu>
        </AxButton.Dropdown>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const IconStyles: Story<Omit<ButtonProps, "icon" | "iconAlign" | "iconHilight">> = (
  props
) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Align start</StateLabel>
        <AxButton {...props} icon="mdi mdi-bell">
          Button
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Align end</StateLabel>
        <AxButton {...props} icon="mdi mdi-bell" iconAlign="end">
          Button
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Hilight end</StateLabel>
        <AxButton {...props} icon="mdi mdi-bell" iconHilight>
          Button
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Hilight start</StateLabel>
        <AxButton {...props} icon="mdi mdi-bell" iconHilight iconAlign="end">
          Button
        </AxButton>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonVariants: Story<ButtonProps> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Positive</StateLabel>
        <AxButton.Positive {...props}>Click Me!</AxButton.Positive>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Negative</StateLabel>
        <AxButton.Negative {...props}>Click Me!</AxButton.Negative>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Neutral</StateLabel>
        <AxButton.Neutral {...props}>Click Me!</AxButton.Neutral>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Action</StateLabel>
        <AxButton.Action {...props} message="Action completed!">
          Click Me!
        </AxButton.Action>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Confirm</StateLabel>
        <AxButton.Confirm {...props} message="Confirm action?" onClick={action("Confirm:onClick")}>
          Click Me!
        </AxButton.Confirm>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonStates: Story<Omit<ButtonProps, "isLoading" | "isDisabled">> = (props) => (
  <AxFlexBox>
    <AxFlexBox.Row>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Normal</StateLabel>
        <AxButton {...props}>Click Me!</AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Loading</StateLabel>
        <AxButton {...props} isLoading>
          Click Me!
        </AxButton>
      </AxFlexBox.Col>
      <AxFlexBox.Col flex="auto">
        <StateLabel>Disabled</StateLabel>
        <AxButton {...props} isDisabled>
          Click Me!
        </AxButton>
      </AxFlexBox.Col>
    </AxFlexBox.Row>
  </AxFlexBox>
);

export const ButtonStory = ButtonTemplate.bind({});
ButtonStory.args = {
  children: "Click Me!"
};

export const WithIconStory = ButtonTemplate.bind({});
WithIconStory.args = {
  icon: "mdi mdi-bell",
  children: "Click Me!"
};

export const OnlyIconStory = ButtonTemplate.bind({});
OnlyIconStory.args = {
  "aria-label": "Icon button",
  icon: "mdi mdi-bell"
};

export const WithTooltipStory = ButtonTemplate.bind({});
WithTooltipStory.args = {
  children: "Tooltip!",
  tooltip: {
    placement: "bottom",
    content: "This is a clickable button"
  }
};

export const WithBadgeStory = ButtonTemplate.bind({});
WithBadgeStory.args = {
  children: "Click Me!",
  badge: {
    color: "danger",
    value: 9
  }
};

export default { title: "Example/Button", component: AxButton };
