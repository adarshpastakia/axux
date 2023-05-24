// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import {
  AxButton,
  AxContent,
  AxFlexBox,
  AxFooter,
  AxIcon,
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
  select: yup.string().required(),
  tag: yup.array().required().min(1),
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

const Template: ComponentStory<typeof AxForm> = (props: AnyObject) => {
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
          {...props}
          schema={FormSchema}
          formRef={formRef}
          onSubmit={action("onSubmit")}
        >
          <AxSection>
            <AxContent>
              <AxFlexBox fluid={false} maxWidth="48rem">
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
                        <AxField.Container>
                          <AxForm.Controller name="check">
                            <AxField.Checkbox label="Agree to something" />
                          </AxForm.Controller>
                        </AxField.Container>
                      </AxFlexBox.Col>
                      <AxFlexBox.Col>
                        <AxField.Container>
                          <AxForm.Controller name="switch">
                            <AxField.Switch
                              color="accent"
                              label="Switch to something"
                            />
                          </AxForm.Controller>
                        </AxField.Container>
                      </AxFlexBox.Col>
                    </AxFlexBox.Row>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="options">
                      <AxField.Options label="Radio Options" allowClear>
                        <AxField.Radio value="1" label="First" />
                        <AxField.Radio value="2" label="Second" />
                        <AxField.Radio value="3" label="Third" />
                      </AxField.Options>
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="select">
                      <AxField.Combo
                        isEditable
                        allowCreate
                        label="Select List"
                        options={[
                          {
                            value: "first",
                            label: "This is first",
                            icon: "mdi-numeric-1-circle",
                          },
                          {
                            value: "second",
                            label: "This is second",
                            icon: "mdi-numeric-2-circle",
                          },
                          {
                            label: "Playoff",
                            items: [
                              {
                                value: "third",
                                label: "This is third",
                                icon: "mdi-numeric-3-circle",
                              },
                              {
                                value: "fourth",
                                label: "This is fourth",
                                icon: "mdi-numeric-4-circle",
                              },
                            ],
                          },
                        ]}
                        allowClear
                        onChange={action("select:onChange")}
                        onSelect={action("select:onSelect") as AnyObject}
                        onCreateOption={action("select:onCreateOption")}
                        renderer={(item) => (
                          <div>
                            <div className="flex gap-1 items-center">
                              <AxIcon
                                icon={`mdi ${item.icon}`}
                                className="text-lg"
                                color={
                                  item.value === "first"
                                    ? "#ffc30b"
                                    : item.value === "second"
                                    ? "#adadc7"
                                    : item.value === "third"
                                    ? "#b2560c"
                                    : "#9a7b4f"
                                }
                              />
                              <label className="flex-auto">{item.label}</label>
                            </div>
                            <div className="text-xs text-muted">
                              This is some test to describe option
                            </div>
                          </div>
                        )}
                      />
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                  <AxFlexBox.Col span="md:6">
                    <AxForm.Controller name="tag">
                      <AxField.Tag
                        isEditable
                        allowCreate
                        label="Tag List"
                        options={[
                          { value: "first", label: "This is first" },
                          "second",
                          { label: "Grouped", items: ["third", "fourth"] },
                        ]}
                        allowClear
                        onChange={action("select:onChange")}
                        onSelect={action("select:onSelect") as AnyObject}
                        onCreateOption={action("select:onCreateOption")}
                      />
                    </AxForm.Controller>
                  </AxFlexBox.Col>
                </AxFlexBox.Row>
              </AxFlexBox>
            </AxContent>
            <AxFooter justify="end">
              <AxButton variant="link" onClick={handleClear}>
                Clear
              </AxButton>
              <AxButton type="reset" onClick={handleReset}>
                Reset
              </AxButton>
              <AxButton variant="solid" type="submit">
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
