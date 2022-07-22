/**
 * AxUX React+TailwindCSS UI Framework
 * @author    : Adarsh Pastakia
 * @version   : 2.0.0
 * @copyright : 2022
 * @license   : MIT
 */

import { AxButton } from "@axux/core";
import { action } from "@storybook/addon-actions";
import { ComponentStory } from "@storybook/react";
import { useCallback } from "react";
import * as yup from "yup";
import { AxField, AxForm } from "../../src";

const LoginSchema = new yup.ObjectSchema({
  username: yup.string().required(),
  password: yup.string().required(),
});

type ILoginSchema = yup.InferType<typeof LoginSchema>;

const SampleLogin: ComponentStory<typeof AxForm> = (props) => {
  const handleSubmit = useCallback((values: KeyValue) => {
    action("onSubmit")(values);
    return new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });
  }, []);
  return (
    <div style={{ width: "32rem" }}>
      <AxForm
        {...props}
        onSubmit={handleSubmit}
        onChange={action("onChange")}
        schema={LoginSchema}
        formRef={undefined}
      >
        <AxForm.Controller name="username">
          <AxField.Text autoFocus label="Username" />
        </AxForm.Controller>
        <AxForm.Controller name="password">
          <AxField.Password label="Password" />
        </AxForm.Controller>
        <AxButton>Validate</AxButton>
      </AxForm>
    </div>
  );
};

export const LoginStory = SampleLogin.bind({});
LoginStory.args = {
  defaultValues: {
    username: "testing",
    password: "passing",
  },
};

export default { title: "AxForm" };
