// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  AxButton,
  AxContent,
  AxFlexBox,
  AxFooter,
  AxPage,
  AxSection,
  AxViewport,
} from "@axux/core";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { useCallback, useRef, useState } from "react";
import * as yup from "yup";
import { AxField, AxForm, FormRef } from "../../src";

const FormSchema = new yup.ObjectSchema({
  text: yup.string().required(),
  password: yup.string().required(),
  options: yup.string().required(),
  check: yup.boolean().required(),
  switch: yup.boolean().required(),
  number: yup.number().required().min(18),
  slider: yup
    .number()
    .required()
    .test({
      test: (value = 0) => value <= 18 || value >= 54,
    }),
});
type SchemaType = yup.InferType<typeof FormSchema>;

const Template: ComponentStory<typeof AxForm> = () => {
  const formRef = useRef<FormRef<SchemaType>>(null);

  const [strength, setStrength] = useState(72);

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
        <AxForm<SchemaType>
          schema={FormSchema}
          formRef={formRef}
          onSubmit={action("onSubmit")}
        >
          <AxSection>
            <AxContent>
              <AxFlexBox fluid={false}>
                <AxFlexBox.Row gutter="md">
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="text">
                      <AxField.Text
                        autoFocus
                        allowClear
                        isRequired
                        label="Text field"
                        placeholder="Any text..."
                      />
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="password">
                      <AxField.Password
                        allowClear
                        isRequired
                        showToggle
                        strength={strength}
                        label="Password field"
                        placeholder="Any text..."
                      />
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="number">
                      <AxField.Number
                        allowClear
                        isRequired
                        min={0}
                        max={99}
                        label="Number field"
                        placeholder="Any number..."
                      />
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="slider">
                      <AxField.Slider
                        isRequired
                        min={0}
                        max={99}
                        showLabels
                        showValue
                        label="Slider field"
                      />
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxFlexBox.Row orient="col">
                      <AxFlexBox.Col>
                        <AxForm.Controller name="check">
                          <AxField.Checkbox label="Agree to something" />
                        </AxForm.Controller>
                      </AxFlexBox.Col>
                      <AxFlexBox.Col>
                        <AxForm.Controller name="switch">
                          <AxField.Switch
                            color="accent"
                            label="Switch to something"
                          />
                        </AxForm.Controller>
                      </AxFlexBox.Col>
                    </AxFlexBox.Row>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="options">
                      <AxField.Options
                        label="Radio Options"
                        allowClear
                      >
                        <AxField.Radio value="1" label="First" />
                        <AxField.Radio value="2" label="Second" />
                        <AxField.Radio value="3" label="Third" />
                      </AxField.Options>
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                </AxFlexBox.Row>
              </AxFlexBox>
            </AxContent>
            <AxFooter justify="end">
              <AxButton style="link" onClick={handleClear}>
                Clear
              </AxButton>
              <AxButton type="reset" onClick={handleReset}>
                Reset
              </AxButton>
              <AxButton style="solid" type="submit">
                Submit
              </AxButton>
            </AxFooter>
          </AxSection>
        </AxForm>
      </AxPage>
    </AxViewport>
  );
};

export const FormStory = Template.bind({});
FormStory.args = {};

export default { title: "AxForm", component: AxForm };
