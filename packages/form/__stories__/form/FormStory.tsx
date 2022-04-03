// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { AxButton, AxContent, AxIcon, AxPage, AxSection, AxToolbar, AxViewport } from "@axux/core";
import { AppIcons } from "@axux/core/dist/types/appIcons";
import { Countries } from "@axux/utilities";
import { Story } from "@storybook/react";
import { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import { LIPSUM } from "../../../../storybook/components/Lipsum";
import { AxField, AxForm, FormRef } from "../../src";
import { FormProps } from "../../src/form/Form";

const Template: Story<FormProps & { isDisabled?: boolean }> = ({ isDisabled, ...props }) => {
  const formRef = useRef<FormRef>();

  const [strength, setStrength] = useState(72);

  const handleValidate = useCallback(() => {
    formRef.current?.validate();
  }, []);
  const handleReset = useCallback(() => {
    formRef.current?.reset();
    setStrength(72);
  }, []);
  const handleClear = useCallback(() => {
    formRef.current?.clear();
    setStrength(0);
  }, []);

  return (
    <AxViewport>
      <AxPage>
        <AxSection>
          <AxContent>
            <AxForm {...props} formRef={formRef}>
              <AxField.Text
                name="text"
                autoFocus
                required
                allowClear
                isDisabled={isDisabled}
                label="Text field"
                placeholder="Any text..."
              />
              <AxField.Password
                required
                showToggle
                allowClear
                name="password"
                strength={strength}
                isDisabled={isDisabled}
                label="Password field"
                placeholder="Password phrase..."
              />
              <AxField.Number
                required
                allowClear
                name="number"
                isDisabled={isDisabled}
                label="Number field"
                placeholder="Any integer..."
              />
              <AxField.Slider
                required
                name="slider"
                isDisabled={isDisabled}
                label="Slider field"
                min={-180}
                max={180}
                showLabel
                showValue
                showTicks
              />
              <AxField.Options label="Checks">
                <AxField.Checkbox name="checks.email" label="via Email" />
                <AxField.Checkbox name="checks.sms" label="via SMS" />
                <AxField.Checkbox name="checks.notify" label="via App Notification" />
                <AxField.Checkbox name="checks.none" label="No contact" isDisabled />
                <AxField.Switch name="switch.email" offLabel="no" onLabel="Email" color="indigo" />
                <AxField.Switch name="switch.sms" offLabel="no" onLabel="Sms" color="green" />
                <AxField.Switch
                  name="switch.notify"
                  offLabel="no"
                  onLabel="yes"
                  color="pink"
                  label="vi App Notification"
                />
                <AxField.Switch name="switch.none" label="Unknown" />
              </AxField.Options>
              <AxField.Options label="Options" name="option">
                <AxField.Radio value="red" label="Red" />
                <AxField.Radio value="blue" label="Blue" />
                <AxField.Radio value="yellow" label="Yellow" />
                <AxField.Radio value="green" label="Green" />
                <AxField.Radio value="orange" label="Orange" isDisabled />
                <AxField.Radio value="purple" label="Purple" />
              </AxField.Options>
              <AxField.Select<KeyValue>
                required
                name="select"
                allowClear
                allowSearch
                options={Countries.list.map(({ iso2, name, tld, emoji }) => ({
                  label: name,
                  value: iso2,
                  badge: tld,
                  icon: emoji
                }))}
                isDisabled={isDisabled}
                label="Select field"
                placeholder="Select a country..."
              />
              <AxField.Tag
                name="multiselect"
                required
                allowSearch
                allowClear
                options={[
                  { icon: "🍎", value: "apple" },
                  { icon: "🍐", value: "pear" },
                  { icon: "🍊", value: "orange" },
                  { icon: "🍋", value: "lemon" },
                  { icon: "🍌", value: "banana" },
                  { icon: "🍉", value: "watermelon" },
                  { icon: "🍇", value: "grapes" },
                  { icon: "🍓", value: "strawberry" },
                  { icon: "🫐", value: "blueberry" },
                  { icon: "🍈", value: "melon" },
                  { icon: "🍒", value: "cherry" },
                  { icon: "🍑", value: "peach" },
                  { icon: "🥭", value: "mango" },
                  { icon: "🍍", value: "pineapple" },
                  { icon: "🥥", value: "coconut" },
                  { icon: "🥝", value: "kiwi" }
                ]}
                makeOption={({ icon, value }) => ({
                  value,
                  icon,
                  label: value
                })}
                isDisabled={isDisabled}
                label="Multi select field"
                placeholder="Select some fruit..."
              />
              <AxField.Textarea
                required
                allowClear
                span={2}
                name="textarea"
                isDisabled={isDisabled}
                label="Textarea field"
                placeholder="Long text paragraph..."
              />
            </AxForm>
          </AxContent>
          <AxSection.Foot>
            <AxToolbar align="end">
              <AxButton.Neutral onClick={handleClear}>Clear</AxButton.Neutral>
              <AxButton.Negative onClick={handleReset}>Reset</AxButton.Negative>
              <AxButton.Positive onClick={handleValidate}>Validate</AxButton.Positive>
            </AxToolbar>
          </AxSection.Foot>
        </AxSection>
      </AxPage>
    </AxViewport>
  );
};

export const FormStory = Template.bind({});
FormStory.args = {
  columns: 2,
  defaultValues: {
    text: "Simple text line",
    number: 99,
    password: "StrongP@55",
    option: "red",
    checks: { email: true, sms: false, notify: false },
    textarea: LIPSUM.para,
    select: "AE",
    multiselect: ["apple", "banana"]
  },
  schema: yup.object<KeyValue>().shape({
    text: yup.string().required(),
    number: yup.number().min(1).max(99),
    slider: yup.number().required().min(1).max(99),
    password: yup.string(),
    option: yup.string().required(),
    textarea: yup.string(),
    select: yup.string().required(),
    multiselect: yup.array().of(yup.string())
  })
};

export default { title: "Example/Form", component: AxForm };
