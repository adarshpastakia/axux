// @author    : Adarsh Pastakia
// @version   : 0.0.1
// @copyright : 2021
// @license   : MIT

import { Story } from "@storybook/react";
import { AxButton, AxError, AxHeading, AxText, AxViewport } from "../../src";
import { Buggy } from "./Buggy";

const ErrorTemplate: Story<unknown> = (props) => (
  <AxViewport>
    <AxError {...props}>
      <Buggy />
    </AxError>
  </AxViewport>
);
export const DefaultError = ErrorTemplate.bind({});
DefaultError.args = {};

const CustomTemplate: Story<unknown> = (props) => (
  <AxViewport>
    <AxError {...props}>
      <Buggy />
    </AxError>
  </AxViewport>
);
export const CustomError = CustomTemplate.bind({});
CustomError.args = {
  errorElement: ({ error }: KeyValue) => (
    <div>
      <AxHeading>Custom error</AxHeading>
      <AxText block>{error}</AxText>
      <AxButton type="link" color="primary">
        Go Back
      </AxButton>
    </div>
  )
};

export default { title: "Example/Error", component: AxError };
